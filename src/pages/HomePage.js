import { useEffect, useState } from "react";
import User from "../components/Datasheet";
import { Container } from "react-bootstrap";

export default function HomePage() {
  const [users, setUsers] = useState([]); // state to handle the data (users)
  // users: name of the state
  // setUsers: name of the function to set the state
  // Spørg Rasmus om rækkefølge .map vs. .sort eller hvorfor min sort fejler https://stackoverflow.com/questions/70883611/sort-fetched-data
  //const [sortType, setSortType] = useState("default");

  //the side effect - fetch users
  useEffect(() => {
    getData();
    // sortData();
    //}, [sortType]); // <--- "[]" VERY IMPORTANT!!!
  }, []);

  async function getData() {
    const response = await fetch(
      "https://fir-opgave-b9105-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    ); // read all users from firebase
    const data = await response.json();
    const array = Object.keys(data).map((key) => ({ id: key, ...data[key] })); // from object to array
    setUsers(array); // set the state with fetched data
  }
  // function sortData() { // tjek evt kode fra Scratch
  //   let sortedData;
  //   if (sortType === "descending") {
  //     sortedData = [...data].sort((a, b) => {
  //       return b.name.localeCompare(a.name);
  //     });
  //   } else if (sortType === "ascending") {
  //     sortedData = [...data].sort((a, b) => {
  //       return a.name.localeCompare(b.name);
  //     });
  //   } else {
  //     return setUsers;
  //   }
  //   setUsers(sortedData);
  // }

  return (
    <html>
      <header className="p-5 mb-4 bg-light">
        <Container className="py-5">
          <h1 className="display-5 fw-bold">Offshore Wind Farms</h1>
          <p className="col-md-8 fs-4">
            Explore the world's blue energy power plants
          </p>
          <a class="btn btn-primary btn-lg" href="/create" role="button">
            Create Offshore Wind Farm
          </a>
          <main>
            <section>
              <select class="form-select" aria-label="Sort by">
                <option selected>Sort by</option>
                <option value="name">Name</option>
                <option value="title">Title</option>
              </select>
            </section>
          </main>
          <body>
            <section>
              {users.map((userObj) => (
                <User user={userObj} key={userObj.id} />
              ))}
            </section>
          </body>
        </Container>
      </header>
    </html>
  );
}
