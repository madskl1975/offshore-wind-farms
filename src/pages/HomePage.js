import { useEffect, useState } from "react";
import User from "../components/Datasheet";
import { Container } from "react-bootstrap";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  // users: name of the state
  // setUsers: name of the function to set the state
  // https://stackoverflow.com/questions/70883611/sort-fetched-data
  const [sortType, setSortType] = useState("default");

  //the side effect - fetch users
  useEffect(() => {
    getData();
  }, [sortType]); // <--- "[]" VERY IMPORTANT!!!

  async function getData() {
    const response = await fetch(
      "https://fir-opgave-b9105-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    ); // read all users from firebase
    const data = await response.json();
    console.log(data);
    const users = Object.keys(data).map((key) => ({ id: key, ...data[key] })); // from object to array
    sortData(users); // set the state with fetched data
  }
  function sortData(users) {
    let sortedData;
    if (sortType === "name") {
      sortedData = [...users].sort((name1, name2) => {
        return name1.name.localeCompare(name2.name);
      });
    } else if (sortType === "title") {
      sortedData = [...users].sort((title1, title2) => {
        return title1.title.localeCompare(title2.title);
      });
    } else {
      return users;
    }
    setUsers(sortedData);
  }

  return (
    <header className="p-5 mb-4 bg-light">
      <Container className="py-5">
        <h1 className="display-5 fw-bold">Offshore Wind Farms</h1>
        <p className="col-md-8 fs-4">
          Explore the world's blue energy power plants
        </p>
        <a className="btn btn-primary btn-lg" href="/create" role="button">
          Create Offshore Wind Farm
        </a>
        <section>
          <select
            defaultValue="default"
            onChange={(e) => setSortType(e.target.value)}
            className="form-select"
            aria-label="Sort by"
          >
            <option value="default" selected disabled>
              Sort by
            </option>
            <option value="name">Name</option>
            <option value="title">Title</option>
          </select>
        </section>
        <section>
          {users.map((userObj) => (
            <User user={userObj} key={userObj.id} />
          ))}
        </section>
      </Container>
    </header>
  );
}
