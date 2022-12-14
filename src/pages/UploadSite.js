import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Form, Button, Container } from "react-bootstrap";
import imgPlaceholder from "../img/img-placeholder.jpg";

export default function UploadSite() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    developmentStatus: "",
    country: "",
    seaName: "",
    areaOfWindfarm: 0,
    distanceFromShoreMin: 0,
    distanceFromShoreMax: 0,
    waterDepthMin: 0,
    waterDepthMax: 0,
    installedCapacity: 0,
    projectStart: [
      { projectStartYear: "", projectStartMonth: "", projectStartEvent: "" },
    ],
    installationStartYear: "",
    installationStartMonth: "",
    installationStartEvent: "",
    firstPowerGenerationYear: "",
    firstPowerGenerationMonth: "",
    commisionYear: "",
    commisionMonth: "",
    decommisionYear: "",
    decommisionMonth: "",
    turbine: [
      {
        manufacturer: "",
        model: "",
        numberOfTurbines: 0,
        ratedPowerPerTurbine: 0,
        foundationNumber: 0,
        foundationType: "",
        foundationMaterial: "",
        foundationPrinciple: "",
      },
    ],
  });

  function handleChange(event) {
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

  // setFormData is using previous state to set state
  // https://reactjs.org/docs/state-and-lifecycle.html

  function handleProjectStart(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevFormData) => {
      const projectStartArray = formData.projectStart;
      projectStartArray[0][name] = value;

      return {
        ...prevFormData,
        projectStart: projectStartArray,
      };
    });
  }

  function handleTurbine(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevFormData) => {
      const turbineArray = formData.turbine;
      turbineArray[0][name] = value;

      return {
        ...prevFormData,
        turbine: turbineArray,
      };
    });
  }

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

  // The JSON.stringify() method converts a JavaScript value to a JSON string, optionally replacing values 
  // if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 512000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prevFormData) => {
          return {
            ...prevFormData,
            image: event.target.result,
          };
        });
      };
      reader.readAsDataURL(file);
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      alert("The image file is too big! Max image file size is 500 kb");
    }
  }

  return (
    <>
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} className="m-5">
          <Card.Img
            variant="top"
            src={formData.image}
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
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
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Sea Name</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Sea Name"
                    name="seaName"
                    value={formData.seaName}
                    onChange={handleChange}
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
                        Site has permanently ceased power generation
                      </Form.Text>
                    </div>
                  ))}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Area of Wind Farm</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    name="areaOfWindfarm"
                    value={formData.areaOfWindfarm}
                    onChange={handleChange}
                  />
                  <Form.Text muted>Type km2 area</Form.Text>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Distance from Shore</Form.Label>
                </Col>
                <Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="number"
                      name="distanceFromShoreMin"
                      value={formData.distanceFromShoreMin}
                      onChange={handleChange}
                    />
                    <Form.Text muted>Type minimum km from shore</Form.Text>
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      name="distanceFromShoreMax"
                      value={formData.distanceFromShoreMax}
                      onChange={handleChange}
                    />
                    <Form.Text muted>Type maximum km from shore</Form.Text>
                  </Col>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Water Depth</Form.Label>
                </Col>
                <Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="number"
                      name="waterDepthMin"
                      value={formData.waterDepthMin}
                      onChange={handleChange}
                    />
                    <Form.Text muted>Type minimum m water depth</Form.Text>
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      name="waterDepthMax"
                      value={formData.waterDepthMax}
                      onChange={handleChange}
                    />
                    <Form.Text muted>Type maximum m water depth</Form.Text>
                  </Col>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Total Installed Capacity</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    name="installedCapacity"
                    value={formData.installedCapacity}
                    onChange={handleChange}
                  />
                  <Form.Text muted>Type total MWs installed</Form.Text>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Project Start</Form.Label>
                </Col>
                <Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Year"
                      name="projectStartYear"
                      value={formData.projectStart[0].year}
                      onChange={handleProjectStart}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Month"
                      name="projectStartMonth"
                      value={formData.projectStart[0].month}
                      onChange={handleProjectStart}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Event"
                      name="projectStartEvent"
                      value={formData.projectStart[0].event}
                      onChange={handleProjectStart}
                    />
                  </Col>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Installation Start</Form.Label>
                </Col>
                <Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Year"
                      name="installationStartYear"
                      value={formData.installationStartYear}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Month"
                      name="installationStartMonth"
                      value={formData.installationStartMonth}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Event"
                      name="installationStartEvent"
                      value={formData.installationStartEvent}
                      onChange={handleChange}
                    />
                  </Col>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>First Power Generation</Form.Label>
                </Col>
                <Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Year"
                      name="firstPowerGenerationYear"
                      value={formData.firstPowerGenerationYear}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Month"
                      name="firstPowerGenerationMonth"
                      value={formData.firstPowerGenerationMonth}
                      onChange={handleChange}
                    />
                  </Col>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Commission</Form.Label>
                </Col>
                <Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Year"
                      name="commisionYear"
                      value={formData.commisionYear}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Month"
                      name="commisionMonth"
                      value={formData.commisionMonth}
                      onChange={handleChange}
                    />
                  </Col>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Decommission</Form.Label>
                </Col>
                <Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Year"
                      name="decommisionYear"
                      value={formData.decommisionYear}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Month"
                      name="decommisionMonth"
                      value={formData.decommisionMonth}
                      onChange={handleChange}
                    />
                  </Col>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Turbine Specifications</Form.Label>
                </Col>
                <Col>
                  <Col className="mb-2">
                    <Form.Select
                      name="manufacturer"
                      value={formData.turbine[0].manufacturer}
                      onChange={handleTurbine}
                    >
                      <option value="" disabled>
                        Manufacturer
                      </option>
                      <option value="Bonus Energy">AREVA Wind</option>
                      <option value="Bonus Energy">Bonus Energy</option>
                      <option value="REpower Systems">REpower Systems</option>
                      <option value="Siemens Gamesa">Siemens Gamesa</option>
                      <option value="Vestas Wind Systems">
                        Vestas Wind Systems
                      </option>
                    </Form.Select>
                  </Col>
                  <Col className="mb-2">
                    <Form.Select
                      name="model"
                      value={formData.turbine[0].model}
                      onChange={handleTurbine}
                    >
                      <option value="" disabled>
                        Model
                      </option>
                      <option value="AREVA M5000-116">AREVA M5000-116</option>
                      <option value="Bonus 450 kW/37">Bonus 450 kW/37</option>
                      <option value="REpower 5M">REpower 5M</option>
                      <option value="Siemens SWT-2.3-93">
                        Siemens SWT-2.3-93
                      </option>
                      <option value="Siemens SWT-3.6-107">
                        Siemens SWT-3.6-120
                      </option>
                      <option value="Siemens SWT-3.6-120">
                        Siemens SWT-3.6-120
                      </option>
                      <option value="Vestas V-80-2.0 MW">
                        Vestas V-80-2.0 MW
                      </option>
                    </Form.Select>
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="number"
                      name="numberOfTurbines"
                      value={formData.turbine[0].numberOfTurbines}
                      onChange={handleTurbine}
                    />
                    <Form.Text muted>Type number of turbines</Form.Text>
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="number"
                      name="ratedPowerPerTurbine"
                      value={formData.turbine[0].ratedPowerPerTurbine}
                      onChange={handleTurbine}
                    />
                    <Form.Text muted>Type rated MW per turbine </Form.Text>
                  </Col>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Foundation Specifications</Form.Label>
                </Col>
                <Col>
                  <Col className="mb-2">
                    <Form.Select
                      name="foundationType"
                      value={formData.turbine[0].foundationType}
                      onChange={handleTurbine}
                    >
                      <option value="" disabled>
                        Type
                      </option>
                      <option value="Gravity-based">Gravity-based</option>
                      <option value="Jackets">Jackets</option>
                      <option value="Monopiles">Monopiles</option>
                      <option value="Tripods">Tripods</option>
                    </Form.Select>
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="number"
                      name="foundationNumber"
                      value={formData.turbine[0].foundationNumber}
                      onChange={handleTurbine}
                    />
                    <Form.Text muted>Type number of foundations</Form.Text>
                  </Col>
                  <Col className="mb-2">
                    <Form.Select
                      name="foundationMaterial"
                      value={formData.turbine[0].foundationMaterial}
                      onChange={handleTurbine}
                    >
                      <option value="" disabled>
                        Material
                      </option>
                      <option value="Concrete">Concrete</option>
                      <option value="Steel">Steel</option>
                    </Form.Select>
                  </Col>
                  <Col className="mb-2">
                    <Form.Select
                      name="foundationPrinciple"
                      value={formData.turbine[0].foundationPrinciple}
                      onChange={handleTurbine}
                    >
                      <option value="" disabled>
                        Principle
                      </option>
                      <option value="Piled">Piled</option>
                      <option value="Weight">Weight</option>
                    </Form.Select>
                  </Col>
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
