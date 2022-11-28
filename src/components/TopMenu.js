import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function TopMenu() {
  return (
    <Navbar bg="primary" variant="dark" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink className="text-decoration-none text-white" to="/">
            Offshore Wind Farms
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/create">
              Create
            </NavLink>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              className="me-2"
              placeholder="offshore wind"
              aria-label="Search"
            />
            <Button variant="light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}