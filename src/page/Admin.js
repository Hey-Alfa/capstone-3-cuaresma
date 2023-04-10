import { Baracco } from "../component/Branding";
import { OrderTable, ProductTable } from "../component/Table";
import { useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import "../App.css";

export function DeskAdmin() {
  const { user } = useContext(UserContext);
  console.log(user);
  const navegate = useNavigate();
  if (user.isAdmin === false) {
    navegate("/");
  }
  console.log(user);
  return (
    <>
      <div className="d-flex flex-column align-items-center my-4">
        <Baracco />
        <h4 className="c-blanca">
          "Welcome back, <strong className="c-kape">{user.username}</strong>!
          <stron className="c-kape"> Baracco </stron>is excited to brew your
          perfect cup of coffee"
        </h4>
      </div>
      <div className="text-center">
        <h2 className="c-kape my-3">Admin Dashboard</h2>
        <a href="/add-product">
          <i
            class="bi bi-plus-square-fill"
            style={{ fontSize: "2.3rem", color: "#724100" }}
          ></i>
        </a>
      </div>

      <div className="w-100 my-5">
        <Tabs
          defaultActiveKey="products"
          id="uncontrolled-tab-example"
          className="g-font mb-3"
          fill
        >
          <Tab eventKey="order" title="Order" className="c-kape">
            <OrderTable />
          </Tab>
          <Tab eventKey="products" title="Products" className="c-kape">
            <ProductTable />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
