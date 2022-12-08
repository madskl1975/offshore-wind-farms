import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Form, Button, Container } from "react-bootstrap";
import imgPlaceholder from "../img/img-placeholder.jpg";

export default function UpdateSite() {
  const params = useParams();
  const url = `https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms/${params.id}.json`;
  const navigate = useNavigate();
  // const [updateData, setUpdateData] = useState({
  //   name: "", // text string
  //   image: "",
  //   country: "",
  //   developmentStatus: "",
  //   installedCapacity: 0, //angives tal sådan?
  //   projectStartYear: "",
  //   projectStartMonth: "",
  //   projectStartEvent: "" //angives projectstart-array sådan eller hvordan med nested data?
  // });

  const [name, setName] = useState(""); // linje 20-24 erstattes af linje 9-18
  const [image, setImage] = useState("");
  const [country, setCountry] = useState("");
  // const [distanceFromShore, setDistanceFromShore] = useState();
  // const [projectStart, setProjectStart] = useState("");

  //   function handleChange(event) {
  //     const name = event.target.name;
  //     const type = event.target.type;
  //     const checked = event.target.checked;
  //     const value = type === "checkbox" ? checked : event.target.value;

  //     setUpdateData(prevUpdateData => {
  //       return {
  //         ...prevUpdateData,
  //         [name]: value
  //       };
  //     });
  // }

  useEffect(() => {
    async function getSite() {
      const response = await fetch(url); // read one user from firebase
      const site = await response.json();
      // setUpdateData(site.updataData); // setState knyttes til updateData, som holder JSON data nu
      setName(site.name); // linje 30 erstatter linje 31-33
      setCountry(site.country);
      setImage(site.image);
      // setDistanceFromShore(site.distanceFromShore);
      // setProjectStart(site.projectStart);
    }
    getSite();
  }, [url]); // <--- "[]" VERY IMPORTANT!!!

  // async function updateSite(event) {
  //   event.preventDefault();
  //   const siteToUpdate = updateData
  //   const response = await fetch(url, {
  //     method: "PUT",
  //     body: JSON.stringify(siteToUpdate),
  //   });
  //   if (response.ok) {
  //     navigate("/");
  //   }
  // }

  async function updateSite(event) {
    // linje 66-84 erstattes af linje 54-64
    event.preventDefault();
    const siteToUpdate = {
      // key/name: value from state
      name: name,
      country: country,
      image: image,
      // distanceFromShore: distanceFromShore,
      // projectStart: projectStart,
    };

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(siteToUpdate),
    });
    if (response.ok) {
      navigate("/");
    }
  }

  /**
   * handleImageChange is called every time the user chooses an image in the fire system.
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
      console.log("The image file is too big!"); //tilføj alert her
    }
  }

  // return tilpasses props i upDateData, setUpdateData.
  // Spm: hvad med nested {projectStart..}?
  // og gentagelse inputfelter for projectStart <input>, som hedder Form.Control i Reactbootstrap?
  return (
    <>
      <Container>
        <Card style={{ width: "60%" }} className="m-5">
          <Card.Img
            variant="top"
            src={image}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
          <Card.Title>
            <h1>Update "{name}"</h1>
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
                    value={name}
                    placeholder="Type a name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Wind Farm Image</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="file"
                    className="file-input"
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
                    value={country}
                    placeholder="Type a country"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button type="submit ">Update</Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>

    // <section className="page">
    //   <h1>Update "{name}"</h1>
    //   <form onSubmit={updateSite}>
    //     <input
    //       type="text"
    //       value={name}
    //       placeholder="Type a name"
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <input
    //       type="text"
    //       value={country}
    //       placeholder="Type a country"
    //       onChange={(e) => setCountry(e.target.value)}
    //     />
    //     {/* <input
    //       type="text"
    //       value={distanceFromShoreMin}
    //       placeholder="Type a minimum distance from shore"
    //       onChange={(e) => setDistanceFromShoreMin(e.target.value)}
    //     /> */}
    //     {/* <input
    //       type="text"
    //       value={distanceFromShoreMax}
    //       placeholder="Type a maximum distance from shore"
    //       onChange={(e) => setDistanceFromShoreMax(e.target.value)}
    //     /> */}
    //     <label>
    //       <input
    //         type="file"
    //         className="file-input"
    //         accept="image/*"
    //         onChange={handleImageChange}
    //       />
    //       <img
    //         className="image-preview"
    //         src={image}
    //         alt="Choose"
    //         onError={(event) => (event.target.src = imgPlaceholder)}
    //       />
    //     </label>
    //     <button>Save</button>
    //   </form>
    // </section>
  );
}
