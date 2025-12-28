import CarouselItem from "../carousel-item/carousel-item";
import "./autoplay-carousel.scss";

import { testimonialsList } from "@/lib/constants/testimonials";

export default function AutoCarousel() {
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {testimonialsList.map((testimonial, index) => {
          return (
            <CarouselItem
              key={index}
              userName={testimonial.userName}
              stars={testimonial.stars}
              review={testimonial.review}
            />
          );
        })}
        {testimonialsList.map((testimonial, index) => {
          return (
            <CarouselItem
              key={`duplicate-${index}`}
              userName={testimonial.userName}
              stars={testimonial.stars}
              review={testimonial.review}
            />
          );
        })}
      </div>
    </div>
  );
}
