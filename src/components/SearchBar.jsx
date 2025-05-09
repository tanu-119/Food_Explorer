import React, { useState } from "react";

const SearchBar = ({ onSearch, onBarcodeSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [barcodeTerm, setBarcodeTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleBarcodeSubmit = (e) => {
    e.preventDefault();
    onBarcodeSearch(barcodeTerm);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <form onSubmit={handleBarcodeSubmit}>
        <input
          type="text"
          placeholder="Search by barcode..."
          value={barcodeTerm}
          onChange={(e) => setBarcodeTerm(e.target.value)}
        />
        <button type="submit">Barcode Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
