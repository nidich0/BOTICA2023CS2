import React from "react";
import { useState, useEffect } from "react";

export default function Products({ cart, setCart }) {
  let [loading, setIsLoading] = useState(true);
  let [products, setProducts] = useState(null);
  let [searchProduct, setsearchProduct] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch("/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const searcher = (e) => {
    setsearchProduct(e.target.value);
    console.log(e.target.value);
  };

  let results = products;

  if (!searchProduct) {
    results = products.filter((product) => {
      const isRepeated = cart.find((item) => item.id === product.id);
      if (isRepeated) return false;

      return true;
    });
  } else {
    results = products
      .filter((product) => {
        return product.name.toLowerCase().includes(searchProduct.toLowerCase());
      })
      .filter((product) => {
        const isRepeated = cart.find((item) => item.id === product.id);
        if (isRepeated) return false;
        return true;
      });
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <div className="font-semibold text-gray-800">Productos</div>
      </header>
      <div className="overflow-x-auto p-3">
        <input
          type="text"
          placeholder="Search"
          value={searchProduct}
          onChange={searcher}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full"
        />
        <table className="table-auto w-full table-hover">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2">
                <div className="font-semibold text-left">Product Name</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-left">Price</div>
              </th>
              <th className="p-2">
                <div className="font-semibold text-center">Action</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {results.map((product) => (
              <tr>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.price}</td>
                <td className="p-2 flex justify-center">
                  <button
                    onClick={() =>
                      setCart((prevCart) => [
                        ...prevCart,
                        { ...product, quantity: 1 },
                      ])
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-plus"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
