import { useEffect, useState } from "react";
import Site from "../components/HomePageCards";

import { Row, Col, Form, FormGroup, FormSelect, Container } from "react-bootstrap";

export default function HomePage() {
  const [sites, setSites] = useState([]);
  // sites: name of the state, state to handle the data
  // setSites: name of the function to set the state
  const [searchValue, setSearchValue] = useState(""); // string (text)
  const [showCommissionSites, setShowCommissionSites] = useState(true); // boolean (true eller false)
  const [showInstallationSites, setShowInstallationSites] = useState(true);
  const [sortBy, setSortBy] = useState("name"); // name = default sortering

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms.json"
      );
      const data = await response.json();
      const sites = Object.keys(data).map((key) => ({ id: key, ...data[key] })); 
      setSites(sites);
    }
    getData();
  }, []); // <--- "[]" VERY IMPORTANT!!!

  // useEffect er side effect, der fetcher data.
  // Funktionen er sat til async, fordi kaldet fra clientside til REST API'et (serverside)
  // kan have forsinkelse inden data returners til clienten.
  // JS er default synkron, så derfor async funktion og await fetch og await response
  // Data modstages i JSON og Object.keys(data).map mapper JSON data og laver objekterne om til et array

  let sitesToDisplay = [...sites]; // sitesToDisplay er en kopi af sites array

  if (!showCommissionSites) { //
    sitesToDisplay = sitesToDisplay.filter(
      (site) => site.developmentStatus === "Installation"
    );
  }
  if (!showInstallationSites) {
    sitesToDisplay = sitesToDisplay.filter(
      (site) => site.developmentStatus === "Commission"
    );
  }
  if (searchValue) {
    sitesToDisplay = sitesToDisplay.filter(
      (site) =>
        site.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  // .filter er en metode, der laver en skyggekopi kun med de elementer, som funktionen lader være tilbage i arrayet
  // .filter er indsat i if conditional statements, hvilket gør at sitesToDisplay tilpases 
  // efter brugerens valg af checkbox-filteringer og input i søgefeltet
  // De 2 første if-statements (checkbox) bruges arrowfunction, som er en hurtig måde at skrive alm funktioner på
  // I de 3 if statement (søgning) bruges to.LowerCase, hvilket gør at brugerens input og data kan sammenlignes, 
  // fordi de laves om til småbogstaver 

  sitesToDisplay.sort((site1, site2) =>
    site1[sortBy].localeCompare(site2[sortBy])
  );

  // .sort er en metode til sortering af elementer i et array

  return (
    <>
      <Container>
        <Row>
          <Col>
            <header className="p-5 bg-light">
              <h1 className="fs-1 fw-bold">Offshore Wind Farms</h1>
              <p className="fs-4">
                Explore the world's blue energy power plants
              </p>
              <a
                className="btn btn-primary btn-lg"
                href="/upload"
                role="button"
              >
                Upload Offshore Wind Farm
              </a>
            </header>
          </Col>
        </Row>
          <Form className="d-flex flex-wrap align-items-center p-4 mx-5">
            <FormGroup>
              <Form.Control
                type="search"
                placeholder="Search by name"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Form.Check
                type="checkbox"
                checked={showCommissionSites}
                onChange={() => setShowCommissionSites(!showCommissionSites)}
                label="Commission"
                className="mx-4"
              />
            </FormGroup>
            <FormGroup>
              <Form.Check
                type="checkbox"
                checked={showInstallationSites}
                onChange={() =>
                  setShowInstallationSites(!showInstallationSites)
                }
                label="Installation"
              />
            </FormGroup>
            <FormGroup>
              <FormSelect
                className="mx-4 text-secondary"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by name</option>
                <option value="country">Sort by country</option>
              </FormSelect>
            </FormGroup>
          </Form>
        <Row className="ms-5 p-3">
          {sitesToDisplay.map((site) => (
            <Site key={site.id} site={site} />
          ))}
        </Row>
      </Container>
    </>
  );
}
