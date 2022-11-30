import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  const navigate = useNavigate();
  // user is a prop containing user data, ex:
  // {id: "...", image: "...", mail: "...", name: "...", phone: "...", title: "..."}

  function handleClick() {
    navigate(`users/${user.id}`);
  }

  return (
    <Card className="mb-5" onClick={handleClick}>
      <Card.Img variant="top" src={user.image} alt={user.name} />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
          <p>{user.title}</p>
        </Card.Text>
        <Card.Link href={`mailto: ${user.mail}`}>{user.mail} </Card.Link>
      </Card.Body>
    </Card>
  );
}

