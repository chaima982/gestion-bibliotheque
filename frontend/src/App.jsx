import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./Navbar";  // Corrected import path
import Login from "./components/Login";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";
import CategoryForm from "./components/Category";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <div style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<Login />} />

                        <Route path="/dashboard" element={
                            <PrivateRoute>
                                <BookList />
                            </PrivateRoute>
                        } />

                        <Route path="/add-book" element={
                            <PrivateRoute>
                                <BookForm />
                            </PrivateRoute>
                        } />

                        <Route path="/edit-book/:id" element={
                            <PrivateRoute>
                                <BookForm />
                            </PrivateRoute>
                        } />

                        <Route path="/category" element={
                            <PrivateRoute>
                                <CategoryForm />
                            </PrivateRoute>
                        } />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;