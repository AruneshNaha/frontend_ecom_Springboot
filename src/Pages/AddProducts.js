import React, { useState, useRef } from 'react';
import { addProduct } from '../Controllers/ProductController';

function AddProducts() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    category: '',
    quantity: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null); // Add this line

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    formData.append('imageFile', imageFile);

    addProduct(formData).then(() => {
      setProduct({
        name: '',
        description: '',
        brand: '',
        price: '',
        category: '',
        quantity: ''
      });
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input
      }
    })
  };

  return (
    <div className="container mt-4">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} value={product.name} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" onChange={handleChange} value={product.description} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input type="text" name="brand" className="form-control" onChange={handleChange} value={product.brand} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" className="form-control" onChange={handleChange} value={product.price} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" name="category" className="form-control" onChange={handleChange} value={product.category} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input type="number" name="quantity" className="form-control" onChange={handleChange} value={product.quantity} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Image</label>
          <input
            type="file"
            name="imageFile"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
            required
            ref={fileInputRef} // Add this line
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
}

export default AddProducts;
