import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  const navigate = useNavigate();
  // user is a prop containing user data, ex:
  // {id: "...", image: "...", mail: "...", name: "...", phone: "...", title: "..."}

  function handleClick() {
    navigate(`users/${user.id}`);
  }

  return (
    <Col lg={4} md={4} sm={6}>
      <Card style={{ width: "18rem" }} className="mb-5" onClick={handleClick}>
        <Card.Img variant="top" fluid src={user.image} alt={user.name} />
        <Card.Body>
          <Card.Title>
            <h3>{user.name}</h3>
          </Card.Title>
          <Card.Text>
            <p>{user.title}</p>
          </Card.Text>
          <Card.Link href={`mailto: ${user.mail}`}>{user.mail} </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
}
