import Carousel from "react-bootstrap/Carousel";
import { testimonials } from "../siteData";

export default function ReviewCarousel() {
  return (
    <Carousel className="review-carousel" interval={7000} pause="hover">
      {testimonials.map((testimonial) => (
        <Carousel.Item key={testimonial.author}>
          <figure className="review-card">
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>{testimonial.author}</figcaption>
          </figure>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
