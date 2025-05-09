import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getNutritionColor = (grade) => {
    if (!grade) return '#ccc';
    switch (grade.toLowerCase()) {
      case 'a': return '#4CAF50';
      case 'b': return '#8BC34A';
      case 'c': return '#FFC107';
      case 'd': return '#FF9800';
      case 'e': return '#F44336';
      default: return '#ccc';
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id || product.code}`}>
        <div className="product-image-container">
          {product.image_url && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="image-placeholder"></div>
              )}
              <img
                src={product.image_url}
                alt={product.product_name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
            </>
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        <div className="product-info">
          <h3>{product.product_name || 'Unknown Product'}</h3>

          {product.brands && (
            <p className="brand">{product.brands.split(',')[0]}</p>
          )}

          {product.ingredients_text && (
            <p className="ingredients-preview">
              {product.ingredients_text.length > 50
                ? `${product.ingredients_text.substring(0, 50)}...`
                : product.ingredients_text}
            </p>
          )}

          {product.nutrition_grades && (
            <div
              className="nutrition-grade"
              style={{ backgroundColor: getNutritionColor(product.nutrition_grades) }}
            >
              {product.nutrition_grades.toUpperCase()}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;