import React from "react";
import { Title } from "./Title";

export const Contact = () => {
  return (
    <section className="contact" id="contact">
      <Title title="Contact" />
      <div className="flex social">
        <a href="">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a href="">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="">
          <i className="fa-brands fa-youtube"></i>
        </a>
        <a href="">
          <i className="fa-solid fa-mobile"></i>
        </a>
      </div>
      <h3>OR</h3>

      <div className="flex-center">
        <a href="" className="email-section flex-center">
          <span>youremail@gmail.com</span>
          <div className="email-icon flex-center">
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </a>
      </div>
    </section>
  );
};
