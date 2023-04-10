import { Container, Button, Modal } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function DeskAddProduct() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setActive] = useState(false);
  const navegate = useNavigate();

  function registerProduct(e) {
    e.preventDefault();

    fetch("https://capstone-2-cuaresma.onrender.com/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        category: category,
        size: size,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === true) {
          setName("");
          setCategory("");
          setSize("");
          setPrice("");

          Swal.fire({
            title: "Successful!",
            icon: "success",
            text: `${data.message}`,
          });
          navegate("/allproducts");
        } else {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  }

  useEffect(() => {
    if (name !== "" && category !== "" && price !== "" && size !== "") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [name, category, size, price]);

  const handleSizeChange = (e) => {
    if (e.target.value === "empty") {
      setSize("");
    } else {
      setSize(e.target.value);
    }
  };

  return (
    <Container className="w-100 mx-auto my-5">
      <h1 className="text-center">Add Product</h1>
      <p className="text-center mb-5">
        Back to{" "}
        <a href="/admin" className="c-blanca ">
          Dashboard
        </a>
      </p>

      <form
        className="w-50 m-auto p-3 rounded bg-blanca"
        onSubmit={(e) => registerProduct(e)}
      >
        <div className="border-bottom mb-5">
          <input
            type="text"
            placeholder="Name"
            className="w-100 ol-0 bg-trans br bs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="text"
            placeholder="Category"
            className="w-100 ol-0 bg-trans br bs"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <select
            className="w-100 ol-0 bg-trans br bs"
            value={size}
            onChange={handleSizeChange}
          >
            <option
              value="empty"
              className="w-100 ol-0 bg-trans br bs c-blanca"
            >
              Select Size
            </option>
            <option value="Alto" className="w-100 ol-0 bg-trans br bs">
              Alto
            </option>
            <option value="Maior" className="w-100 ol-0 bg-trans br bs">
              Maior
            </option>
          </select>
        </div>

        <div className="border-bottom mb-5">
          <input
            type="number"
            placeholder="Price"
            className="w-100 ol-0 bg-trans br bs"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="w-100 text-center mt-5">
          {isActive ? (
            <Button type="submit" className="w-25 ol-0 br-kape bs bg-kape">
              Enter
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outline-secondary"
              className="w-25 ol-0 br-kape bs bg-trans c-kape"
              disabled
            >
              Enter
            </Button>
          )}
        </div>
      </form>
    </Container>
  );
}

export function PhoneAddProduct({ props }) {
  return <></>;
}
