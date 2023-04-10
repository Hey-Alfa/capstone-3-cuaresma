import { Baracco } from "../component/Branding";
import { SlideShow } from "../component/Carousel";
import { Container } from "react-bootstrap";
export function DeskHome() {
  return (
    <Container>
      <div className="d-flex mt-5 w-100 justify-content-center">
        <Baracco />
        <div className="g-script b-font text-center c-kape">Kape Baracco</div>
      </div>
      <SlideShow />
    </Container>
  );
}

export function PhoneHome() {
  return (
    <Container>
      <div className="d-flex my-5 w-100 flex-column align-items-center">
        <Baracco />
        <h1 className="g-script text-center c-kape">Kape Baracco</h1>
      </div>

      <SlideShow />
    </Container>
  );
}
