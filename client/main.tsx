import "./index.css";

import App from "./App.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { socket } from "./socket.ts";

socket.on("connect", () => {
  console.log(socket.id);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
