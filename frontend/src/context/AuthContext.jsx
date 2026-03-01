import { createContext, useContext, useState } from "react";
import axios from "axios";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("token") ? { username:
localStorage.getItem("username") } : null);
const login = async (username, password) => {
try {
const res = await axios.post("http://localhost:5000/api/auth/login", { username, password
});
localStorage.setItem("token", res.data.token);
localStorage.setItem("username", res.data.username);
setUser({ username: res.data.username });
return true;
} catch {
return false;
}
};
const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("username");
setUser(null);
};
return (
<AuthContext.Provider value={{ user, login, logout }}>
{children}
</AuthContext.Provider>
);
};
export const useAuth = () => useContext(AuthContext);