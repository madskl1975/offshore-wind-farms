import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Tabs, Tab, Button } from "react-bootstrap";

export default function SitePage() {
  const [site, setSite] = useState([]); // state to handle the data (site)
  const params = useParams();
  const url = `https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms/${params.id}.json`;
  const navigate = useNavigate();

  //the side effect - fetch site
  useEffect(() => {
    async function getSite() {
      const response = await fetch(url); // read one site from firebase
      const data = await response.json();
      setSite(data); // set the state with fetched data
    }
    getSite();
  }, [url]); // <--- "[]" VERY IMPORTANT!!!

  function showDeleteDialog() {
    const shouldDelete = window.confirm(
      `Do you want to delete "${site.name}"?`
    );
    if (shouldDelete) {
      deleteSite();
    }
  }

  async function deleteSite() {
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
      navigate("/"); // navigate back to home page
    }
  }

  function showUpdate() {
    navigate(`/update/${params.id}`);
  }

  return (
    <>
      <Col className="d-flex justify-content-center align-items-center">
        <Card style={{ width: "60%" }} className="m-5 p-3">
          <Card.Img variant="top" src={site.image} alt={site.name} />
          <Card.Title>
            <h1>{site.name} Offshore Wind Farm</h1>
          </Card.Title>
          <Tabs defaultActiveKey="Information" className="mb-3" justify>
            <Tab eventKey="Information" title="Information" color>
              <Card.Text>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="border border-white">Development status</Col>
                  <Col className="border border-white">
                    {site.developmentStatus}
                  </Col>
                </Row>
              </Card.Text>
            </Tab>
            <Tab eventKey="Timeline" title="Timeline">
              <Card.Text>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="border border-white">Development status</Col>
                  <Col className="border border-white">
                    {site.developmentStatus}
                  </Col>
                </Row>
              </Card.Text>
            </Tab>
            <Tab
              eventKey="Technical Specifications"
              title="Technical Specifications"
            >
              <Card.Text>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="border border-white">Development status</Col>
                  <Col className="border border-white">
                    {site.developmentStatus}
                  </Col>
                </Row>
              </Card.Text>
            </Tab>
          </Tabs>
          <Row>
            <Col>
              <Button className="me-4 my-3" onClick={showUpdate}>
                Update
              </Button>
              <Button onClick={showDeleteDialog}>Delete</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
}
