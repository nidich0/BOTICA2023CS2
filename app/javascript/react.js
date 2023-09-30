import React from "react";
import { createRoot } from "react-dom/client";
import Seller from "./components/Seller";

function renderComponent() {
  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(<Seller />);
  }
}

document.addEventListener("DOMContentLoaded", renderComponent);
document.addEventListener("turbo:render", renderComponent);
