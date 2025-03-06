import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Container from "react-bootstrap/esm/Container";
import { Outlet } from "react-router-dom";

export const DefaultLayout = ({ children, pageTitle }) => {
  return (
    <div>
      {/* header  */}
      <Header />
      <Container>
        <div className="p-2">{pageTitle}</div>
        <main className="main">
          <Outlet />
        </main>
      </Container>

      {/* footer  */}
      <Footer />
    </div>
  );
};
