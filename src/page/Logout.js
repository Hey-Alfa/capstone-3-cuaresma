import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "../UserContext";

export function Logout() {
  const { unsetUser, setUser } = useContext(UserContext);

  unsetUser();
  useEffect(() => {
    setUser({ id: null });
  }, []);

  return <Navigate to="/" />;
}
