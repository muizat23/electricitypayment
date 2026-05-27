export default function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5 text-sm">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? "text-yellow-400" : "text-gray-700"}>
          ★
        </span>
      ))}
    </div>
  );
}
