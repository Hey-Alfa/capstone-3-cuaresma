import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import { OrderCard } from "../component/Cards";

export function Order() {
  const [order, setOrder] = useState([]);
  const { user } = useContext(UserContext);
  const fetchData = () => {
    fetch("https://capstone-2-cuaresma.onrender.com/order/history/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(
          data.order.map((o) => {
            return <OrderCard prop={o} key={o._id} />;
          })
        );
      });
  };
  useEffect(() => {
    fetchData();
  });

  return <>{order}</>;
}
