import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Form, Button, Container } from "react-bootstrap";
import imgPlaceholder from "../img/img-placeholder.jpg";

export default function UploadSite() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    country: "",
    developmentStatus: "",
    installedCapacity: 0,
    projectStart: [
      { projectStartYear: "", projectStartMonth: "", projectStartEvent: "" }, // opretter fint mit array for projectStart
    ],
  });
  const [image, setImage] = useState("");
  // const [projectStart, setProjectStart] = useState("");
  // const [name, setName] = useState("");
  // const [developmentStatus, setDevelopmentStatus] = useState("");
  // const [country, setCountry] = useState("");

  function handleChange(event) {
    //rammer ikke mit array for projectStart
    const name = event.target.name;
    const type = event.target.type;
    const checked = event.target.checked;
    const value = type === "checkbox" ? checked : event.target.value;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  // function handleProjectStart(event) {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setProjectStart((prevProjectStart) => {
  //     return {
  //       ...prevProjectStart,
  //       [name]: value,
  //     };
  //   });
  // }

  async function uploadSite(event) {
    event.preventDefault();
    const response = await fetch(
      "https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms.json",
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      navigate("/");
    }
  }

  //   const newSite = {
  //     // linje 46-63 erstattes af linje 32-43
  //     // key/name: value from state
  //     name: name,
  //     image: image,
  //     developmentStatus: developmentStatus,
  //     country: country,
  //   };

  //   const response = await fetch(
  //     "https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms.json",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(newSite),
  //     }
  //   );
  //   if (response.ok) {
  //     navigate("/");
  //   }
  // }

  /**
   * handleImageChange is called every time the user chooses an image in the file system.
   * The event is fired by the input file field in the form
   */
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 512000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      alert("The image file is too big! Max image file size is 500 kb");
    }
  }

  return (
    // value={FormData.turbine[0].turbinemodel}
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
                    onChange={handleChange}
                    name="name"
                    value={formData.name}
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Wind Farm Image</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
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
                    onChange={handleChange}
                    name="country"
                    value={formData.country}
                    // value={country}
                    // onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Development Status</Form.Label>
                </Col>
                <Col>
                  {["radio"].map((radioButtons) => (
                    <div
                      key={`stackedDevelopementStatus-${radioButtons}`}
                      className="mb-3"
                    >
                      <Form.Check
                        label="Installation"
                        type={radioButtons}
                        id={`stackedDevelopementStatus-${radioButtons}`}
                        name="developmentStatus"
                        value="Installation"
                        // checked={formData.developmentStatus === "Installation"}
                        onChange={handleChange}
                      />
                      <Form.Text muted>Site is under construction</Form.Text>
                      <Form.Check
                        label="Commission"
                        type={radioButtons}
                        id={`stackedDevelopementStatus-${radioButtons}`}
                        name="developmentStatus"
                        value="Commission"
                        onChange={handleChange}
                      />
                      <Form.Text muted>
                        Site is generating power from every turbine
                      </Form.Text>
                      <Form.Check
                        label="Decommission"
                        type={radioButtons}
                        id={`stackedDevelopementStatus-${radioButtons}}`}
                        name="developmentStatus"
                        value="Decommission"
                        onChange={handleChange}
                      />
                      <Form.Text muted>
                        Site has permanently ceased generation
                      </Form.Text>
                    </div>
                  ))}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Total Installed Capacity</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    onChange={handleChange}
                    name="installedCapacity"
                    value={formData.installedCapacity}
                    // value={country}
                    // onChange={(e) => setCountry(e.target.value)}
                  />
                  <Form.Text muted>
                    Type total number of MWs installed
                  </Form.Text>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Project Start</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    className="mb-3"
                    type="text"
                    placeholder="Year"
                    name="projectStartYear"
                    value={formData.year}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Button type="submit ">Upload</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  );
}
