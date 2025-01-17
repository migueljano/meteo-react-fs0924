import { Container, Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  return (
    <Navbar>
      <Container>
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col xs={12} lg={8} className="d-flex justify-content-center">
            <Navbar.Brand href="/" className="me-4">
              ☀️METEO APP
            </Navbar.Brand>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;
