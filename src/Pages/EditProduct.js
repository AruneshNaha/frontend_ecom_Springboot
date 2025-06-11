import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { editProduct, getProductByID } from '../Controllers/ProductController';
import { useNavigate, useParams } from 'react-router-dom';

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    category: '',
    quantity: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null); // Add this line

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    formData.append('imageFile', imageFile);
    editProduct(id, formData).then(() => {
      navigate('/');
    }).catch((error) => {
      console.log(error)
    });
  };

  useEffect(() => {
    getProductByID(id).then((data) => {
      setProduct({
        name: data.name,
        description: data.description,
        brand: data.brand,
        price: data.price,
        category: data.category,
        quantity: data.quantity
      });
    })

    setImagePreview(axios.get(`http://localhost:8080/api/product/image/${id}`, { responseType: 'blob' })
      .then(response => {
        setImagePreview(URL.createObjectURL(response.data));
      })
      .catch(error => {
        console.error("Error fetching product image:", error);
      }));
  }, [id])



  return (
    <div className="container mt-4">
      <h3>Edit this Product</h3>
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
          {imagePreview && (
            <div className="mb-2">
              <img
                src={imagePreview}
                alt="Current Product"
                style={{ width: "150px", height: "150px" }} />
            </div>
          )}
          <label className="form-label">Product Image</label>
          <input
            type="file"
            name="imageFile"
            className="form-control"
            onChange={handleFileChange}
            accept="image/*"
            // value={imageFile}
            required
            ref={fileInputRef} // Add this line
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
