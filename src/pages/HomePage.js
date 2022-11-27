import { useEffect, useState } from "react";
import User from "../components/User";
import { Container, Button } from "react-bootstrap";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  // users: name of the state
  // setUsers: name of the function to set the state

  //the side effect - fetch users
  useEffect(() => {
    getData();
  }, []); // <--- "[]" VERY IMPORTANT!!!

  async function getData() {
    const response = await fetch(
      "https://fir-opgave-b9105-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    ); // read all users from firebase
    const data = await response.json();
    const array = Object.keys(data).map((key) => ({ id: key, ...data[key] })); // from object to array
    setUsers(array); // set the state with fetched data
  }

  return (
    <>
      <header className="p-5 mb-4 bg-light">
        <Container className="py-5">
          <h1 className="display-5 fw-bold">Offshore Wind Farms</h1>
          <p className="col-md-8 fs-4">
            Explore the world's blue energy power plants
          </p>
          <Button variant="primary" size="lg">
            Add Offshore Wind Farm
          </Button>
        </Container>
      </header>
      <section className="page">
          <section className="grid-container">
                {users.map(userObj => (
                    <User user={userObj} key={userObj.id} />
                ))}
          </section>
        </section>
    </>
  );
}
