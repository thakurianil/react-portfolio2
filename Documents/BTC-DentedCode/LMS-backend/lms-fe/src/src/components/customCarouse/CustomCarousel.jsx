import Carousel from "react-bootstrap/Carousel";
import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";

export const CustomCarousel = () => {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img className="d-block w-100" src={slider1} alt="First slide" />
        <Carousel.Caption className="p-2 rounded text-light opacity-2 carousel-caption-bg">
          <h5>Explore Our Extensive Collection</h5>
          <hr />
          <p>
            From classics to the latest bestsellers, discover books for every
            interest and age. Start your reading journey with us!
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src={slider2} alt="Second slide" />
        <Carousel.Caption className="p-2 rounded text-light opacity-2 carousel-caption-bg">
          <h5>Easy Borrowing and Returns</h5>
          <hr />
          <p>
            Manage your borrowed books with just a click. Renew, return, and
            reserve titles effortlessly through our system.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src={slider3} alt="Third slide" />
        <Carousel.Caption className="p-2 rounded text-light opacity-2 carousel-caption-bg">
          <h5>Rate and Review Your Reads</h5>
          <hr />
          <p>
            Share your thoughts and rate books to help others find their next
            great read. Join a community of passionate readers!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};
