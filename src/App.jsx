import "./App.css";

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
      {/* <!-- dar mode toggler --> */}

      <input type="checkbox" id="darkMode" />
      <div className="wrapper">
        <label htmlFor="darkMode">
          <i className="fa-solid fa-circle-half-stroke"></i>
        </label>
        {/* <!-- navbar --> */}
        <Navbar />

        {/* <!-- hero section  --> */}
        <Hero />

        {/* <!-- skills section  --> */}
        <Skill />

        {/* <!-- project section  --> */}
        <Project />

        {/* <!-- about me section  --> */}
        <About />

        {/* <!-- Contact section  --> */}
        <Contact />

        {/* <!-- Footer section  --> */}
        <Footer />
      </div>
    </>
  );
}

export default App;
