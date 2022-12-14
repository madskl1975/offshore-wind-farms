import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
// The useParams hook returns an object of key/value pairs of the dynamic params from the current URL 
// that were matched by the <Route path>. Child routes inherit all params from their parent routes.
// https://reactrouter.com/en/main/hooks/use-params

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
    <Col className="d-flex justify-content-center align-items-center">
      <Card style={{ width: "60%" }} className="m-5 p-3">
        <Card.Img variant="top" src={site.image} alt={site.name} />
        <Card.Title>
          <h1>{site.name} Offshore Wind Farm</h1>
        </Card.Title>
        <Tabs defaultActiveKey="Information" className="mb-3" justify>
          <Tab eventKey="Information" title="Information">
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">Country</Col>
              <Col className="py-1 border border-white">{site.country}</Col>
            </Row>
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">Development Status</Col>
              <Col className="py-1 border border-white">
                {site.developmentStatus}
              </Col>
            </Row>
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">Sea Name</Col>
              <Col className="py-1 border border-white">{site.seaName}</Col>
            </Row>
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">Area</Col>
              <Col className="py-1 border border-white">
                {site.areaOfWindfarm} km&sup2;
              </Col>
            </Row>
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">
                Distance from Shore
              </Col>
              <Col className="py-1 border border-white">
                {site.distanceFromShoreMin}-{site.distanceFromShoreMax} m
              </Col>
            </Row>
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">Water Depth</Col>
              <Col className="py-1 border border-white">
                {site.waterDepthMin}-{site.waterDepthMax} m
              </Col>
            </Row>
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">Installed Capacity</Col>
              <Col className="py-1 border border-white">
                {site.installedCapacity} MW
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="Timeline" title="Timeline">
            {site.projectStart?.map((projectStart, index) => (
              <div key={index}>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="py-1 border border-white">Project Start</Col>
                  <Col className="py-1 border border-white">
                    {projectStart.projectStartYear}
                    {projectStart.projectStartMonth && ", "}
                    {projectStart.projectStartMonth}
                    {projectStart.projectStartEvent && " - "}
                    {projectStart.projectStartEvent}
                  </Col>
                </Row>
              </div>
            ))}
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">Installation Start</Col>
              <Col className="py-1 border border-white">
                {site.installationStartYear}
                {site.installationStartMonth && ", "}
                {site.installationStartMonth}
                {site.installationStartEvent && " - "}
                {site.installationStartEvent}
              </Col>
            </Row>
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">
                First Power Generation
              </Col>
              <Col className="py-1 border border-white">
                {site.firstPowerGenerationYear}
                {site.firstPowerGenerationMonth && ", "}
                {site.firstPowerGenerationMonth}
              </Col>
            </Row>
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">Commission</Col>
              <Col className="py-1 border border-white">
                {site.commisionYear}
                {site.commisionMonth && ", "}
                {site.commisionMonth}
              </Col>
            </Row>
            <Row className="bg-primary text-dark bg-opacity-10">
              <Col className="py-1 border border-white">Decommission</Col>
              <Col className="py-1 border border-white">
                {site.decommisionYear}
                {site.decommisionMonth && ", "}
                {site.decommisionMonth}
              </Col>
            </Row>
          </Tab>
          <Tab
            eventKey="Technical Specifications"
            title="Technical Specifications"
          >
            {site.turbine?.map((turbine, index) => (
              <div key={index}>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="py-1 border border-white">
                    Turbine Manufacturer
                  </Col>
                  <Col className="py-1 border border-white">
                    {turbine.manufacturer}
                  </Col>
                </Row>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="py-1 border border-white">Turbine Model</Col>
                  <Col className="py-1 border border-white">
                    {turbine.model}
                  </Col>
                </Row>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="py-1 border border-white">
                    Number of Turbines
                  </Col>
                  <Col className="py-1 border border-white">
                    {turbine.numberOfTurbines}
                  </Col>
                </Row>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="py-1 border border-white">
                    Rated Power per Turbine
                  </Col>
                  <Col className="py-1 border border-white">
                    {turbine.ratedPowerPerTurbine} MW
                  </Col>
                </Row>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="py-1 border border-white">Foundations</Col>
                  <Col className="py-1 border border-white">
                    {turbine.foundationNumber} {turbine.foundationType}
                  </Col>
                </Row>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="py-1 border border-white">
                    Foundation Material
                  </Col>
                  <Col className="py-1 border border-white">
                    {turbine.foundationMaterial}
                  </Col>
                </Row>
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="py-1 border border-white">
                    Foundation Principle
                  </Col>
                  <Col className="py-1 border border-white">
                    {turbine.foundationPrinciple}
                  </Col>
                </Row>
              </div>
            ))}
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
  );
}
