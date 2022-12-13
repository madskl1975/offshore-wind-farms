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
    <Col xl={3} lg={4} md={6} sm={12}>
        <Card style={{ width: "18rem" }} className="cards mb-4" onClick={handleClick}>
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
            {/* The optional chaining (?.) operator accesses an object's property or
          calls a function. // If the object is undefined or null, it returns
          undefined instead of throwing an error. */}
            {site.turbine?.map((turbine) => (
              <>
                <Card.Subtitle className="mb-2">
                  Turbine: {turbine.model}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                  Number of Turbines: {turbine.numberOfTurbines}
                </Card.Subtitle>
              </>
            ))}
          </Card.Body>
        </Card>
    </Col>
  );
}
