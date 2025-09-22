import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-lg border border-white/10 rounded-full shadow-lg">
        
        {/* Logo - Use Link to navigate to the home page */}
        <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-red-500">⚡</span> GYM
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-8 ml-10">
          {/* Use Link for routing to other pages */}
          <Link to="/About" className="text-gray-200 hover:text-red-500 transition-colors">
            About Us
          </Link>
          
          {/* Keep a tags for in-page scrolling links on the home page */}
          <a href="/Services" className="text-gray-200 hover:text-red-500 transition-colors">
            Services
          </a>
          <a href="#projects" className="text-gray-200 hover:text-red-500 transition-colors">
            Project
          </a>
          <a href="#faq" className="text-gray-200 hover:text-red-500 transition-colors">
            FAQ
          </a>
        </div>

        {/* Button */}
        <button className="ml-8 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white px-5 py-2 rounded-full font-medium shadow-md transition-all">
          Free Trial
        </button>
      </div>
    </nav>
  );
}