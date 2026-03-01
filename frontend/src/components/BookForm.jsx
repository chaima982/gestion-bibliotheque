import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL if editing
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/category", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    const fetchBook = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const book = res.data; // Depending on API, might need book[0] or whatever structure
        // Adjusting based on assumption api returns the book object directly or inside an array.
        // If get by id returns single object:
        setTitle(book.title);
        setAuthor(book.author);
        setYear(book.year);
        setCategoryId(book.category?._id || book.category || "");
      } catch (err) {
        console.error("Error loading book:", err);
      }
    };

    fetchCategories();
    fetchBook();
  }, [id, token]); // Dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, author, year, category: categoryId };

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/books/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post("http://localhost:5000/api/books", data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate("/dashboard"); // Go back to list after save
    } catch (error) {
      console.error("Error saving book", error);
    }
  };

  return (
    <div className="book-form-page">
      <div className="book-form-container">
        <h2>{id ? "Edit Book" : "Add New Book"}</h2>
        <form className="book-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="book-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              className="book-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Publication Year</label>
            <input
              type="number"
              className="book-input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="book-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.names}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
            <button className="book-submit-btn" type="submit">
              {id ? "Save Changes" : "Create Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default BookForm;
