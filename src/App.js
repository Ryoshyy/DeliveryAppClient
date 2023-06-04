import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { CartPage } from "./Pages/CartPage/CartPage.jsx";
import { HomePage } from "./Pages/HomePage/HomePage.jsx";
import { Header } from "./Components/Header/Header.jsx";
import Particle from "./Components/ParticleBg/Particle.jsx";

function App() {


  return (
    <>
      <Particle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/products" />}></Route>
          <Route path="/products/:companyId?" element={<HomePage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
