import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function TopMenu() {
  return (
    <Navbar bg="primary" variant="dark" sticky="top" expand="lg">
      <Navbar.Brand className="ms-5">
        <NavLink className="text-decoration-none text-white" to="/">
          Offshore Wind Farms
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink className="nav-link" to="/upload">
            Upload
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
