import React from 'react';
import Product from './components/Product';
import Header from './components/Header';

const products = [
  {
    id: 1,
    title: 'Sample Product 1',
    price: '$29.99',
    image: 'https://via.placeholder.com/150',
    link: 'https://amazon.com'
  },
  {
    id: 2,
    title: 'Sample Product 2',
    price: '$39.99',
    image: 'https://via.placeholder.com/150',
    link: 'https://amazon.com'
  },
  {
    id: 3,
    title: 'Sample Product 3',
    price: '$49.99',
    image: 'https://via.placeholder.com/150',
    link: 'https://amazon.com'
  }
];

function App() {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
