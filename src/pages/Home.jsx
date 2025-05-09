import React, { useEffect, useState } from 'react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { fetchProducts, fetchCategories } from '../services/api';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import FilterSort from '../components/FilterSort';
import LoadingSpinner from '../components/LoadingSpinner';
import '../index.css';

const Home = () => {
  const { products, loading, error, page, hasMore, searchQuery, barcodeQuery, category, sortBy, sortOrder } = useAppState();
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const newProducts = await fetchProducts(page, searchQuery, barcodeQuery, category);

        if (page === 1) {
          dispatch({ type: 'SET_PRODUCTS', payload: newProducts });
        } else {
          dispatch({ type: 'APPEND_PRODUCTS', payload: newProducts });
        }

        dispatch({ type: 'SET_HAS_MORE', payload: newProducts.length > 0 });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    const timer = setTimeout(() => {
      loadProducts();
    }, searchQuery ? 500 : 0);

    return () => clearTimeout(timer);
  }, [page, searchQuery, barcodeQuery, category, dispatch]);

  const handleSearch = (query) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const handleBarcodeSearch = (barcode) => {
    dispatch({ type: 'SET_BARCODE_QUERY', payload: barcode });
  };

  const handleCategoryChange = (cat) => {
    dispatch({ type: 'SET_CATEGORY', payload: cat });
  };

  const handleSortChange = (sortBy, sortOrder) => {
    dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } });
  };

  const loadMore = () => {
    dispatch({ type: 'SET_PAGE', payload: page + 1 });
  };

  const sortedProducts = React.useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? (a.product_name || '').localeCompare(b.product_name || '')
          : (b.product_name || '').localeCompare(a.product_name || '');
      } else if (sortBy === 'nutrition') {
        return sortOrder === 'asc'
          ? (a.nutrition_grades || '').localeCompare(b.nutrition_grades || '')
          : (b.nutrition_grades || '').localeCompare(a.nutrition_grades || '');
      }
      return 0;
    });
  }, [products, sortBy, sortOrder]);

  return (
    <div className="home">
      <h1>Food Product Explorer</h1>

      <SearchBar
        onSearch={handleSearch}
        onBarcodeSearch={handleBarcodeSearch}
      />

      <FilterSort
        categories={categories}
        selectedCategory={category}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
      />

      {error && <div className="error">{error}</div>}

      <ProductList products={sortedProducts} />

      {loading && <LoadingSpinner />}

      {!loading && hasMore && (
        <button className="load-more" onClick={loadMore}>
          Load More
        </button>
      )}

      {!loading && !hasMore && products.length > 0 && (
        <div className="no-more">No more products to load</div>
      )}

      {!loading && products.length === 0 && !error && (
        <div className="no-results">No products found</div>
      )}
    </div>
  );
};

export default Home;