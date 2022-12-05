import { useEffect, useState } from "react";
import Site from "../components/HomePageCards";

import {
  Container,
  Row,
  Form,
  FormCheck,
  FormGroup,
  FormSelect,
} from "react-bootstrap";

export default function HomePage() {
  const [sites, setSites] = useState([]);
  // sites: name of the state, state to handle the data
  // setSites: name of the function to set the state
  const [searchValue, setSearchValue] = useState("");
  const [showCommissionedSites, setShowCommissionedSites] = useState(true);
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

  if (!showCommissionedSites) {
    sitesToDisplay = sitesToDisplay.filter(
      (site) => site.developmentStatus === "Installation"
    );
  }
  if (!showInstallationSites) {
    sitesToDisplay = sitesToDisplay.filter(
      (site) => site.developmentStatus === "Commissioned"
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
        <a className="btn btn-primary btn-lg" href="/create" role="button">
          Create Offshore Wind Farm
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
          <FormCheck
            type="checkbox"
            checked={showCommissionedSites}
            onChange={() => setShowCommissionedSites(!showCommissionedSites)}
            label="Commission"
            className="mx-4"
          ></FormCheck>
        </FormGroup>
        <FormGroup>
          <FormCheck
            type="checkbox"
            checked={showInstallationSites}
            onChange={() => setShowInstallationSites(!showInstallationSites)}
            label="Installation"
          ></FormCheck>
        </FormGroup>
        <FormGroup>
          <FormSelect
            className="mx-4"
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
    </>
  );
}
