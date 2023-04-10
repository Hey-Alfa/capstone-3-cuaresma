import { useContext, useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MrBaracco from "../images/MrBaracco.png";
import Swal from "sweetalert2";
import {
  CancleOrder,
  OrderModal,
  AddToCart,
  View,
  TransactionUser,
} from "./Modal";

export function ProductCard({ productProp }) {
  const { name, size, price, _id } = productProp;
  return (
    <>
      <Col lg={6} className="p-3">
        <Card className="w-100 p-3">
          <Card.Img variant="top" src={MrBaracco} className="w-50 m-auto" />
          <Card.Body>
            <Card.Title className="g-font">{name}</Card.Title>
            <Card.Subtitle>Size: {size}</Card.Subtitle>
            <Card.Subtitle>&#8369; {price}</Card.Subtitle>
          </Card.Body>
          <AddToCart prop={productProp} key={_id} />
        </Card>
      </Col>
    </>
  );
}
export function AdminCard({ productProp }) {
  const { _id, name, category, size, price, isAvailable, totalSales } =
    productProp;
  return (
    <Row className="mt-3 mb-3">
      <Col>
        <Card className=" p-3">
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>Category: {category}</Card.Text>
            <Card.Text>Size: {size}</Card.Text>
            <Card.Text>Price: &#8369; {price}</Card.Text>
            <Card.Text>Total-Sales: &#8369; {totalSales}</Card.Text>
            <Card.Text>
              Status: {isAvailable ? <>Available</> : <>Not Available</>}
            </Card.Text>

            <Button className="bg-primary" as={Link} to={`/product/${_id}`}>
              Details
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export function AllOrderCard({ orderProp }) {
  const {
    products,
    purchasedOn,
    comment,
    transactionDone,
    status,
    totalAmount,
    _id,
  } = orderProp;
  return (
    <Row className="mt-3 mb-3">
      <Col>
        <Card className=" p-3">
          <Card.Body>
            <Card.Title>{_id}</Card.Title>

            <Card.Subtitle>Total Amount</Card.Subtitle>
            <Card.Text>&#8369; {totalAmount}</Card.Text>
            <Card.Subtitle>Status</Card.Subtitle>
            <Card.Text>{status}</Card.Text>
            <OrderModal orderProp={orderProp} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export function CartCard({ prop }) {
  const { _id, productId, name, quantity, subTotal } = prop;
  const [totalQuantity, setTotalQuantity] = useState(quantity);
  const [amount, setAmount] = useState(subTotal);

  function add(e) {
    e.preventDefault();
    fetch("https://capstone-2-cuaresma.onrender.com/carts/update/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: totalQuantity + 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status) {
          const getProduct = data.cart.products.find(
            (p) => p.productId === productId
          );
          console.log(getProduct);
          setAmount(getProduct.subTotal);
          setTotalQuantity(getProduct.quantity);
        } else {
          setTotalQuantity(quantity);
          setAmount(subTotal);
        }
      });
  }
  function sub(e) {
    e.preventDefault();
    if (totalQuantity === 1) {
      setTotalQuantity(quantity);
    } else {
      fetch("https://capstone-2-cuaresma.onrender.com/carts/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: totalQuantity - 1,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status) {
            const getProduct = data.cart.products.find(
              (p) => p.productId === productId
            );
            console.log(getProduct);
            setAmount(getProduct.subTotal);
            setTotalQuantity(getProduct.quantity);
          } else {
            setTotalQuantity(quantity);
            setAmount(subTotal);
          }
        });
    }
  }
  function remove(e) {
    e.preventDefault();
    fetch(
      `https://capstone-2-cuaresma.onrender.com/carts/remove/${productId}`,
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
      <Card
        style={{ width: "18rem" }}
        className="w-100 flex-row my-3 ol-0 br bs"
      >
        <Card.Img
          src={MrBaracco}
          style={{ maxWidth: "8rem", maxHeight: "8rem" }}
        />
        <Card.Body className="mx-1 w-25">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="g-font">&#8369; {amount}</Card.Text>
          <Card.Text>
            <Button
              className="ol-0 bg-trans br bs c-dark"
              onClick={(e) => sub(e)}
            >
              <i class="bi bi-dash fw-black"></i>
            </Button>
            <Button className="ol-0 bg-trans br bs c-dark">
              {totalQuantity}
            </Button>
            <Button
              className="ol-0 bg-trans br bs c-dark"
              onClick={(e) => add(e)}
            >
              <i class="bi bi-plus fw-black"></i>
            </Button>
          </Card.Text>
          <Card.Text>
            <Button onClick={(e) => remove(e)}>Remove</Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export function OrderCard({ prop }) {
  const { _id, totalAmount, products, comment, transactionDone, status } = prop;
  const [orderStatus, setOrderStatus] = useState(false);
  useEffect(() => {
    if (status === "Pending") {
      setOrderStatus(true);
    } else {
      setOrderStatus(false);
    }
  });
  return (
    <>
      <Card
        style={{ width: "18rem" }}
        className="w-100 flex-row my-3 ol-0 br bs"
      >
        <Card.Body className="mx-1 w-25">
          <Card.Title>
            <h2>Referrence No: {_id} </h2>
          </Card.Title>
          <Card.Text>
            <strong>Total Amout: </strong> &#8369;{totalAmount}
          </Card.Text>
          <Card.Text>
            <strong>Status: </strong>
            {status}
          </Card.Text>
          <Card.Text>
            <strong>Transaction: </strong>
            {transactionDone ? <>true</> : <>false</>}
          </Card.Text>
          <Card.Text>
            <h3>Product</h3>
          </Card.Text>

          {products.map((p) => (
            <div className="border p-3 my-2" key={p._id}>
              <Card.Text>
                <strong>Id: </strong>
                {p.productId}
              </Card.Text>
              <Card.Text>
                <strong>Name: </strong>
                {p.name}
              </Card.Text>
              <Card.Text>
                <strong>Quantity: </strong>
                {p.quantity}
              </Card.Text>
              <Card.Text>
                <strong>Total: </strong>
                &#8369;{p.subTotal}
              </Card.Text>
            </div>
          ))}
          <View prop={prop} />
          {orderStatus ? <CancleOrder orderId={_id} /> : <></>}
          {transactionDone ? <></> : <TransactionUser prop={prop} />}
        </Card.Body>
      </Card>
    </>
  );
}
