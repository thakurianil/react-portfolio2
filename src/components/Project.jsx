import React from "react";
import p from "../assets/p.png";
import { Title } from "./Title";
import { Card } from "./Card";

export const Project = () => {
  const projects = [
    {
      image: p,
      github: "https://github.com",
      url: "",
      title: "P1 My portfolio",
      description: "Techstack: HTML, CSS, Javascript, React",
    },
    {
      image: p,
      github: "https://github.com",
      url: "",
      title: " P2 My portfolio",
      description: "Techstack: HTML, CSS, Javascript, React",
    },
    {
      image: p,
      github: "https://github.com",
      url: "",
      title: "P3 My portfolio",
      description: "Techstack: HTML, CSS, Javascript, React",
    },
    {
      image: p,
      github: "https://github.com",
      url: "",
      title: "P4 My portfolio",
      description: "Techstack: HTML, CSS, Javascript, React",
    },
  ];
  return (
    <section className="projects container" id="projects">
      <Title title="My Projects" />
      <div className="grid project-container">
        {projects.map((project, i) => (
          <Card key={i} {...project} />
        ))}
      </div>
    </section>
  );
};
