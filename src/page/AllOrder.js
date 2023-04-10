import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { AllOrderCard } from "../component/Cards";

export function AllOrders() {
  const [order, setOrder] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    fetch("https://capstone-2-cuaresma.onrender.com/order/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const orderArr = data.order.map((o) => {
          return <AllOrderCard orderProp={o} key={o._id} />;
        });
        setOrder(orderArr);
      });
  }, [order]);

  return (
    <>
      <h1>All Order</h1>
      {order}
    </>
  );
}
