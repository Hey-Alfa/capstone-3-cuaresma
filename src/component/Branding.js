import logo from "../images/Logo.png";
import baracco from "../images/baracco.gif";

export function Logo() {
  return (
    <div className="d-flex my-3 w-100">
      <img src={logo} width="200" className="mx-auto" alt="Logo" />
    </div>
  );
}

export function Baracco() {
  return <img src={baracco} width="150" alt="Logo" />;
}
