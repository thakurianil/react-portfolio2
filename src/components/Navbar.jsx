import React, { useState } from "react";

export const Navbar = () => {
  const [slideMenu, setSlideMenu] = useState(false);

  return (
    <header>
      <div className="header container flex">
        <div className="logo flex">
          <div>Prem</div>
          <div className="line">Soft. Engineer</div>
        </div>
        <label htmlFor="hamburgerMenu" onClick={() => setSlideMenu(!slideMenu)}>
          <i className="fa-solid fa-bars"></i>
        </label>

        <input type="checkbox" id="hamburgerMenu" />
        <div className={slideMenu ? "menu slide" : "menu"}>
          <ul
            className="flex navigation"
            onClick={() => setSlideMenu(!slideMenu)}
          >
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="skill">Skills</a>
            </li>
            <li>
              <a href="project">Projects</a>
            </li>
            <li>
              <a href="about">About</a>
              {/* aaejlgba */}
            </li>
            <li>
              <a href="contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
