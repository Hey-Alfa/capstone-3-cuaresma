import React, { useState } from "react";
import { Button, ListGroup, FloatingLabel, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Branding";

export function EditName(prop) {
  const { value } = prop;
  const { _id, name } = value;
  const navegate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productName, setProductName] = useState(name);

  function editProduct(e) {
    e.preventDefault();
    fetch(`https://capstone-2-cuaresma.onrender.com/products/name/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: productName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          Swal.fire({
            title: "Succesful!",
            icon: "success",
            text: `${data.message}`,
          });
          handleClose();
          navegate("/admin");
        } else {
          Swal.fire({
            title: "Unsuccessful!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  }

  return (
    <>
      <Button className="ol-0 bg-trans br bs text-dark" onClick={handleShow}>
        {name}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" ol-0 br-kape bs bg-kape c-kape"
            onClick={(e) => editProduct(e)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function EditPrice(prop) {
  const { value } = prop;
  const { _id, price } = value;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navegate = useNavigate();
  const [productPrice, setProductPrice] = useState(price);

  function editPrice(e) {
    e.preventDefault();
    fetch(`https://capstone-2-cuaresma.onrender.com/products/price/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        price: productPrice,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          Swal.fire({
            title: "Succesful!",
            icon: "success",
            text: `${data.message}`,
          });
          handleClose();
          navegate("/admin");
        } else {
          Swal.fire({
            title: "Unsuccessful!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  }
  return (
    <>
      <Button className="ol-0 bg-trans br bs text-dark" onClick={handleShow}>
        {price}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" ol-0 br-kape bs bg-kape c-kape"
            onClick={(e) => editPrice(e)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function Transaction({ order }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { _id, transactionDone } = order;
  const navegate = useNavigate();
  const changeStatus = () => {
    fetch(
      `https://capstone-2-cuaresma.onrender.com/order/transaction/admin/${_id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          Swal.fire({
            title: "Succesful!",
            icon: "success",
            text: `${data.message}`,
          });
          handleClose();
          navegate("/admin");
        } else {
          Swal.fire({
            title: "Unsuccesful!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  };

  return (
    <>
      <Button className="ol-0 bg-trans br bs text-dark" onClick={handleShow}>
        {transactionDone ? <>true</> : <>false</>}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="c-kape">
            <h5>Rreferrence No: {_id}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center c-kape">Are you sure?</h2>
          <h4 className="text-center c-blanca">
            You won't be able to revert this!
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" ol-0 br-kape bs bg-kape c-kape"
            onClick={changeStatus}
          >
            Submit
          </Button>
          <Button
            className=" ol-0 br-kape bs bg-kape c-kape"
            onClick={handleClose}
          >
            Cancle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function TransactionUser({ prop }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navegate = useNavigate();
  const { _id } = prop;

  const [review, setReview] = useState("");

  const changeTransaction = () => {
    fetch(`https://capstone-2-cuaresma.onrender.com/order/transaction/${_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          addReview();
          Swal.fire({
            title: "Succesful!",
            icon: "success",
            text: `Thank you for your purchase!`,
          });
          navegate("/order");
        } else {
          Swal.fire({
            title: "Unsuccessful!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  };
  const addReview = () => {
    fetch(`https://capstone-2-cuaresma.onrender.com/order/comment/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        comment: review,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          console.log(data.order.comment);
          handleClose();
        } else {
          console.log(data.message);
        }
      });
  };
  return (
    <>
      <Button
        className="ol-0 bg-kape br bs text-dark ms-3"
        onClick={handleShow}
      >
        Done
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="c-kape">
            <h5>Rreferrence No: {_id}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Logo />
          <h2 className="text-center c-kape">Hi! Enjoy your coffee?</h2>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" ol-0 br-kape bs bg-kape c-kape"
            onClick={changeTransaction}
          >
            Submit
          </Button>
          <Button
            className=" ol-0 br-kape bs bg-kape c-kape"
            onClick={handleClose}
          >
            Cancle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function Status({ order }) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const navegate = useNavigate();
  const { status, _id } = order;
  const [orderStatus, setOrderStatus] = useState(status);
  const updateStatus = () => {
    fetch(`https://capstone-2-cuaresma.onrender.com/order/status/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: orderStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          Swal.fire({
            title: "Succesful!",
            icon: "success",
            text: `${data.message}`,
          });
          handleClose();
          navegate("/admin");
        } else {
          Swal.fire({
            title: "Usuccesful!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  };

  return (
    <>
      <Button className="ol-0 bg-trans br bs text-dark" onClick={handleShow}>
        {status}
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="c-kape">
            <h5>Referrence No: {_id}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            aria-label="Default select example"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option disabled className="c-blanca">
              Select Status
            </option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processings</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" ol-0 br-kape bs bg-kape c-kape"
            onClick={updateStatus}
          >
            Submit
          </Button>
          <Button
            className=" ol-0 br-kape bs bg-kape c-kape"
            onClick={handleClose}
          >
            Cancle
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function AddToCart({ prop }) {
  const { name, size, price, _id } = prop;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [quantity, setQuantity] = useState(1);
  const navegate = useNavigate();

  function addToCart() {
    fetch(`https://capstone-2-cuaresma.onrender.com/carts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: _id,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          Swal.fire({
            title: "Succesful!",
            icon: "success",
            text: `You successfuly added ${quantity} ${name} `,
          });
          setQuantity(1);
          handleClose();
          navegate("/products");
        } else {
          Swal.fire({
            title: "Unsuccesful!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  }
  function add(e) {
    e.preventDefault();
    let add = quantity + 1;
    setQuantity(add);
  }
  function sub(e) {
    if (quantity === 1) {
      setQuantity(quantity);
    } else {
      e.preventDefault();
      let sub = quantity - 1;
      setQuantity(sub);
    }
  }
  return (
    <>
      <Button className="ol-0 bg-kape br bs text-dark" onClick={handleShow}>
        Add to Cart
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-auto">
          <ListGroup>
            <ListGroup.Item className="modal-content br">{name}</ListGroup.Item>
            <ListGroup.Item className="modal-content br">{size}</ListGroup.Item>
            <ListGroup.Item className="modal-content br">
              Php {price}
            </ListGroup.Item>
            <ListGroup.Item className="modal-content br">
              <div className="d-flex">
                <Button
                  className="ol-0 bg-trans br bs c-dark"
                  onClick={(e) => sub(e)}
                >
                  <i class="bi bi-dash fw-black"></i>
                </Button>
                <p>{quantity}</p>

                <Button
                  className="ol-0 bg-trans br bs c-dark"
                  onClick={(e) => add(e)}
                >
                  <i class="bi bi-plus fw-black"></i>
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" mx-auto ol-0 br-kape bs bg-kape c-kape"
            onClick={(e) => addToCart(e)}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function CancleOrder({ orderId }) {
  const [reason, setReason] = useState("");
  const navegate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const cancle = () => {
    fetch(`https://capstone-2-cuaresma.onrender.com/order/cancle/${orderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        comment: reason,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          Swal.fire({
            title: "Succesful!",
            icon: "success",
            text: `${data.message}`,
          });
          setReason("");
          handleClose();
          navegate("/order");
        } else {
          Swal.fire({
            title: "Unsuccessful!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  };

  return (
    <>
      <Button className="ol-0 bg-kape br bs text-dark" onClick={handleShow}>
        Cancle
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Referrence No: {orderId}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="Reason for cancelling the order"
          >
            <Form.Control
              as="textarea"
              style={{ height: "100px" }}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button className=" ol-0 br-kape bs bg-kape c-kape" onClick={cancle}>
            submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function OrderModal({ orderProp }) {
  // console.log(orderId);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button className="ol-0 bg-kape br bs text-dark" onClick={handleShow}>
        View
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{orderProp._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Address: {orderProp.address}</p>
          <p>Total Amount: &#8369; {orderProp.totalAmount}</p>
          <p>Status: {orderProp.status}</p>
          <p>Transaction Done: {orderProp.transactionDone ? "Yes" : "No"}</p>
          <p>Purchased On: {orderProp.purchasedOn} </p>
          <p>Comment: "{orderProp.comment}"</p>
          <p>Products:</p>
          <ul>
            {orderProp.products.map((product, index) => (
              <li key={index}>
                <p>Id: {product.name}</p>
                <ul>
                  <li>Id: {product._id}</li>
                  <li>Quantity:{product.quantity} </li>
                  <li> Subtotal: &#8369;{product.subTotal} </li>
                </ul>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}

export function View({ prop }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        className="ol-0 bg-kape br bs text-dark mx-3"
        onClick={handleShow}
      >
        View
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{prop._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Total Amount: &#8369; {prop.totalAmount}</p>
          <p>Status: {prop.status}</p>
          <p>Address: {prop.address}</p>
          <p>Transaction Done: {prop.transactionDone ? "Yes" : "No"}</p>
          <p>Purchased On: {prop.purchasedOn} </p>
          <p>Review: "{prop.comment}"</p>
          <p>Products:</p>
          <ul>
            {prop.products.map((product, index) => (
              <li key={index}>
                <p>Id: {product.name}</p>
                <ul>
                  <li>Id: {product._id}</li>
                  <li>Quantity:{product.quantity} </li>
                  <li> Subtotal: &#8369;{product.subTotal} </li>
                </ul>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
}
export function CheckOut() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [address, setAddress] = useState("");
  function checkOut(e) {
    fetch("https://capstone-2-cuaresma.onrender.com/order/order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        address: address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          Swal.fire({
            title: "Succesful!",
            icon: "success",
            text: `${data.message}`,
          });
          handleClose();
        } else {
          Swal.fire({
            title: "Unsuccesful!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  }
  return (
    <>
      <Button className="ol-0 bg-kape br bs text-dark" onClick={handleShow}>
        Check Out
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Provide Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            as="textarea"
            style={{ height: "100px" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className=" ol-0 br-kape bs bg-kape c-kape"
            onClick={(e) => checkOut(e)}
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
