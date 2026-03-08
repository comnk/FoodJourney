export default function StarComponent({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <span key={i} className="star full">
            ★
          </span>
        ))}
      {halfStar && <span className="star half">★</span>}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <span key={i} className="star empty">
            ☆
          </span>
        ))}
    </div>
  );
}
