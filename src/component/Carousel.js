import Carousel from "react-bootstrap/Carousel";
import coffee from "../images/coffee.jpg";
import coffee2 from "../images/coffee2.jpg";
import coffee3 from "../images/coffee3.jpg";
export function SlideShow() {
  return (
    <Carousel className="w-100">
      <Carousel.Item>
        <img className="d-block w-100" src={coffee} alt="First slide" />
        <Carousel.Caption>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={coffee2} alt="Second slide" />
        <Carousel.Caption>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={coffee3} alt="Third slide" />

        <Carousel.Caption>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
