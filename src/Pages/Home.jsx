import React from "react";
import hero from "../assets/images/home-hero.jpg";
import makeup from "../assets/images/makeup/lipstick.jpg";
import skincare from "../assets/images/skincare/serum.jpg";
import haircare from "../assets/images/haircare/shampoo.jpg";
import product1 from "../assets/images/product1.jpg";
import product2 from "../assets/images/product2.jpg";
import product3 from "../assets/images/product3.jpg";

export default function Home() {
  const featuredProducts = [
    { id: 1, name: "Rose Lipstick", image: product1, price: "$25" },
    { id: 2, name: "Glow Serum", image: product2, price: "$30" },
    { id: 3, name: "Shimmer Eyeshadow", image: product3, price: "$20" },
  ];

  const categories = [
    { name: "Makeup", image: makeup },
    { name: "Skincare", image: skincare },
    { name: "Haircare", image: haircare },
  ];

  return (
    <div className="font-sans">

      {/* 🌸 HERO SECTION */}
      <section className="relative h-[85vh] w-full">
        <img
          src={hero}
          alt="Glamora Beauty"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-300/60 to-rose-200/40"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
            Elevate Your Beauty ✨
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 max-w-2xl">
            Discover premium makeup, skincare & haircare made for confident girls 🌸
          </p>
          <a
            href="/shop"
            className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-semibold shadow-xl transition hover:scale-105"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* 💄 FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-pink-500 text-center mb-12">
          Featured Products
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition hover:-translate-y-2"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-pink-500">
                  {product.name}
                </h3>
                <p className="text-gray-700 mt-2">{product.price}</p>

                <a
                  href={`/product/${product.id}`}
                  className="inline-block mt-4 bg-pink-100 text-pink-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-pink-200 transition"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🎀 SHOP BY CATEGORY */}
      <section className="bg-pink-50 py-20">
        <h2 className="text-4xl font-bold text-pink-500 text-center mb-12">
          Shop by Category
        </h2>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <a
              key={i}
              href={`/shop?category=${cat.name.toLowerCase()}`}
              className="relative group rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold tracking-wide">
                  {cat.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 🌷 BRAND PROMISE */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold text-pink-500 mb-6">
          Why Glamora?
        </h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-12">
          We believe beauty is confidence. Our products are carefully crafted
          with love, quality ingredients, and a passion for empowering every girl.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h3 className="text-pink-500 font-semibold text-xl mb-2">
              Premium Quality
            </h3>
            <p className="text-gray-700">
              Safe, tested, and luxurious cosmetic formulas.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h3 className="text-pink-500 font-semibold text-xl mb-2">
              Cruelty Free
            </h3>
            <p className="text-gray-700">
              Beauty without harm, always ethical.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <h3 className="text-pink-500 font-semibold text-xl mb-2">
              Made for You
            </h3>
            <p className="text-gray-700">
              Designed for all skin tones & styles.
            </p>
          </div>
        </div>
      </section>

      {/* 💖 BEAUTY QUOTES SECTION (Before Footer) */}
      <section className="bg-gradient-to-r from-pink-100 to-rose-100 py-20">
        <h2 className="text-4xl font-bold text-pink-500 text-center mb-12">
          Beauty Quotes
        </h2>

        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <p className="text-gray-700 italic">
              “Beauty begins the moment you decide to be yourself.”
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <p className="text-gray-700 italic">
              “Confidence is the best makeup a girl can wear.”
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <p className="text-gray-700 italic">
              “Glow differently when you love yourself.”
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}