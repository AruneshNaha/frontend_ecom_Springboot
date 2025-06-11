import axios from 'axios';

export const getAllProducts = async () => {
  const response = await axios.get('http://localhost:8080/api/products');
  const data = await response.data;

  return data;
};

export const getProductByID = async (id) => {
  const response = await axios.get(`http://localhost:8080/api/product/${id}`);
  const data = await response.data;

  return data;
}

export const deleteProductByID = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:8080/api/product/${id}`);
    if (res.status === 200) {
      alert("Product deleted successfully");
    } else {
      alert("Failed to delete product!");
    }
  } catch (error) {
    console.error("Error in deleting the product!", error);
    alert("Error deleting the product!");
  }
}

export const addProduct = async (FormData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/product', FormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Product added successfully:', response.data);
    alert('Product added successfully!');
  } catch (error) {
    console.error('Error adding product:', error);
    alert('Failed to add product.');
  }
}

export const editProduct = async (id, FormData) => {
  try {
    const response = await axios.put(`http://localhost:8080/api/product/${id}`, FormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Product updated successfully:', response.data);
    alert('Product updated successfully!');
  } catch (error) {
    console.error('Error updating product:', error);
    alert('Failed to update product.');
  }
}

