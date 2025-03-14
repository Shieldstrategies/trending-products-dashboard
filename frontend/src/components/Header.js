import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Amazon Trending Products Dashboard</h1>
      <nav>
        <ul>
          <li><a href="#all">All Products</a></li>
          <li><a href="#electronics">Electronics</a></li>
          <li><a href="#fashion">Fashion</a></li>
          <li><a href="#home">Home & Kitchen</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
