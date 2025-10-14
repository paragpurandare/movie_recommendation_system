import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Toaster } from "react-hot-toast";
import {GoogleOAuthProvider} from "@react-oauth/google";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={"660489005121-6l3kgh1l7cl2dfrtke6lqcpb80h1o4hq.apps.googleusercontent.com"}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);