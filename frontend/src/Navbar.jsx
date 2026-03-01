import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useAuth();

    if (!user) return null; // Don't show navbar on login page

    return (
        <nav className="navbar">
            <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                BookApp
            </div>
            <div className="nav-links">
                <Link to="/dashboard">My Books</Link>
                <Link to="/category">Categories</Link>
                <button className="logout-button" onClick={logout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;