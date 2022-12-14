import { useEffect, useState } from "react";
import Site from "../components/HomePageCards";

import { Row, Col, Form, FormGroup, FormSelect, Container } from "react-bootstrap";

export default function HomePage() {
  const [sites, setSites] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // ("") = string value
  const [showCommissionSites, setShowCommissionSites] = useState(true); // (true) og (false) = boolean value
  const [showInstallationSites, setShowInstallationSites] = useState(true);
  const [sortBy, setSortBy] = useState("installedCapacity"); // "installedCapacity" = default sort

  // export default function HomePage = React function component,
  // export default makes it posible to run the <HomePage /> component like this in other .js files
  // Hook: useState returns a stateful value, and a function to update it
  // sites = name of state to handle data
  // setSites: name of the function to set the state
  // setSites doesn't change state, interactions, eg. onClick etc renders change
  // useState ([]) = initial state = empty array []
  // https://reactjs.org/docs/hooks-reference.html#usestate

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
  }, []);

  // The Effect Hook lets you perform side effects in function components, for instance in this case using fetch
  // https://reactjs.org/docs/hooks-reference.html#useeffect
  // The async function declaration declares an async function where the await keyword is permitted within the function body.
  // The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the
  // need to explicitly configure promise chains.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

  // Await fetch is asynchronous and used to sending af request for data (Firebase REST API here) and asynchronously receives response in JSON.
  // The default method is GET, but can also be used to upload (POST), update (PUT), and delete (delete)
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Basic_concepts

  // The Object.keys() method returns an array of a given object's own enumerable string-keyed property names.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  //
  // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

  let sitesToDisplay = [...sites];

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

  if (sortBy === "name" || sortBy === "country") {
    sitesToDisplay.sort((site1, site2) =>
      site1[sortBy].localeCompare(site2[sortBy])
    );
  } else if (sortBy === "installedCapacity") {
    sitesToDisplay.sort((site1, site2) => site2[sortBy] - site1[sortBy]);
  }

  // [...array] The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays,
  // or properties from objects, into distinct variables.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring
  //
  // if...else: The if...else statement executes a statement if a specified condition is truthy. If the condition is falsy,
  // another statement in the optional else clause will be executed.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
  //
  // (!) The logical NOT (!) (logical complement, negation) operator takes truth to falsity and vice versa.
  // It is typically used with boolean (logical) values.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT
  //
  // Array method: The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements
  // from the given array that pass the test implemented by the provided function.
  // A shallow copy of an object is a copy whose properties share the same references (point to the same underlying values)
  // as those of the source object from which the copy was made
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
  //
  // Functions: An arrow function expression is a compact alternative to a traditional function expression,
  // with some semantic differences and deliberate limitations in usage,
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  //
  // String method: The toLowerCase() method returns the calling string value converted to lower case.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
  //
  // Array method: The sort() method sorts the elements of an array in place and returns the reference to the same array, now sorted.
  // The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  //
  // String method: The localeCompare() method returns a number indicating whether a reference string
  // comes before, or after, or is the same as the given string in sort order
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

  // return the output of the React function component, eg. HomePage
  return (
    <>
      <Row>
        <Col>
          <header className="p-5 bg-light">
            <h1 className="fs-1 fw-bold">Offshore Wind Farms</h1>
            <p className="fs-4">Explore the world's blue energy power plants</p>
            <a className="btn btn-primary btn-lg" href="/upload" role="button">
              Upload Offshore Wind Farm
            </a>
          </header>
        </Col>
      </Row>
      <Container>
        <Form className="d-flex flex-wrap align-items-center p-4 mx-5">
          <FormGroup>
            <Form.Control
              type="search"
              placeholder="Search by name"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {/* onChange = (event) arrow function setState (event.target.value)
            https://reactjs.org/docs/handling-events.html
            https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events */}
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
              <option value="installedCapacity">Sort by MW</option>
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
