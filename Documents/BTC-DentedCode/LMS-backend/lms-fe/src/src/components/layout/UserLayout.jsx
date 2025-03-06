import { Col, Container, Row, Stack } from "react-bootstrap";
import { AuthRoute } from "../auth/AuthRoute";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { UserSidebar } from "./UserSidebar";
import { useSelector } from "react-redux";

export const UserLayout = ({ children, pageTitle }) => {
  const { user } = useSelector((state) => state.userInfo);
  return (
    <AuthRoute>
      <div>
        {/* header  */}
        <Header />
        <Container fluid>
          <Row>
            <Col md={3} xl={2} className="bg-dark text-light">
              <div className="p-3">
                <div>Welcome Back</div>
                <h3>{user.fName + " " + user.lName}</h3>
              </div>
              <hr />
              <UserSidebar />
            </Col>
            <Col>
              <div className="p-2">
                <h3>{pageTitle}</h3>
              </div>
              <hr />
              <main className="main mb-3">{children}</main>
            </Col>
          </Row>
        </Container>

        {/* footer  */}
        <Footer />
      </div>
    </AuthRoute>
  );
};
