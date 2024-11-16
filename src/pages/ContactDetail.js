import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

export default function ContactDetail() {
  const { contactId } = useParams();
  const [contact, setContact] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const contactRef = doc(db, "contacts", contactId);
        const contactSnap = await getDoc(contactRef);
        if (contactSnap.exists()) {
          setContact(contactSnap.data());
        } else {
          console.error("Contact not found");
        }
      } catch (error) {
        console.error("Failed to load contact details", error);
      }
    };
    fetchContact();
  }, [contactId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const contactRef = doc(db, "contacts", contactId);
      await updateDoc(contactRef, contact);
      navigate("/contacts");
    } catch (error) {
      console.error("Failed to update contact", error);
    }
  };

  if (!contact) return <p>Loading...</p>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Contact
      </Typography>
      <Box component="form" onSubmit={handleUpdate} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="First Name"
          value={contact.firstName}
          onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Last Name"
          value={contact.lastName}
          onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Phone Number"
          value={contact.phone}
          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Company"
          value={contact.company}
          onChange={(e) => setContact({ ...contact, company: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Job Title"
          value={contact.jobTitle}
          onChange={(e) => setContact({ ...contact, jobTitle: e.target.value })}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update Contact
        </Button>
      </Box>
    </Container>
  );
}

