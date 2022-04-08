import { Navbar, Container } from "react-bootstrap";

function Header() {
  return (
    <>
      <Navbar>
        <Container fluid className="mainbar">
          <Navbar.Brand href="/" className="main" style={{ color: "white" }}>
            R-Board
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;
