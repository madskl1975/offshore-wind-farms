import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Site({ site }) {
  const navigate = useNavigate();
  // site is a prop containing site data, ex:
  // {id: "...", image: "...", mail: "...", name: "...", phone: "...", title: "..."}

  function handleClick() {
    navigate(`site/${site.id}`);
  }

  return (
    <Col lg={4} md={4} sm={6}>
      <Card style={{ width: "18rem" }} className="mb-5" onClick={handleClick}>
        <Card.Img variant="top" src={site.image} alt={site.name} />
        <Card.Body>
          <Card.Title>
            <h3>{site.name}</h3>
          </Card.Title>
          <Card.Text>{site.country}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
