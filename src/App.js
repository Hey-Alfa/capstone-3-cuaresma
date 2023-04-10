import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { DeskNavBar, PhoneNavBar } from "./component/NavBar";
import { DeskLogin, PhoneLogin } from "./page/Login";
import { DeskRegister, PhoneRegister } from "./page/Register";
import { DeskHome, PhoneHome } from "./page/Home";
import { DeskProducts } from "./page/Products";
import { Logout } from "./page/Logout";
import { AdminProduct } from "./page/AdminProduct";
import { AllOrders } from "./page/AllOrder";
import { DeskAdmin } from "./page/Admin";
import { DeskAddProduct } from "./page/AddProduct";
import { Order } from "./page/Order";
import { Account } from "./page/Account";
function App() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 992px)",
  });

  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
    username: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };
  useEffect(() => {
    fetch("https://capstone-2-cuaresma.onrender.com/users/details/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.user._id !== "undefined") {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin,
            username: data.user.username,
          });
          console.log(data.user._id, data.user.isAdmin, data.user.username);
        } else {
          setUser({
            id: null,
            isAdmin: null,
            username: null,
          });
        }
      });
  }, []);
  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        {isDesktop ? <DeskNavBar /> : <PhoneNavBar />}

        <Container>
          <Routes>
            <Route
              path="/"
              element={isDesktop ? <DeskHome /> : <PhoneHome />}
            ></Route>
            <Route path="/admin" element={<DeskAdmin />}></Route>
            <Route path="/products" element={<DeskProducts />}></Route>
            <Route path="allproducts" element={<AdminProduct />}></Route>
            <Route path="/add-product" element={<DeskAddProduct />}></Route>
            <Route path="allorders" element={<AllOrders />}></Route>
            <Route path="account" element={<Account />}></Route>
            <Route
              path="/signin"
              element={isDesktop ? <DeskLogin /> : <PhoneLogin />}
            ></Route>
            <Route path="/order" element={<Order />}></Route>
            <Route
              path="/signup"
              element={isDesktop ? <DeskRegister /> : <PhoneRegister />}
            ></Route>
            <Route path="/signout" element={<Logout />}></Route>
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
