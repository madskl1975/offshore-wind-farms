import { useEffect, useState } from "react";
import Site from "../components/HomePageCards";

import {
  Row,
  Form,
  FormGroup,
  FormSelect,
} from "react-bootstrap";

export default function HomePage() {
  const [sites, setSites] = useState([]);
  // sites: name of the state, state to handle the data
  // setSites: name of the function to set the state
  const [searchValue, setSearchValue] = useState("");
  const [showCommissionSites, setShowCommissionSites] = useState(true);
  const [showInstallationSites, setShowInstallationSites] = useState(true);
  const [sortBy, setSortBy] = useState("name");

  //the side effect - fetch sites
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms.json"
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      const sites = Object.keys(data).map((key) => ({ id: key, ...data[key] })); // from object to array
      console.log(sites);
      setSites(sites);
      console.log(setSites);
    }
    getData();
  }, []); // <--- "[]" VERY IMPORTANT!!!

  let sitesToDisplay = [...sites]; // copy sites array

  if (!showCommissionSites) {
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
    sitesToDisplay = sitesToDisplay.filter((site) =>
      site.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  sitesToDisplay.sort((site1, site2) =>
    site1[sortBy].localeCompare(site2[sortBy])
  );

  return (
    <>
      <header className="p-5 bg-light">
        <h1 className="fs-1 fw-bold">Offshore Wind Farms</h1>
        <p className="fs-4">Explore the world's blue energy power plants</p>
        <a className="btn btn-primary btn-lg" href="/upload" role="button">
          Upload Offshore Wind Farm
        </a>
      </header>
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
            onChange={() => setShowInstallationSites(!showInstallationSites)}
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
            <option value="installedCapacity">Sort by capacity</option>
          </FormSelect>
        </FormGroup>
      </Form>
      <Row className="ms-5 p-3">
        {sitesToDisplay.map((site) => (
          <Site key={site.id} site={site} />
        ))}
      </Row>
    </>
  );
}
