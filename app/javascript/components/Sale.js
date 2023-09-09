import React from "react";
import toast from "react-hot-toast";

export default function Sale({ cart, total, setCart, clientId }) {
  const saleParams = {
    total: total,
    products: cart,
    client_id: clientId,
  };

  function processSale() {
    if (cart.length === 0) {
      toast.error("No hay productos en el carrito");
      return;
    }
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saleParams),
    };

    fetch("/sales", params)
      .then((response) => response.json())
      .then((data) => {
        toast.success("Venta realizada con éxito");
        setCart([]);
      })
      .catch((error) => {
        toast.error("Error al realizar la venta");
      });
  }

  return (
    <div className="text-base">
      <button
        disabled={cart.length === 0}
        onClick={processSale}
        type="button"
        className="px-4 py-2 bg-indigo-500 outline-none rounded text-white shadow-indigo-200 shadow-lg font-medium active:shadow-none active:scale-95 hover:bg-indigo-600 focus:bg-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400/80 disabled:shadow-none disabled:cursor-not-allowed transition-colors duration-200"
      >
        Procesar pago
      </button>
    </div>
  );
}
