import {
  Form,
  Nav,
  Navbar,
  Container,
  Offcanvas,
  Button,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../UserContext";
import Logo from "../images/Logo.png";

import { Cart } from "./Cart";

export function DeskNavBar() {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <Navbar expand="lg" className="bg-kape">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={Logo}
            width="70"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>

        <Nav className="me-auto my-2 my-lg-0">
          <Nav.Link href="/" className="g-font ms-3">
            Home
          </Nav.Link>
          {user.isAdmin ? (
            <>
              <Nav.Link as={Link} to="/allorders" className="g-font ms-3">
                Order
              </Nav.Link>
              <Nav.Link as={Link} to="/allproducts" className="g-font ms-3">
                Product Sales
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/products" className="g-font ms-3">
                Menu
              </Nav.Link>
              <Nav.Link href="/" className="g-font ms-3">
                Best Seller
              </Nav.Link>
            </>
          )}
        </Nav>
        {user.isAdmin ? (
          <></>
        ) : (
          <Form className="d-flex ">
            <div className="search-bar w-100 c">
              <input className="ol-0 bg-trans br bs" />
              <button type="submit" className="ol-0 bg-trans br bs">
                <i
                  class="bi bi-search"
                  style={{ fontSize: "1.25rem", color: "#724100" }}
                ></i>
              </button>
            </div>
          </Form>
        )}

        <Nav className="px-3 align-items-center">
          {user.id !== null ? (
            <>
              <Dropdown>
                <Dropdown.Toggle
                  className="ol-0 bg-trans g-font br bs r-after"
                  id="dropdown-basic"
                >
                  {user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu align={{ lg: "end" }} className="bg-blanca">
                  <>
                    <Dropdown.Item href="/account" className="g-font">
                      Account
                    </Dropdown.Item>
                  </>

                  {user.isAdmin ? (
                    <Dropdown.Item href="/admin" className="g-font">
                      Dashboard
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item href="/order" className="g-font">
                      Order
                    </Dropdown.Item>
                  )}

                  <Dropdown.Item href="/signout" className="g-font">
                    sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              {user.isAdmin ? <></> : <Cart />}
            </>
          ) : (
            <Nav.Link as={Link} to="/signin">
              <i
                class="bi bi-person fw-black"
                style={{ fontSize: "2rem", color: "#724100" }}
              ></i>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export function PhoneNavBar() {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar className="fixed-bottom bg-kape">
      <Container>
        <Nav className="my-2 my-lg-0 w-100 justify-content-between align-items-center">
          <Nav.Link className="g-font" as={Link} to="/">
            Home
          </Nav.Link>
          {user.id !== null ? (
            <>
              {user.isAdmin ? (
                <>
                  <Nav.Link as={Link} to="/cart">
                    <i
                      class="bi bi-plus"
                      style={{ fontSize: "1.9rem", color: "#724100" }}
                    ></i>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/cart">
                    <i
                      class="bi bi-bag fw-black"
                      style={{ fontSize: "1.9rem", color: "#724100" }}
                    ></i>
                  </Nav.Link>
                </>
              )}
            </>
          ) : (
            <Nav.Link as={Link} to="/signin">
              <i
                class="bi bi-person fw-black"
                style={{ fontSize: "2rem", color: "#724100" }}
              ></i>
            </Nav.Link>
          )}
          <Button className="ol-0 bg-trans br bs" onClick={handleShow}>
            <i
              class="bi bi-list"
              style={{ fontSize: "1.9rem", color: "#724100" }}
            ></i>
          </Button>

          <Offcanvas show={show} onHide={handleClose} backdrop="static">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="g-font">
                <img
                  src={Logo}
                  width="50"
                  className="d-inline-block align-top"
                  alt="Logo"
                />
                Kape Baracco
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {user.id !== null ? (
                <>
                  <Offcanvas.Title className="g-font mb-0">
                    {user.username}
                  </Offcanvas.Title>

                  <Nav.Link className="g-font my-3 ms-3" as={Link} to="/">
                    My Account
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/signout"
                    className="g-font my-3 ms-3"
                  >
                    Sign Out
                  </Nav.Link>
                </>
              ) : (
                <></>
              )}
              <Offcanvas.Title className="g-font mb-0">
                {user.isAdmin ? <>Admin</> : <>Shop</>}
              </Offcanvas.Title>
              {user.isAdmin ? (
                <>
                  <Nav.Link
                    className="g-font my-3 ms-3"
                    as={Link}
                    to="/allproducts"
                  >
                    Product
                  </Nav.Link>
                  <Nav.Link
                    className="g-font my-3 ms-3"
                    as={Link}
                    to="/allorders"
                  >
                    Order
                  </Nav.Link>
                  <Nav.Link className="g-font my-3 ms-3" as={Link} to="/admin">
                    Dashboard
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link className="g-font my-3 ms-3" as={Link} to="/">
                    About
                  </Nav.Link>
                  <Nav.Link
                    className="g-font my-3 ms-3"
                    as={Link}
                    to="/products"
                  >
                    Menu
                  </Nav.Link>
                  <Nav.Link className="g-font my-3 ms-3" as={Link} to="/">
                    Best Seller
                  </Nav.Link>
                </>
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </Nav>
      </Container>
    </Navbar>
  );
}
