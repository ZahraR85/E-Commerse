import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Add role state

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setRole(parsedUser.role); // Set role
    }
  }, []);

  // Register function (send request to backend)
  const register = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data)); // Save user & role
        setUser(data);
        setRole(data.role);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  // Login function (send request to backend)
  const login = async (userData) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data)); // Save user & role
        setUser(data);
        setRole(data.role);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Logout function (clear user session)
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
