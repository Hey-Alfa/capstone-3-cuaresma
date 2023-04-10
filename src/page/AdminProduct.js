import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { AdminCard } from "../component/Cards";
import { Container, Row, Col } from "react-bootstrap";

export function AdminProduct() {
  const [product, setProducts] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    fetch("https://capstone-2-cuaresma.onrender.com/products/all/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const productArr = data.product.map((p) => {
          return <AdminCard productProp={p} key={p._id} />;
        });
        setProducts(productArr);
      });
  }, [product]);

  return user.isAdmin ? (
    <Container>
      <h1>All Products</h1>
      <Row>
        <Col>{product}</Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
}
