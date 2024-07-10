import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/Users/Register";
import Login from "./components/Users/Login";
import Dashboard from "./components/Users/Dashboard";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import Home from "./components/Home/Home";
import { useAuth } from "./AuthContext/AuthContext";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import BlogPostAIAssistant from "./components/ContentGeneration/ContentGeneration";
import Plans from "./components/Plan/Plan";
import FreePlanSignup from "./components/StripePayment/FreePlanSignup";
import CheckoutForm from "./components/StripePayment/CheckoutForm";
import PaymentSuccess from "./components/StripePayment/PaymentSuccess";
import ContentGenerationHistory from "./components/ContentGeneration/ContentHistory";

import Services from "./components/Services/services";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <>
        {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}

        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Home />} />

          <Route path="/services" element={<Services />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}
