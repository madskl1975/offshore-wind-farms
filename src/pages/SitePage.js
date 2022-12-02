import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SitePage() {
  const [site, setSite] = useState([]); // state to handle the data (site)
  const params = useParams();
  const url = `https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms/${params.id}.json`;
  const navigate = useNavigate();

  //the side effect - fetch site
  useEffect(() => {
    async function getSite() {
      const response = await fetch(url); // read one site from firebase
      const data = await response.json();
      setSite(data); // set the state with fetched data
    }
    getSite();
  }, [url]); // <--- "[]" VERY IMPORTANT!!!

  function showDeleteDialog() {
    const shouldDelete = window.confirm(
      `Do you want to delete "${site.name}"?`
    );
    if (shouldDelete) {
      deleteSite();
    }
  }

  async function deleteSite() {
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
        <article className="site-detail">
          <img src={site.image} alt={site.name} />
          <section>
            <h1>{site.name}</h1>
            <p>{site.country}</p>
            <button onClick={showUpdate}>Update site</button>
            <button className="btn-outline" onClick={showDeleteDialog}>
              Delete user
            </button>
          </section>
        </article>
      </section>
    </>
  );
}
