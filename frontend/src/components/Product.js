import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <a href={product.link} target="_blank" rel="noopener noreferrer">
        View on Amazon
      </a>
    </div>
  );
};

export default Product;

