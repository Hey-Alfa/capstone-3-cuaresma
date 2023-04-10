import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext } from "react";
import UserContext from "../UserContext";
import { CartCard } from "./Cards";
import { CheckOut } from "./Modal";
import Swal from "sweetalert2";
export function Cart() {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cart, setCart] = useState([]);

  const [totalAmount, setTotalAmout] = useState([]);
  const getCart = () => {
    fetch("https://capstone-2-cuaresma.onrender.com/carts/getCart/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(
          data.cart.products.map((p) => {
            return <CartCard prop={p} key={p._id} />;
          })
        );
        setTotalAmout(data.cart.totalAmount);
      });
  };

  useEffect(() => {
    getCart();
  });

  return (
    <>
      <Button className="ol-0 bg-trans br bs" onClick={handleShow}>
        <i
          class="bi bi-cup-hot-fill fw-black"
          style={{ fontSize: "1.9rem", color: "#724100" }}
        ></i>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user.username}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart}
          <h2>Total Amount: &#8369; {totalAmount}</h2>
          {/* <Button onClick={(e) => checkOut(e)}>Check Out</Button> */}
          <CheckOut />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
