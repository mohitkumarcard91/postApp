import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/common/ScrolltoTop";

createRoot(document.getElementById("root")!).render(
  import.meta.env.DEV ? (
    <>
      {" "}
      <BrowserRouter>
        <ScrollToTop/>
        <App />
      </BrowserRouter>
    </>
  ) : (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )
);
