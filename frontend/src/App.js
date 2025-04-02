import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';  // Import Plotly component
import './App.css';

function App() {
  const [insights, setInsights] = useState([]);  // Store trending insights
  const [products, setProducts] = useState([]); // Store all products data
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products
  const [categoryFilter, setCategoryFilter] = useState('all'); // Store selected category
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  // Fetch data from Flask backend when the component mounts
  useEffect(() => {
    fetch('http://192.168.1.159:5001/insights')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        setInsights(data);  // Store the insights in the state
        setProducts(data);  // Store the products data for filtering
        setFilteredProducts(data);  // Initially set filtered products to all products
        setLoading(false);  // Data loaded, set loading to false
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);  // Set error if fetching fails
        setLoading(false);  // Stop loading on error
      });
  }, []);

  // Filter the products by category
  const filterProductsByCategory = (category) => {
    if (category === 'all') {
      setFilteredProducts(products); // Show all products if category is 'all'
    } else {
      setFilteredProducts(products.filter(product => product.category === category)); // Filter by category
    }
  };

  // Handle category filter change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategoryFilter(selectedCategory);
    filterProductsByCategory(selectedCategory); // Update filtered products when category changes
  };

  // Prepare data for the Plotly chart
  const chartData = {
    x: filteredProducts.map(product => product.title),
    y: filteredProducts.map(product => product.predicted_popularity),
    type: 'bar', // Bar chart type
  };

  return (
    <div className="App">
      <h1>Amazon Trending Products</h1>

      {/* Filter Section */}
      <div>
        <label>Filter by Category: </label>
        <select onChange={handleCategoryChange} value={categoryFilter}>
          <option value="all">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Home Appliances">Home Appliances</option>
          <option value="Fitness">Fitness</option>
        </select>
      </div>

      {/* Display insights */}
      <div>
        <h2>Trending Insights</h2>
        {loading ? (
          <p>Loading insights...</p>  // Display loading message
        ) : error ? (
          <p>Error loading insights: {error.message}</p>  // Display error message
        ) : (
          insights.map((insight) => (
            <div key={insight.title}>
              <h3>{insight.title}</h3>
              <p>Predicted Popularity: {insight.predicted_popularity}</p>
            </div>
          ))
        )}
      </div>

      {/* Plotly Bar Chart */}
      <Plot
        data={[chartData]}
        layout={{
          title: 'Predicted Popularity of Trending Products',
          xaxis: { title: 'Product' },
          yaxis: { title: 'Predicted Popularity' },
        }}
      />
    </div>
  );
}

export default App;
