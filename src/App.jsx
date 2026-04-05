// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Admin from "./pages/Admin.jsx";
import Login from "./pages/Login.jsx";
import ContactSuccess from "./pages/ContactSuccess.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { THEME } from "./config/theme.js";

function App() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(180deg, ${THEME.appGradientStart} 0%, ${THEME.appGradientEnd} 100%)`,
      }}
    >
      <ScrollToTop />

      <Navbar />
      <main className="flex-1 w-full max-w-[1480px] mx-auto px-3 sm:px-4 md:px-6 lg:px-10 xl:px-14 2xl:px-16">
        <Routes>
          <Route path="/contact-success" element={<ContactSuccess />} />
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/quienes-somos" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
