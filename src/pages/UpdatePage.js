import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import imgPlaceholder from "../img/img-placeholder.jpg";

export default function UpdatePage() {
  const params = useParams();
  const url = `https://fir-opgave-b9105-default-rtdb.europe-west1.firebasedatabase.app/users/${params.id}.json`;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function getUser() {
      const response = await fetch(url); // read one user from firebase
      const user = await response.json();
      setName(user.name);
      setTitle(user.title);
      setMail(user.mail);
      setImage(user.image);
    }
    getUser();
  }, [url]); // <--- "[]" VERY IMPORTANT!!!

  async function updateUser(event) {
    event.preventDefault();

    const userToUpdate = {
      // key/name: value from state
      name: name,
      title: title,
      mail: mail,
      image: image,
    };

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(userToUpdate),
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
      console.log("The image file is too big!");
    }
  }

  return (
    <section className="page">
      <h1>Update "{name}"</h1>
      <form onSubmit={updateUser}>
        <input
          type="text"
          value={name}
          placeholder="Type a name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={title}
          placeholder="Type a title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="mail"
          value={mail}
          placeholder="Type a mail"
          onChange={(e) => setMail(e.target.value)}
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
