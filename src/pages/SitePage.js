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
    <Col className="d-flex justify-content-center align-items-center">
      <Card style={{ width: "60%" }} className="m-5 p-3">
        <Card.Img variant="top" src={site.image} alt={site.name} />
        <Card.Title>
          <h1>{site.name} Offshore Wind Farm</h1>
        </Card.Title>
        <Tabs defaultActiveKey="Information" className="mb-3" justify>
          <Tab eventKey="Information" title="Information">
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">Country</Col>
                <Col className="py-1 border border-white">{site.country}</Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">
                  Development Status
                </Col>
                <Col className="py-1 border border-white">
                  {site.developmentStatus}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">Sea Name</Col>
                <Col className="py-1 border border-white">{site.seaName}</Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">Area</Col>
                <Col className="py-1 border border-white">
                  {site.areaOfWindfarm} km2 {/*HTML for km2 &#13218 */}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">
                  Distance from Shore
                </Col>
                <Col className="py-1 border border-white">
                  {site.distanceFromShoreMin}-{site.distanceFromShoreMax} m
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">Water Depth</Col>
                <Col className="py-1 border border-white">
                  {site.waterDepthMin}-{site.waterDepthMax} m
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">
                  Installed Capacity
                </Col>
                <Col className="py-1 border border-white">
                  {site.installedCapacity} MW
                </Col>
              </Row>
            </Card.Text>
          </Tab>
          <Tab eventKey="Timeline" title="Timeline">
            <Card.Text className="mb-0">
              {/* {site.projectStart && (*/}
              {/* skal testes, virker ikke  */}
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">Project Start</Col>{" "}
                <Col className="py-1 border border-white">
                  {site.projectStartYear}
                  {/* {site.projectStartMonth && ", "} */}
                  {site.projectStartMonth}
                  {/* {site.projectStartEvent && " - "} */}
                  {site.projectStartEvent}
                </Col>
              </Row>
              {/* )} */}
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">
                  Installation Start
                </Col>
                <Col className="py-1 border border-white">
                  {site.installationStartYear}
                  {", "}
                  {site.installationStartMonth}
                  {" - "}
                  {site.installationStartEvent}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">
                  First Power Generation
                </Col>
                <Col className="py-1 border border-white">
                  {site.firstPowerGenerationYear}
                  {", "}
                  {site.firstPowerGenerationMonth}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">Commission</Col>
                <Col className="py-1 border border-white">
                  {site.commisionYear}
                  {site.commissionMonth ?? ", "}
                  {site.commisionMonth}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              {
                <Row className="bg-primary text-dark bg-opacity-10">
                  <Col className="py-1 border border-white">Decommission</Col>
                  <Col className="py-1 border border-white">
                    {site.decommisionYear}
                    {(site.decommissionMonth &&= ", ")}
                    {site.decommisionMonth}
                  </Col>
                </Row>
              }
            </Card.Text>
          </Tab>
          <Tab
            eventKey="Technical Specifications"
            title="Technical Specifications"
          >
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">
                  Turbine Manufacturer
                </Col>{" "}
                <Col className="py-1 border border-white">
                  {site.turbineManufacturer}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">Turbine Model</Col>
                <Col className="py-1 border border-white">
                  {site.turbineModel}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">
                  Number of Turbines
                </Col>
                <Col className="py-1 border border-white">
                  {site.numberOfTurbines}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">Rated Power</Col>
                <Col className="py-1 border border-white">
                  {site.ratedPowerPerTurbine}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">Foundation</Col>
                <Col className="py-1 border border-white">
                  {site.foundationType}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">
                  Number of Foundations
                </Col>
                <Col className="py-1 border border-white">
                  {site.foundationNumber}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">
                  Foundation Material
                </Col>
                <Col className="py-1 border border-white">
                  {site.foundationMaterial}
                </Col>
              </Row>
            </Card.Text>
            <Card.Text className="mb-0">
              <Row className="bg-primary text-dark bg-opacity-10">
                <Col className="py-1 border border-white">
                  Foundation Principle
                </Col>
                <Col className="py-1 border border-white">
                  {site.foundationPrinciple}
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
  );
}
