import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Client from "./client";
import Modal from "./Modal";
import Sale from "./Sale";

function Table({ cart, setCart, clientId }) {
  const deleteProduct = (id) => {
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  const changeQuantity = (id, newQuantity) => {
    const newCart = cart.map((product) => {
      if (product.id === id) {
        return { ...product, quantity: newQuantity };
      } else {
        return product;
      }
    });
    setCart(newCart);
  };

  const subTotal = cart.map((product) => product.price * product.quantity);
  const total = subTotal.reduce((a, b) => a + b, 0);

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Nombre del producto
            </th>
            <th scope="col" className="py-3 px-6">
              Cantidad
            </th>
            <th scope="col" className="py-3 px-6">
              Precio
            </th>
            <th scope="col" className="py-3 px-6">
              SubTotal
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.map((cartProduct) => (
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {cartProduct.name}
              </th>
              <td className="py-4 px-6">
                <input
                  type="number"
                  min="0"
                  placeholder="Cantidad"
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  value={cartProduct.quantity}
                  onChange={(e) =>
                    changeQuantity(cartProduct.id, e.target.value)
                  }
                />
              </td>
              <td className="py-4 px-6">{cartProduct.price}</td>
              <td className="py-4 px-6">
                {(cartProduct.price * cartProduct.quantity).toFixed(2)}
              </td>
              <td className="py-4 px-6">
                <button onClick={() => deleteProduct(cartProduct.id)}>
                  <svg
                    className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}></td>
            <td className="px-6 py-4 uppercase">
              Total:{" "}
              <span
                className={`font-bold text-base ${
                  cart.length > 0 ? "text-black" : ""
                }`}
              >
                {total.toFixed(2)}
              </span>
            </td>
            <td className="py-4">
              <Sale
                setCart={setCart}
                cart={cart}
                total={total.toFixed(2)}
                clientId={clientId}
              />
            </td>
          </tr>
        </tfoot>
      </table>
      {/* <div className="mr-[70px] flex justify-end font-bold space-x-4 text-xl border-t border-gray-100 px-5 py-4"></div> */}
    </div>
  );
}

function Seller() {
  let [cart, setCart] = useState([]);
  let [clientId, setClientId] = useState(null);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div>
        <Toaster position="botom-right" reverseOrder={false} />
      </div>
      <div className="flex justify-between items-center my-10">
        <Client setClientId={setClientId} />
        <Modal cart={cart} setCart={setCart} />
      </div>
      <Table cart={cart} setCart={setCart} clientId={clientId} />
    </div>
  );
}

export default Seller;
