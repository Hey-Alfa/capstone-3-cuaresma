import { useContext, useEffect, useState } from "react";
import { ProductCard } from "../component/Cards";
import UserContext from "../UserContext";
import { Container, Row, Col } from "react-bootstrap";
export function DeskProducts() {
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("https://capstone-2-cuaresma.onrender.com/products/")
      .then((res) => res.json())
      .then((data) => {
        const productArr = data.product.map((p) => {
          return <ProductCard productProp={p} key={p._id} />;
        });
        setProducts(productArr);
      });
  }, [products]);

  return (
    <Container>
      <h1>Products</h1>
      <Row className="mt-3 mb-3">{products}</Row>
    </Container>
  );
}
