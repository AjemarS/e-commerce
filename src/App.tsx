import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import CartPage from "./pages/CartPage";
import LikedPage from "./pages/LikedPage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/liked" element={<LikedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
