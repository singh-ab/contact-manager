import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../components/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Input, Button, Typography, Card, Row } from "antd";
import '../pages/Login.css';
const { Title } = Typography;

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (currentUser) {
      fetchCars();
    }
  }, [currentUser]);

  const fetchCars = async () => {
    try {
      const q = query(
        collection(db, "cars"),
        where("userId", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      const carData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCars(carData);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ padding: 20 }}>
      <Title level={2}>My Cars</Title>
      <Input.Search
        placeholder="Search cars..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 20, maxWidth: 300 }}
      />
      <Link to="/create">
        <Button type="primary" style={{ marginBottom: 20 }}>
          Add New Car
        </Button>
      </Link>
      
      <Row gutter={[16, 16]}>
        {filteredCars.map((car) => (
          <Link to={`/cars/${car.id}`} style={{ textDecoration: "none" }} key={car.id}>
            <Card hoverable className="space">
              <Card.Meta
                title={car.title}
                description={car.description}
                style={{ marginBottom: 16 }}
              />
            </Card>
          </Link>
        ))}
      </Row>
    </div>
  );
}
