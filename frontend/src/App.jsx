import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import state from "./store";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Store from "./pages/Store";
import Product from "./pages/Product";

function App() {
  useEffect(() => {
    const color = JSON.parse(localStorage.getItem("color"));

    if (color) {
      state.color = color;
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:id" element={<Product />} />
        <Route
          path="/*"
          element={
            <main className="app transition-all ease-in">
              <Home />
              <Canvas />
              <Customizer />
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
