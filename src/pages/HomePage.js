import { useEffect, useState } from "react";
import User from "../components/Datasheet";
import { Container } from "react-bootstrap";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  // users: name of the state
  // setUsers: name of the function to set the state
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

  // if (searchValue) {
  //  usersToDisplay= usersToDisplay.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()));
  //}

  usersToDisplay.sort((user1, user2) =>
    user1[sortBy].localeCompare(user2[sortBy])
  );

  return (
    <>
      <Container className="py-5">
        <header className="p-5 mb-4 bg-light">
          <h1 className="display-5 fw-bold">Offshore Wind Farms</h1>
          <p className="col-md-8 fs-4">
            Explore the world's blue energy power plants
          </p>
          <a className="btn btn-primary btn-lg" href="/create" role="button">
            Create Offshore Wind Farm
          </a>
          <label>
            <select
              className="form-select"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default" selected disabled>
                Sort by
              </option>
              <option value="name">Name</option>
              <option value="title">Title</option>
            </select>
          </label>
        </header>
        <main>
          <section>
            {usersToDisplay.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </section>
        </main>
      </Container>
    </>
  );
}
