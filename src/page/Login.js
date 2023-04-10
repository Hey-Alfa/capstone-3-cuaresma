import { Container, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Logo } from "../component/Branding";
import "../App.css";

export function DeskLogin() {
  const { user, setUser } = useContext(UserContext);
  const navegate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function authenticate(e) {
    e.preventDefault();
    fetch("https://capstone-2-cuaresma.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.accessToken !== "undefined") {
          localStorage.setItem("token", data.accessToken);

          retrieveUserDetails(data.accessToken);

          Swal.fire({
            title: "Login Successful!",
            icon: "success",
            text: `${data.message}`,
          });

          if (data.user.isAdmin) {
            navegate("/admin");
          } else {
            navegate("/products");
          }
        } else {
          Swal.fire({
            title: "Authentication Unsuccessfull!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  }

  const retrieveUserDetails = (token) => {
    fetch("https://capstone-2-cuaresma.onrender.com/users/details/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.user._id !== "undefined") {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin,
          });
        }
      });
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);
  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Container fluid>
      <h1 className="text-center mt-5">Login</h1>
      <p className="text-center mb-5">
        Don't have an Account?{" "}
        <a href="/signup" className="c-blanca">
          Sign Up Here
        </a>
      </p>
      <form
        className="w-50 m-auto p-4 rounded bg-blanca"
        onSubmit={(e) => authenticate(e)}
      >
        <div className="border-bottom mb-5">
          <input
            type="email"
            placeholder="Email"
            className="w-100 ol-0 bg-trans br bs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-2">
          <input
            type="password"
            placeholder="Password"
            className="w-100 ol-0 bg-trans br bs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href="/signin" className="text-left c-blanca">
          Forgot password?
        </a>
        <div className="w-100 text-center mt-5">
          {isActive ? (
            <Button type="submit" className="w-25 ol-0 br-kape bs bg-kape">
              Enter
            </Button>
          ) : (
            <Button
              type="submit"
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

export function PhoneLogin() {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navegate = useNavigate();

  function authenticate(e) {
    e.preventDefault();
    fetch("https://capstone-2-cuaresma.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.accessToken !== "undefined") {
          localStorage.setItem("token", data.accessToken);

          retrieveUserDetails(data.accessToken);

          Swal.fire({
            title: "Login Successful!",
            icon: "success",
            text: `${data.message}`,
          });
          if (data.user.isAdmin) {
            navegate("/admin");
          } else {
            navegate("/products");
          }
        } else {
          Swal.fire({
            title: "Authentication Unsuccessfull!",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  }

  const retrieveUserDetails = (token) => {
    fetch("https://capstone-2-cuaresma.onrender.com/users/details/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data._id !== "undefined") {
          setUser({
            id: data.user.id,
            isAdmin: data.user.isAdmin,
          });
        }
      });
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);
  return user.id !== null ? (
    <Navigate to="/products" />
  ) : (
    <Container fluid>
      <Logo />
      <h1 className="text-center mt-5">Login</h1>
      <p className="text-center mb-5">
        Don't have an Account?{" "}
        <a href="/signup" className="c-blanca">
          Sign Up Here
        </a>
      </p>
      <form className="w-75 py-3 m-auto" onSubmit={(e) => authenticate(e)}>
        <div className="border-bottom mb-5">
          <input
            type="email"
            placeholder="Email"
            className="w-100 ol-0 bg-trans br bs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-2">
          <input
            type="password"
            placeholder="Password"
            className="w-100 ol-0 bg-trans br bs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href="/signin" className="text-left  c-blanca">
          Forgot password?
        </a>
        <div className="w-100 text-center mt-5">
          {isActive ? (
            <Button type="submit" className="w-25 ol-0 br-kape bs bg-kape">
              Enter
            </Button>
          ) : (
            <Button
              type="submit"
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
