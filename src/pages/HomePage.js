import { useEffect, useState } from "react";
import User from "../components/Datasheet";

import {
  Container,
  Row,
  Col,
  Form,
  FormCheck,
  FormGroup,
  FormSelect
} from "react-bootstrap";



export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  // users: name of the state
  // setUsers: name of the function to set the state
  const [searchValue, setSearchValue] = useState("");
  const [showSeniorLecturers, setShowSeniorLectures] = useState(true);
  const [showHeadOfDepartment, setShowHeadOfDepartment] = useState(true);
  const [sortBy, setSortBy] = useState("name");

  //the side effect - fetch users
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        "https://fir-opgave-b9105-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      const data = await response.json();
      const users = Object.keys(data).map((key) => ({ id: key, ...data[key] })); // from object to array
      setUsers(users);
    }
    getData();
  }, []); // <--- "[]" VERY IMPORTANT!!!

  let usersToDisplay = [...users]; // copy users array

  if (!showSeniorLecturers) {
    usersToDisplay = usersToDisplay.filter(
      (user) => user.title === "Senior Lecturer"
    );
  }
  if (!showHeadOfDepartment) {
    usersToDisplay = usersToDisplay.filter(
      (user) => user.title === "Head of Department"
    );
  }
  if (searchValue) {
    usersToDisplay = usersToDisplay.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  usersToDisplay.sort((user1, user2) =>
    user1[sortBy].localeCompare(user2[sortBy])
  );

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col>
            <header className="p-5 mb-4 bg-light">
              <h1 className="display-5 fw-bold">Offshore Wind Farms</h1>
              <p className="col-md-8 fs-4">
                Explore the world's blue energy power plants
              </p>
              <a
                className="btn btn-primary btn-lg"
                href="/create"
                role="button"
              >
                Create Offshore Wind Farm
              </a>
            </header>
          </Col>
        </Row>
        <Row>
          <Col>
            <section>
              <Form className="d-flex">
                <FormGroup className="p-2 mb-1">
                  <Form.Control
                    className="me-2"
                    type="search"
                    placeholder="Search by name"
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="p-2 mb-1">
                  <FormCheck
                    type="checkbox"
                    checked={showSeniorLecturers}
                    onChange={() => setShowSeniorLectures(!showSeniorLecturers)}
                    label="Show Head of Department"
                  ></FormCheck>
                </FormGroup>
                <FormGroup className="p-2 mb-1">
                  <FormCheck
                    type="checkbox"
                    checked={showHeadOfDepartment}
                    onChange={() =>
                      setShowHeadOfDepartment(!showHeadOfDepartment)
                    }
                    label="Show Senior Lecturer"
                  ></FormCheck>
                </FormGroup>
                <FormGroup className="p-2 mb-1">
                  <FormSelect
                    className="form-select"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default" selected disabled>
                      Sort by
                    </option>
                    <option value="name">Name</option>
                    <option value="title">Title</option>
                  </FormSelect>
                </FormGroup>
              </Form>
            </section>
          </Col>
        </Row>
        <main>
          <section className="grid-container">
              {usersToDisplay.map((user) => (
                <User key={user.id} user={user} />
              ))}
          </section>
        </main>
      </Container>
    </>
  );
}
