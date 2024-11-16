import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CreateContact from "./pages/CreateContact";
import ContactDetail from "./pages/ContactDetail"; 
import ContactsList from "./pages/ContactsList";
import { AuthProvider } from "./components/auth";
import Signout from "./components/Signout";
import './pages/Login.css';
import { Layout, Typography, Menu } from "antd";

const { Header, Content } = Layout;

function App() {
  return (
    <AuthProvider>
      <Layout style={{ minHeight: "100vh", backgroundColor: "#CFC6B8" }}>
        <Router>
          <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography.Title level={3} style={{ color: "#fff", margin: 0 }}>
              Contact Manager
            </Typography.Title>
            <Menu theme="dark" mode="horizontal" style={{ borderBottom: "none" }}>
              <Menu.Item key="logout">
                <Signout />
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/contacts" element={<ContactsList />} />
              <Route path="/create" element={<CreateContact />} />
              <Route path="/contacts/:contactId/edit" element={<ContactDetail />} /> {/* Create this component */}
            </Routes>
          </Content>
        </Router>
      </Layout>
    </AuthProvider>
  );
}

export default App;