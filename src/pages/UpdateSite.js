import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imgPlaceholder from "../img/img-placeholder.jpg";

export default function UpdateSite() {
  const params = useParams();
  const url = `https://offshore-wind-farms-default-rtdb.europe-west1.firebasedatabase.app/offshoreWindFarms/${params.id}.json`;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function getSite() {
      const response = await fetch(url); // read one user from firebase
      const site = await response.json();
      setName(site.name);
      setCountry(site.country);
      setImage(site.image);
    }
    getSite();
  }, [url]); // <--- "[]" VERY IMPORTANT!!!

  async function updateSite(event) {
    event.preventDefault();

    const siteToUpdate = {
      // key/name: value from state
      name: name,
      country: country,
      image: image,
    };

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(siteToUpdate),
    });
    if (response.ok) {
      navigate("/");
    }
  }

  /**
   * handleImageChange is called every time the user chooses an image in the fire system.
   * The event is fired by the input file field in the form
   */
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file.size < 500000) {
      // image file size must be below 0,5MB
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      // if not below 0.5MB display an error message using the errorMessage state
      console.log("The image file is too big!"); //tilføj alert her
    }
  }

  return (
    <section className="page">
      <h1>Update "{name}"</h1>
      <form onSubmit={updateSite}>
        <input
          type="text"
          value={name}
          placeholder="Type a name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={country}
          placeholder="Type a country"
          onChange={(e) => setCountry(e.target.value)}
        />
        <label>
          <input
            type="file"
            className="file-input"
            accept="image/*"
            onChange={handleImageChange}
          />
          <img
            className="image-preview"
            src={image}
            alt="Choose"
            onError={(event) => (event.target.src = imgPlaceholder)}
          />
        </label>
        <button>Save</button>
      </form>
    </section>
  );
}
