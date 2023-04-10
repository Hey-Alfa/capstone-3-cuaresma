import { Table, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import { EditName, EditPrice, Transaction, Status } from "./Modal";
export function OrderTable() {
  const { user } = useContext(UserContext);
  const [allOrder, setAllOrder] = useState([]);

  const fetchData = () => {
    fetch("https://capstone-2-cuaresma.onrender.com/order/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllOrder(
          data.order.map((o, index) => {
            return (
              <>
                <tr key={o._id}>
                  <td>{index + 1}</td>
                  <td>{o._id}</td>
                  <td>{o.userId}</td>
                  <td>Php {o.totalAmount}</td>
                  <td>
                    <Status order={o} />
                  </td>
                  <td>
                    <Transaction order={o} />
                  </td>
                  <td>
                    {o.products.map((product) => (
                      <div key={product._id} className="w-50">
                        {product.productId}
                      </div>
                    ))}
                  </td>
                </tr>
              </>
            );
          })
        );
      });
  };

  useEffect(() => {
    fetchData();
  });
  return (
    <>
      <Table striped bordered hover className=" mw-75 m-auto my-3" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Order Id</th>
            <th>User Id</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Transaction</th>
            <th>Products Id</th>
          </tr>
        </thead>
        <tbody>{allOrder}</tbody>
      </Table>
    </>
  );
}

/*
{
            "_id": "642bd3e94707122aec29fb5f",
            "name": "Cheesecake Matcha",
            "category": "Cheesecake",
            "size": "Alto",
            "price": 140,
            "isAvailable": true,
            "createdOn": "2023-04-04T07:33:47.297Z",
            "totalSales": 560,
            "order": [
                {
                    "orderId": "642bf1284707122aec2a126b",
                    "quantity": 2,
                    "subTotal": 280,
                    "purchasedOn": "2023-04-04T07:33:47.527Z",
                    "_id": "642bf1294707122aec2a1270"
                },
                {
                    "orderId": "642cee63ccb83f54e49b75ea",
                    "quantity": 2,
                    "subTotal": 280,
                    "purchasedOn": "2023-04-05T01:37:39.248Z",
                    "_id": "642cee63ccb83f54e49b75f5"
                }
            ],
            "__v": 2
        }

*/

export function ProductTable() {
  const { user } = useContext(UserContext);
  const [allProduct, setAllProduct] = useState([]);

  const fetchData = () => {
    fetch("https://capstone-2-cuaresma.onrender.com/products/all/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(
          data.product.map((p, index) => {
            return (
              <>
                <tr key={p._id}>
                  <td>{index + 1}</td>
                  <td>{p._id}</td>
                  <td>
                    <EditName value={p} key={p.id} />
                  </td>
                  <td>{p.size}</td>
                  <td>
                    <EditPrice value={p} key={p.id} />
                  </td>
                  <td>Php {p.totalSales}</td>
                  {p.isAvailable ? (
                    <td className="text-success">Available</td>
                  ) : (
                    <td className="text-danger">Not Available</td>
                  )}
                  <td>
                    {p.isAvailable ? (
                      <Button
                        variant="danger"
                        onClick={() => archiveProduct(p._id)}
                      >
                        Archive
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => unArchiveProduct(p._id)}
                      >
                        Unarchive
                      </Button>
                    )}
                  </td>
                  {/* <td>
                    {o.products.map((product) => (
                      <div key={product._id}>{product.productId}</div>
                    ))}
                  </td> */}
                </tr>
              </>
            );
          })
        );
      });
  };

  const archiveProduct = (productId) => {
    fetch(
      `https://capstone-2-cuaresma.onrender.com/products/archive/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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
          fetchData();
        } else {
          Swal.fire({
            title: "Unsuccessful!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  };
  const unArchiveProduct = (productId) => {
    fetch(
      `https://capstone-2-cuaresma.onrender.com/products/unarchive/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          Swal.fire({
            title: "Succesful!",
            icon: "success",
            text: `${data.message}`,
          });
          fetchData();
        } else {
          Swal.fire({
            title: "Unsuccessful!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  };
  useEffect(() => {
    fetchData();
  });
  return (
    <>
      <Table striped bordered hover className="w-75 m-auto my-3" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Id</th>
            <th>Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Total Sales</th>
            <th>Status</th>
            <th>Action</th>
            {/* <th>Order</th> */}
          </tr>
        </thead>
        <tbody>{allProduct}</tbody>
      </Table>
    </>
  );
}
