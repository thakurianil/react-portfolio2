import React from "react";
import prem from "../assets/prem.png";

export const Hero = () => {
  return (
    <>
      <section className="hero-section container" id="hero">
        <div className="grid hero">
          <div className="left flex">
            <div>
              Hi I`m <span>Prem Acharya</span>
            </div>
            <div className="tag">Soft. Engineer</div>
            <p>I love coding and teach others what I Know</p>
            <div>
              <a href={prem} download>
                <button>
                  Download CV <i className="fa-solid fa-download"></i>
                </button>
              </a>
            </div>
          </div>
          <div className="right flex">
            <img src={prem} alt="prem speaking" />
          </div>
        </div>
      </section>

      {/* <!-- banner section  --> */}
      <section className="flex banner container">
        <div className="flex info-content">
          <div className="flex-center icon-container">
            <i className="fa-solid fa-award"></i>
          </div>
          <div>
            <span>IT</span>
            <p>Graduation</p>
          </div>
        </div>
        <div className="info-divider"></div>

        <div className="flex info-content">
          <div className="flex-center icon-container">
            <i className="fa-solid fa-award"></i>
          </div>
          <div>
            <span>5+ Projects</span>
            <p>Completed</p>
          </div>
        </div>
        <div className="info-divider"></div>

        <div className="flex info-content">
          <div className="flex-center icon-container">
            <i className="fa-solid fa-award"></i>
          </div>
          <div>
            <span>1+ Year</span>
            <p>Experience</p>
          </div>
        </div>
      </section>
    </>
  );
};
