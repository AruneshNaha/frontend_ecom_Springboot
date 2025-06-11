import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProductDetails } from './Pages/ProductDetails';
import Navbar from './Components/Navbar';
import AddProducts from './Pages/AddProducts';
import EditProduct from './Pages/EditProduct';

function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/addProducts" element={<AddProducts />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
