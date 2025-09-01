import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ContextProvider } from "./components/providers/context-provider.jsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <Toaster theme="system" richColors closeButton />
      <App />
    </ContextProvider>
  </StrictMode>
);
