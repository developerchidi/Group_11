import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">MyApp</h1>

      <div className="flex gap-4">
        <a href="/">Home</a>
        <a href="/products">Products</a>
      </div>
    </nav>
  );
};

export default Navbar;