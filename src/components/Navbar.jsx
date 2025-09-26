import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import logo from '../assets/logo.png';  // adjust the relative path accordingly


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // hook to navigate programmatically

  const handleRegisterClick = () => {
    navigate("/Register"); // Change "/register" to the route you want
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-lg border border-white/10 rounded-full shadow-lg">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
          DottFit
        </Link>


        {/* Links */}
        <div className="hidden md:flex space-x-8 ml-10">
          <Link to="/About" className="text-gray-200 hover:text-red-500 transition-colors">
            About Us
          </Link>
          <a href="/Services" className="text-gray-200 hover:text-red-500 transition-colors">
            Services
          </a>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegisterClick}
          className="ml-8 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-5 py-2 rounded-full font-medium shadow-md transition-all"
        >
          Register
        </button>
      </div>
    </nav>
  );
}
