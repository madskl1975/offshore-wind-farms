import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserPage() {
  const [user, setUser] = useState([]); // state to handle the data (user)
  const params = useParams();
  const url = `https://fir-opgave-b9105-default-rtdb.europe-west1.firebasedatabase.app/users/${params.id}.json`;
  const navigate = useNavigate();

  //the side effect - fetch user
  useEffect(() => {
    async function getUser() {
      const response = await fetch(url); // read one user from firebase
      const data = await response.json();
      setUser(data); // set the state with fetched data
    }
    getUser();
  }, [url]); // <--- "[]" VERY IMPORTANT!!!

  function showDeleteDialog() {
    const shouldDelete = window.confirm(
      `Do you want to delete "${user.name}"?`
    );
    if (shouldDelete) {
      deleteUser();
    }
  }

  async function deleteUser() {
    const response = await fetch(url, { method: "DELETE" });
    if (response.ok) {
      navigate("/"); // navigate back to home page
    }
  }

  function showUpdate() {
    navigate(`/update/${params.id}`);
  }

  return (
    <>
      <section className="page">
        <article className="user-detail">
          <img src={user.image} alt={user.name} />
          <section>
            <h1>{user.name}</h1>
            <p>{user.title}</p>
            <p>
              <a href={`mailto: ${user.mail}`}>{user.mail}</a> |{" "}
              <a href={`tel: ${user.phone}`}>{user.phone}</a>
            </p>
            <button onClick={showUpdate}>Update user</button>
            <button className="btn-outline" onClick={showDeleteDialog}>
              Delete user
            </button>
          </section>
        </article>
      </section>
    </>
  );
}
