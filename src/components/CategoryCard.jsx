import { Link } from "react-router-dom";

export default function CategoryCard({ name, image }) {
  return (
    <Link
      to={`/shop?category=${name.toLowerCase()}`}
      className="relative group rounded-3xl overflow-hidden shadow-lg"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h3 className="text-white text-3xl font-bold tracking-wide">{name}</h3>
      </div>
    </Link>
  );
}
