import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteProductByID, getProductByID } from '../Controllers/ProductController';

export const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductByID(id).then((data) => {
      setProduct(data);
    });

  }, [id])

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '');
  };


  return (
    <div className="container p-5 justify-content-center align-items-center">
      <strong><h1 className='text-center'>Product Details</h1></strong>
      <strong><h2 className='text-center'>Category: {product.category}</h2></strong>
      <div className="card justify-content-center align-items-center">
        <div className="row g-0 align-items-center">
          <div className="col-md-4 d-flex justify-content-center">
            <img
              src={`http://localhost:8080/api/product/image/${product.id}`}
              alt="Product"
              style={{ width: "250px", height: "250px", objectFit: "cover", aspectRatio: "1 / 1" }}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">{product.name}</h3>
              <h4 className="card-subtitle mb-2 text-body-secondary">{product.brand}</h4>
              <p className="card-text">{product.description}</p>
              <strong>Rs. {product.price}</strong>
              <div className="card-text">Items left in stock: {product.quantity}</div>
              <br />
              <p className='card-text'>Released date: {formatDate(product.releaseDate)}</p>
              <br />
              <div className="card-body d-flex gap-3">
                <button
                  className="btn btn-warning"
                  onClick={() => window.location.href = `/editProduct/${product.id}`}
                >
                  Edit this product
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteProductByID(product.id);
                    navigate('/', { replace: true }); // Redirect to home page after deletion 
                  }}
                >
                  Delete this product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
