import React from 'react';
import './Product.css';

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-title">{product.title}</div>
      <div className="product-price">${product.price.toFixed(2)}</div>
      <div className="product-rating">⭐ {product.rating}</div>
    </div>
  );
};

export default Product;
