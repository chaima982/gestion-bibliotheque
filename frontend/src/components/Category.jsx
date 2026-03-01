import { useState, useEffect } from "react";
import axios from "axios";

import "./Category.css";

const CategoryForm = ({ category, onSaved }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.names);
      setDescription(category.description);
    }
  }, [category]);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { names: name, description };

    try {
      if (category) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/category/${category._id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // CREATE
        await axios.post(
          "http://localhost:5000/api/category",
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      onSaved();
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Erreur CategoryForm :", err);
    }
  };

  return (
    <div className="category-form-container">
      <form className="category-form" onSubmit={handleSubmit}>
        <input
          className="category-input"
          placeholder="Nom de la catégorie"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="category-input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="category-submit-btn" type="submit">
          {category ? "Modifier" : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
