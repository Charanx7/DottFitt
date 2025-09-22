
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import ServicesPage from "./pages/Services";


export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<AboutPage/>} />
          <Route path="/Services" element={<ServicesPage/>} />

        </Routes>
      </div>
    </Router>
  );
}
