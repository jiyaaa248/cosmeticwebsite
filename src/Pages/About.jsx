import React from "react";
import hero from "../assets/images/about-hero.jpg";
import team from "../assets/images/team.jpeg";
import products from "../assets/images/products.jpg";

export default function About() {
  return (
    <div className="min-h-screen font-sans">

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img
          src={hero}
          alt="About Glamora"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            About Glamora 🌸
          </h1>
        </div>
      </div>

      {/* Brand Story */}
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img
            src={products}
            alt="Our Products"
            className="w-full h-[600px] md:h-[350px] rounded-xl object-cover shadow-lg hover:shadow-2xl transition duration-300"
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-pink-500">Our Story</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Glamora started with the dream of making every girl feel beautiful and confident. 
            We create high-quality, safe, and trendy cosmetic products that enhance natural beauty.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We believe beauty is not just skin-deep. Our mission is to empower girls with products that bring joy, creativity, and confidence.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-pink-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold text-pink-500 mb-2">Our Mission</h2>
          <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            At Glamora, our mission is to deliver high-quality, safe, and inclusive cosmetic products that empower girls to feel confident and creative every day.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-pink-500 mb-2">Quality Products</h3>
            <p className="text-gray-700">All products are made with premium ingredients and love.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-pink-500 mb-2">Customer First</h3>
            <p className="text-gray-700">Your satisfaction is our priority. We listen, create, and deliver happiness.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-pink-500 mb-2">Beauty for All</h3>
            <p className="text-gray-700">Inclusive cosmetic line for every skin tone, style, and occasion.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-pink-50 py-20 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-200 rounded-full opacity-30"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-300 rounded-full opacity-20"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold text-pink-500 text-center mb-4">Our Team</h2>
          <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full mb-8"></div>
          <p className="text-gray-700 text-center mb-12 max-w-2xl mx-auto">
            Meet the passionate team behind Glamora 🌸. Together, we create products that empower and inspire.
          </p>
          <div className="flex justify-center">
            <div className="overflow-hidden rounded-xl shadow-2xl relative group">
              <img 
                src={team} 
                alt="Our Team" 
                className="w-full md:w-3/4 h-[400px] md:h-[500px] object-cover transform transition duration-[1200ms] ease-in-out group-hover:scale-125 group-hover:w-full"
              />
              {/* Optional overlay text */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-30 transition duration-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ / Beauty Tips */}
      <div className="bg-pink-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-pink-500 mb-10">Beauty Tips & FAQ</h2>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-pink-500 mb-2">How to choose the right foundation?</h3>
              <p className="text-gray-700">Pick a shade close to your natural skin tone and test on your jawline for best results.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-pink-500 mb-2">How to care for makeup brushes?</h3>
              <p className="text-gray-700">Clean them weekly with gentle soap and air dry to maintain hygiene and performance.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-pink-500 mb-2">Best skincare for dry skin?</h3>
              <p className="text-gray-700">Use hydrating serums and moisturizers with natural ingredients for soft and radiant skin.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-semibold text-pink-500 mb-2">How to remove makeup safely?</h3>
              <p className="text-gray-700">Use gentle makeup removers and wash with lukewarm water to avoid irritation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-pink-100 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Discover Our Products 🌸</h2>
        <a
          href="/shop"
          className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-3 rounded-full shadow-lg transition"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
}
