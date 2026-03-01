import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./BookList.css";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const fetchBooks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/books", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBooks(res.data);
        } catch (error) {
            console.error("Error fetching books", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchBooks();
        } catch (error) {
            console.error("Error deleting book", error);
        }
    };

    return (
        <div className="book-list-container">
            <div className="list-header">
                <h2>My Book Collection</h2>
                <Link to="/add-book" className="add-button">
                    + Add New Book
                </Link>
            </div>

            {books.length === 0 ? (
                <div className="empty-state">
                    <p>No books found. Start by adding one!</p>
                </div>
            ) : (
                <div className="book-grid">
                    {books.map((book) => (
                        <div className="book-card" key={book._id}>
                            <div className="book-details">
                                <h3>{book.title}</h3>
                                <p className="author">by {book.author}</p>
                                <p className="year">{book.year}</p>
                            </div>
                            <div className="book-actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => navigate(`/edit-book/${book._id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(book._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default BookList;