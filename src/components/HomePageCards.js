import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Site({ site }) {
  const navigate = useNavigate();
  // site is a prop containing site data, ex:
  // {id: "...", name: "..." image: "...", developmentStatus: "...", installedCapacity: "..."}

  function handleClick() {
    navigate(`site/${site.id}`);
  }

  return (
    <Col lg={3} md={4} sm={6}>
      <Card style={{ width: "18rem" }} className="mb-5" onClick={handleClick}>
        <Card.Img variant="top" src={site.image} alt={site.name} />
        <Card.Body>
          <Card.Title>
            <h4>{site.name}</h4>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {site.country} | {site.developmentStatus}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2">
            Installed Capacity: {site.installedCapacity} MW
          </Card.Subtitle>
          {site.turbine.map((turbine) => (
            <>
              <Card.Subtitle className="mb-2">
                Turbine: {turbine.model}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2">
                Number: {turbine.numberOfTurbines}
              </Card.Subtitle>
            </>
          ))}
        </Card.Body>
      </Card>
    </Col>
  );
}
