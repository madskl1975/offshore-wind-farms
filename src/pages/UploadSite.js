import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Form, Button, Container } from "react-bootstrap";
import imgPlaceholder from "../img/img-placeholder.jpg";

export default function UploadSite() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [developmentStatus, setDevelopmentStatus] = useState("");
  const [country, setCountry] = useState("");

  async function uploadSite(event) {
    event.preventDefault();

    const newSite = {
      // key/name: value from state
      name: name,
      image: image,
      developmentStatus: developmentStatus,
      country: country,
    };

    const response = await fetch(
      "https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms.json",
      {
        method: "POST",
        body: JSON.stringify(newSite),
      }
    );
    if (response.ok) {
      navigate("/");
    }
  }

  /**
   * handleImageChange is called every time the user chooses an image in the file system.
   * The event is fired by the input file field in the form
   */
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      console.log("The image file is too big!"); //NB! Tilføj alert her
    }
  }

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} className="m-5">
          <Card.Img
            variant="top"
            src={image}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
          <Card.Title className="mb-3 p-3">
            <h1>Upload site</h1>
          </Card.Title>
          <Form onSubmit={uploadSite}>
            <Form.Group className="p-3">
              <Row className="mb-3">
                <Col>
                  <Form.Label>Wind Farm Name</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Wind Farm Image</Form.Label>
                </Col>
                <Col>
                  <Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Form.Label>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Country</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Development Status</Form.Label>
                </Col>
                <Col>
                  <Form.Select
                    onChange={(e) => setDevelopmentStatus(e.target.value)}
                  >
                    <option value="" selected disabled>Select</option>
                    <option value={developmentStatus}>Decommission</option>
                    <option value={developmentStatus}>Commission</option>
                    <option value={developmentStatus}>Installation</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit ">Save</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  );
}
