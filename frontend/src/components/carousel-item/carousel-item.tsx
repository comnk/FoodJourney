interface CarouselItemProps {
  userName: string;
  review: string;
  stars: number;
}

import "./carousel-item.scss";

export default function CarouselItem({
  userName,
  review,
  stars,
}: CarouselItemProps) {
  return (
    <div className="carousel-card">
      <div className="stars">
        {Array.from({ length: stars }).map((_, index) => (
          <span key={index}>⭐</span>
        ))}
      </div>
      <p className="review">{review}</p>
      <p className="user-name">- {userName}</p>
    </div>
  );
}
