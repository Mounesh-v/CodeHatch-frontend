import React, { useState, useEffect, useRef } from "react";
import { X, Menu, UserCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import coImage from "../assets/co.png"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white">
      <div className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="flex items-center space-x-2">
        <img
  src={coImage}
  alt="Logo"
  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain"
/>

        </Link>

        <div className="hidden md:flex space-x-6 text-lg items-center">
          <Link to="/Courses" className="hover:text-yellow-300">
            Courses
          </Link>
          <Link to="/Plans" className="hover:text-yellow-300">
            Plans
          </Link>
          <Link to="/contact" className="hover:text-yellow-300">
            Contact Us
          </Link>

          {!user ? (
            <>
              <Link to="/signup" className="hover:text-yellow-300">
                Sign Up
              </Link>
              <Link to="/login" className="hover:text-yellow-300">
                Login
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <UserCircle2 className="w-6 h-6 text-yellow-300 cursor-pointer" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-blue-950 text-black rounded shadow z-50">
                  <div className="px-4 py-2 font-semibold border-b border-gray-200 text-white">
                    {user.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6 text-white" />
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0b0b1f] text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between p-4">
          <span className="text-xl font-bold">Menu</span>
          <X
            className="w-6 h-6 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <ul className="flex flex-col space-y-6 text-lg px-6 mt-4">
          <Link
            to="/Courses"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-300"
          >
            Courses
          </Link>
          <Link
            to="/Plans"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-300"
          >
            Plans
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-300"
          >
            Contact Us
          </Link>

          {!user ? (
            <>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full text-left px-4 py-2 text-yellow-300 flex items-center justify-between"
              >
                {user.name}
                <span className="text-white text-sm ml-2">▼</span>
              </button>

              {showDropdown && (
                <div className="mt-2 w-full bg-blue-950 text-white rounded shadow z-50">
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
