import { Container, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Logo } from "../component/Branding";

import Swal from "sweetalert2";

export function DeskRegister() {
  const { user } = useContext(UserContext);
  const navegate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();
    fetch("https://capstone-2-cuaresma.onrender.com/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        username: username,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setFirstname("");
          setLastname("");
          setUsername("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setPassword2("");

          Swal.fire({
            title: "Registration successful!",
            icon: "success",
            text: `${data.message}`,
          });
          navegate("/signin");
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
    if (
      firstname !== "" &&
      lastname !== "" &&
      username !== "" &&
      mobileNo !== "" &&
      email !== "" &&
      password !== "" &&
      password === password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstname, lastname, username, mobileNo, email, password, password2]);

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Container className="w-100 mx-auto my-5">
      <h1 className=" text-center">Create Account</h1>
      <p className="text-center mb-5">
        Already have an account?{" "}
        <a href="/signin" className="c-blanca">
          Sign In Here
        </a>
      </p>
      <form
        className="w-50 m-auto p-3 rounded bg-blanca"
        onSubmit={(e) => registerUser(e)}
      >
        <div className="border-bottom mb-5">
          <input
            type="text"
            placeholder="Firstname"
            className="w-100 ol-0 bg-trans br bs"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="text"
            placeholder="Lastname"
            className="w-100 ol-0 bg-trans br bs"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="text"
            placeholder="Username"
            className="w-100 ol-0 bg-trans br bs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="text"
            placeholder="MobileNo"
            className="w-100 ol-0 bg-trans br bs"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="Email"
            placeholder="Email"
            className="w-100 ol-0 bg-trans br bs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="password"
            placeholder="Password"
            className="w-100 ol-0 bg-trans br bs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-2">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-100 ol-0 bg-trans br bs"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
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

export function PhoneRegister() {
  const { user } = useContext(UserContext);
  const navegate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();
    fetch("https://capstone-2-cuaresma.onrender.com/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        username: username,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setFirstname("");
          setLastname("");
          setUsername("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setPassword2("");

          Swal.fire({
            title: "Registration successful!",
            icon: "success",
            text: `${data.message}`,
          });
          navegate("/signin");
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
    if (
      firstname !== "" &&
      lastname !== "" &&
      username !== "" &&
      mobileNo !== "" &&
      email !== "" &&
      password !== "" &&
      password === password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstname, lastname, username, mobileNo, email, password, password2]);

  return user.id !== null ? (
    <Navigate to="/" />
  ) : (
    <Container className="w-100 mx-auto py-5 my-5">
      <Logo />
      <h1 className=" text-center">Create Account</h1>
      <p className="text-center mb-5">
        Already have an account?{" "}
        <a href="/signin" className="c-blanca">
          Sign In Here
        </a>
      </p>
      <form className="w-75 m-auto" onSubmit={(e) => registerUser(e)}>
        <div className="border-bottom mb-5">
          <input
            type="text"
            placeholder="Firstname"
            className="w-100 ol-0 bg-trans br bs"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="text"
            placeholder="Lastname"
            className="w-100 ol-0 bg-trans br bs"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="text"
            placeholder="Username"
            className="w-100 ol-0 bg-trans br bs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="text"
            placeholder="MobileNo"
            className="w-100 ol-0 bg-trans br bs"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="Email"
            placeholder="Email"
            className="w-100 ol-0 bg-trans br bs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-5">
          <input
            type="password"
            placeholder="Password"
            className="w-100 ol-0 bg-trans br bs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="border-bottom mb-2">
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-100 ol-0 bg-trans br bs"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="w-100 text-center my-5">
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
