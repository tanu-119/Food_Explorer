import React from "react";

const FilterSort = ({
  categories,
  selectedCategory,
  sortBy,
  sortOrder,
  onCategoryChange,
  onSortChange,
}) => {
  return (
    <div className="filter-sort">
      <div className="filter">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="sort">
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value, sortOrder)}
        >
          <option value="name">Product Name</option>
          <option value="nutrition">Nutrition Grade</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => onSortChange(sortBy, e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSort;
