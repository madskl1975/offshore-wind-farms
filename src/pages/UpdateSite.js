import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Form, Button, Container } from "react-bootstrap";
import imgPlaceholder from "../img/img-placeholder.jpg";

export default function UpdateSite() {
  const params = useParams();
  const url = `https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms/${params.id}.json`;
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState({
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

  useEffect(() => {
    async function getSite() {
      const response = await fetch(url); // læser et site fra Firebase
      const site = await response.json();
      setUpdateData(site);
    }
    getSite();
  }, [url]); // <--- "[]" VERY IMPORTANT!!!

  async function updateSite(event) {
    event.preventDefault();
    const siteToUpdate = updateData; // hvordan jeg putter key/value from state ind her?
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(siteToUpdate),
    });
    if (response.ok) {
      navigate("/");
    }
  }

  function handleChange(event) {
    const name = event.target.name;
    const type = event.target.type;
    const checked = event.target.checked;
    const value = type === "checkbox" ? checked : event.target.value;

    setUpdateData((prevUpdateData) => {
      return {
        ...prevUpdateData,
        [name]: value,
      };
    });
  }

  function handleProjectStart(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUpdateData((prevUpdateData) => {
      const projectStartArray = updateData.projectStart;
      projectStartArray[0][name] = value;

      return {
        ...prevUpdateData,
        projectStart: projectStartArray,
      };
    });
  }

  function handleTurbine(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUpdateData((prevUpdateData) => {
      const turbineArray = updateData.turbine;
      turbineArray[0][name] = value;

      return {
        ...prevUpdateData,
        turbine: turbineArray,
      };
    });
  }

  

  // async function updateSite(siteToUpdate) {
  //   siteToUpdate.uid = updateData.uid;
  //   const response = await fetch(url, {
  //     method: "PUT",
  //     body: JSON.stringify(siteToUpdate),
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log("Site updated: ", data);
  //     navigate("/");
  //   } else {
  //     alert("Sorry, something went wrong");
  //   }
  // }

  //   async function updateSite(event) {
  //     event.preventDefault();
  //     const siteToUpdate = {
  //       // key/name: value from state
  //       name: name,
  //       country: country,
  //       image: image,
  //     };

  //     const response = await fetch(url, {
  //       method: "PUT",
  //       body: JSON.stringify(siteToUpdate),
  //     });
  //     if (response.ok) {
  //       navigate("/");
  //     }
  //   }

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 512000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setUpdateData((prevUpdateData) => {
          return {
            ...prevUpdateData,
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
            src={updateData.image}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
          <Card.Title className="mb-3 p-3">
            <h1>Update "{updateData.name}"</h1>
          </Card.Title>
          <Form onSubmit={updateSite}>
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
                    value={updateData.name}
                    onChange={handleChange}
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
                    name="country"
                    value={updateData.country}
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
                    value={updateData.seaName}
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
                        checked={
                          updateData.developmentStatus === "Installation"
                        }
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
                    value={updateData.areaOfWindfarm}
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
                      value={updateData.distanceFromShoreMin}
                      onChange={handleChange}
                    />
                    <Form.Text muted>Type minimum km from shore</Form.Text>
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      name="distanceFromShoreMax"
                      value={updateData.distanceFromShoreMax}
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
                      value={updateData.waterDepthMin}
                      onChange={handleChange}
                    />
                    <Form.Text muted>Type minimum m water depth</Form.Text>
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      name="waterDepthMax"
                      value={updateData.waterDepthMax}
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
                    value={updateData.installedCapacity}
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
                      value={updateData.projectStart[0].projectStartYear}
                      onChange={handleProjectStart}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Month"
                      name="projectStartMonth"
                      value={updateData.projectStart[0].projectStartMonth}
                      onChange={handleProjectStart}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Event"
                      name="projectStartEvent"
                      value={updateData.projectStart[0].projectStartEvent}
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
                      value={updateData.installationStartYear}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Month"
                      name="installationStartMonth"
                      value={updateData.installationStartMonth}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Event"
                      name="installationStartEvent"
                      value={updateData.installationStartEvent}
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
                      value={updateData.firstPowerGenerationYear}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Month"
                      name="firstPowerGenerationMonth"
                      value={updateData.firstPowerGenerationMonth}
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
                      value={updateData.commisionYear}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Month"
                      name="commisionMonth"
                      value={updateData.commisionMonth}
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
                      value={updateData.decommisionYear}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="text"
                      placeholder="Month"
                      name="decommisionMonth"
                      value={updateData.decommisionMonth}
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
                      value={updateData.turbine[0].manufacturer}
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
                      value={updateData.turbine[0].model}
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
                      value={updateData.turbine[0].numberOfTurbines}
                      onChange={handleTurbine}
                    />
                    <Form.Text muted>Type number of turbines</Form.Text>
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="number"
                      name="numberOfTurbines"
                      value={updateData.turbine[0].ratedPowerPerTurbine}
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
                      value={updateData.turbine[0].foundationType}
                      onChange={handleTurbine}
                    >
                      <option value="" disabled>
                        Type
                      </option>
                      <option value="Gravity-based">Gravity-based</option>
                      <option value="Jackets">Jackets</option>
                      <option value="Monopiles">Monopiles</option>
                      <option value="Tripods">REpower 5M</option>
                    </Form.Select>
                  </Col>
                  <Col className="mb-2">
                    <Form.Control
                      type="number"
                      name="foundationNumber"
                      value={updateData.turbine[0].foundationNumber}
                      onChange={handleTurbine}
                    />
                    <Form.Text muted>Type number of foundations</Form.Text>
                  </Col>
                  <Col className="mb-2">
                    <Form.Select
                      name="foundationMaterial"
                      value={updateData.turbine[0].foundationMaterial}
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
                      value={updateData.turbine[0].foundationPrinciple}
                      onChange={handleTurbine}
                    >
                      <option value="" disabled>
                        Principle
                      </option>
                      <option value="Piled">Piled</option>
                      <option value="Weight">Steel</option>
                    </Form.Select>
                  </Col>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit">Update</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  );
}

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Card, Row, Col, Form, Button, Container } from "react-bootstrap";
// import imgPlaceholder from "../img/img-placeholder.jpg";

// export default function UpdateSite() {
//   const params = useParams();
//   const url = `https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms/${params.id}.json`;
//   const navigate = useNavigate();
//   const [updateData, setUpdateData] = useState({
//     name: "",
//     image: "",
//     country: "",
//     //   developmentStatus: "",
//     //   installedCapacity: 0,
//     //   projectStart: [
//     //     { projectStartYear: "", projectStartMonth: "", projectStartEvent: "" }, // opretter fint mit array for projectStart
//     //   ],
//   });

//   const [name, setName] = useState(""); // linje 20-24 erstattes af linje 9-18
//   const [image, setImage] = useState("");
//   const [country, setCountry] = useState("");

//   useEffect(() => {
//     async function getSite() {
//       const response = await fetch(url); // read one user from firebase
//       const site = await response.json();
//       // setUpdateData(site.updateData) virker ikke, hvad skal jeg erstatte setName osv med?
//       setName(site.name);
//       setCountry(site.country);
//       setImage(site.image);
//     }
//     getSite();
//   }, [url]); // <--- "[]" VERY IMPORTANT!!!

//   // async function updateSite(event) {
//   //   event.preventDefault();
//   //   const siteToUpdate = updateData
//   //   const response = await fetch(url, {
//   //     method: "PUT",
//   //     body: JSON.stringify(siteToUpdate),
//   //   });
//   //   if (response.ok) {
//   //     navigate("/");
//   //   }
//   // }

//   async function updateSite(event) {
//     event.preventDefault();
//     const siteToUpdate = {
//       // key/name: value from state
//       name: name,
//       country: country,
//       image: image,
//     };

//     const response = await fetch(url, {
//       method: "PUT",
//       body: JSON.stringify(siteToUpdate),
//     });
//     if (response.ok) {
//       navigate("/");
//     }
//   }

//   //   function handleChange(event) {
//   //     const name = event.target.name;
//   //     const type = event.target.type;
//   //     const checked = event.target.checked;
//   //     const value = type === "checkbox" ? checked : event.target.value;

//   //     setUpdateData(prevUpdateData => {
//   //       return {
//   //         ...prevUpdateData,
//   //         [name]: value
//   //       };
//   //     });
//   // }

//   /**
//    * handleImageChange is called every time the user chooses an image in the fire system.
//    * The event is fired by the input file field in the form
//    */
//   function handleImageChange(event) {
//     const file = event.target.files[0];
//     if (file.size < 500000) {
//       // image file size must be below 0,5MB
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       // if not below 0.5MB display an error message using the errorMessage state
//       console.log("The image file is too big!"); //tilføj alert her
//     }
//   }

//   // return tilpasses props i upDateData, setUpdateData.
//   // Spm: hvad med nested {projectStart..}?
//   // og gentagelse inputfelter for projectStart <input>, som hedder Form.Control i Reactbootstrap?
//   return (
//     <>
//       <Container>
//         <Card style={{ width: "60%" }} className="m-5">
//           <Card.Img
//             variant="top"
//             src={image}
//             alt="Choose"
//             onError={(event) => (event.target.src = imgPlaceholder)}
//           />
//           <Card.Title>
//             <h1>Update "{name}"</h1>
//           </Card.Title>
//           <Form onSubmit={updateSite}>
//             <Form.Group className="p-3">
//               <Row className="mb-3">
//                 <Col>
//                   <Form.Label>Wind Farm Name</Form.Label>
//                 </Col>
//                 <Col>
//                   <Form.Control
//                     type="text"
//                     value={name}
//                     placeholder="Type a name"
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <Form.Label>Wind Farm Image</Form.Label>
//                 </Col>
//                 <Col>
//                   <Form.Control
//                     type="file"
//                     className="file-input"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                   />
//                 </Col>
//               </Row>
//               <Row className="mb-3">
//                 <Col>
//                   <Form.Label>Country</Form.Label>
//                 </Col>
//                 <Col>
//                   <Form.Control
//                     type="text"
//                     value={country}
//                     placeholder="Type a country"
//                     onChange={(e) => setCountry(e.target.value)}
//                   />
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <Button type="submit ">Update</Button>
//                 </Col>
//               </Row>
//             </Form.Group>
//           </Form>
//         </Card>
//       </Container>
//     </>
//   );
// }
