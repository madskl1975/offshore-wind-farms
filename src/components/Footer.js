import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="mt-auto py-3 bg-light">
      <Container>
        <p className="text-center text-muted">
          © 2022 Prototype Offshore Wind Farms (version 1.0)
        </p>
      </Container>
    </footer>
  );
}
