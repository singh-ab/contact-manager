import { useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../components/auth";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography } from "antd";

export default function CreateCar() {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    await addDoc(collection(db, "cars"), {
      userId: currentUser.uid,
      title: values.title,
      description: values.description,
      tags: values.tags.split(",").map((tag) => tag.trim()),
    });
    navigate("/dashboard");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Typography.Title level={2}>Add New Car</Typography.Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Title"
          name="title"
          required
          rules={[{ required: true, message: "Please enter a title!" }]}
        >
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          required
          rules={[{ required: true, message: "Please enter a description!" }]}
        >
          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </Form.Item>

        <Form.Item
          label="Tags (comma separated)"
          name="tags"
        >
          <Input
            placeholder="Tags (e.g., sedan, Toyota, dealer)"
            value={tags.join(", ")}
            onChange={(e) =>
              setTags(e.target.value.split(",").map((tag) => tag.trim()))
            }
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Car
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
