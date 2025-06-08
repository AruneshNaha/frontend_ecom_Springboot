import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductByID } from '../Controllers/ProductController';

export const ProductDetails = () => {

  const { id } = useParams();
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
      <div className="card justify-content-center align-items-center" >
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <h4 className="card-subtitle mb-2 text-body-secondary">{product.brand}</h4>
          <p className="card-text">{product.description}</p>
          <strong>Rs. {product.price}</strong>
          <br />
          <p className='card-text'>Released date: {formatDate(product.releaseDate)}</p>
        </div>
      </div>
    </div>
  )
}
