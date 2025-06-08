import './App.css';
import Card from './Components/Card';

import { useState, useEffect } from 'react';
import { getAllProducts } from './Controllers/ProductController';

function App() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const productList = await getAllProducts();
    setProducts(productList);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {
        products.length > 0 ? (
          <div className="container d-flex flex-wrap align-content-around">
            {
              products.map((product, index) => (
                <Card key={index}
                  productID={product.id}
                  productName={product.name}
                  productBrand={product.brand}
                  productDescription={product.description}
                  productPrice={product.price} />
              ))
            }
          </div>
        ) : (
          <h3 className='justify-content-center'>Loading...</h3>
        )
      }
    </>
  );
}

export default App;
