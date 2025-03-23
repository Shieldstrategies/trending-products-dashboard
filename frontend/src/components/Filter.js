import React from 'react';

function Filter({ categories = [], onCategoryChange }) {
  return (
    <div>
      <select onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
