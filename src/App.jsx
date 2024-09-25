import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Project } from "./components/Project";
import { Skill } from "./components/Skill";

function App() {
  return (
    <>
      <Router>
        {/* <!-- dark mode toggler --> */}
        <input type="checkbox" id="darkMode" />
        <div className="wrapper">
          <label htmlFor="darkMode">
            <i className="fa-solid fa-circle-half-stroke"></i>
          </label>

          {/* <!-- navbar --> */}
          <Navbar />

          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="skill" element={<Skill />} />
            <Route path="project" element={<Project />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
