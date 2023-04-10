import unknown from "../images/unknown.png";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";

export function Account() {
  const [user, setUser] = useState({
    id: null,
    username: null,
    name: null,
    email: null,
    mobileNo: null,
    address: null,
  });
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
            username: data.user.username,
            name: `${data.user.firstName} ${data.user.lastName}`,
            email: data.user.email,
            mobileNo: data.user.mobileNo,
            address: null,
          });
          console.log(data.user._id, data.user.isAdmin, data.user.username);
        } else {
          setUser({
            _id: null,
            name: null,
            email: null,
            mobileNo: null,
            address: null,
          });
        }
      });
  }, []);
  return (
    <>
      <div className="d-flex flex-column align-items-center my-5">
        <img src={unknown} alt="unknown user" style={{ maxWidth: "150px" }} />
        <h1 className="my-2 g-font-lg">{user.username}</h1>
      </div>
      <div className="br-kape p-3">
        <div className="w-75 mx-auto p-2 my-2 br-kape br-round">
          <h3>
            <strong>Id:</strong> {user.id}
          </h3>
        </div>
        <div className="w-75 mx-auto p-2 my-2 br-kape br-round">
          <h3>
            <strong>Name:</strong> {user.name}
          </h3>
        </div>
        <div className="w-75 mx-auto p-2 my-2 br-kape br-round">
          <h3>
            <strong>Email:</strong> {user.email}
          </h3>
        </div>
        <div className="w-75 mx-auto p-2 my-2 br-kape br-round">
          <h3>
            <strong>Contact:</strong> {user.mobileNo}
          </h3>
        </div>
      </div>
    </>
  );
}
