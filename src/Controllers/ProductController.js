import axios from 'axios';
import React from 'react'


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



