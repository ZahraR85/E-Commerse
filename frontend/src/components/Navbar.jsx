import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Adjust path if needed

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // Get auth state

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          MyStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          <Link to="/product" className="text-white hover:text-gray-200">
            Products
          </Link>
          <Link to="/cart" className="text-white hover:text-gray-200">
            Cart
          </Link>

          {user ? (
            <button onClick={logout} className="text-white hover:text-gray-200">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-200">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 p-3">
          <Link to="/" className="block text-white py-2">
            Home
          </Link>
          <Link to="/product" className="block text-white py-2">
            Products
          </Link>
          <Link to="/cart" className="block text-white py-2">
            Cart
          </Link>

          {user ? (
            <button onClick={logout} className="block text-white py-2">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block text-white py-2">
                Login
              </Link>
              <Link to="/register" className="block text-white py-2">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
