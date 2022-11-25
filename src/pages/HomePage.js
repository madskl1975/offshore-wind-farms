import { Container, Button } from "react-bootstrap";

export default function HomePage() {
  return (
    <>
      <header className="p-5 mb-4 bg-light">
        <Container className="py-5">
          <h1 className="display-5 fw-bold">Offshore Wind Farms</h1>
          <p className="col-md-8 fs-4">
            Explore the world's blue energy power plants
          </p>
          <Button variant="primary" size="lg">
            Add Offshore Wind Farm
          </Button>
        </Container>
      </header>
    </>
  );
}
