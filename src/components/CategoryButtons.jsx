export default function CategoryButtons({ active, setActive }) {
  const categories = ["all", "makeup", "skincare", "haircare"];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-6 py-2 rounded-full font-semibold capitalize transition
            ${active === cat
              ? "bg-pink-500 text-white shadow"
              : "bg-pink-100 text-pink-600 hover:bg-pink-200"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
