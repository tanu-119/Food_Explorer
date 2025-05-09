import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.product_name || "Unknown Product"}</h1>

      <div className="product-header">
        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="product-image"
          />
        )}

        <div className="product-meta">
          {product.nutrition_grades && (
            <div className="nutrition-grade">
              Nutrition Grade: {product.nutrition_grades.toUpperCase()}
            </div>
          )}

          {product.brands && (
            <div className="brand">Brand: {product.brands}</div>
          )}

          {product.categories && (
            <div className="categories">Categories: {product.categories}</div>
          )}
        </div>
      </div>

      <div className="product-sections">
        <div className="section ingredients">
          <h2>Ingredients</h2>
          {product.ingredients_text ? (
            <p>{product.ingredients_text}</p>
          ) : (
            <p>No ingredients information available</p>
          )}
        </div>

        <div className="section nutrition">
          <h2>Nutrition Facts</h2>
          {product.nutriments ? (
            <table>
              <tbody>
                <tr>
                  <th>Energy (per 100g)</th>
                  <td>{product.nutriments["energy-kcal_100g"]} kcal</td>
                </tr>
                <tr>
                  <th>Fat</th>
                  <td>{product.nutriments.fat_100g}g</td>
                </tr>
                <tr>
                  <th>Saturated Fat</th>
                  <td>{product.nutriments["saturated-fat_100g"]}g</td>
                </tr>
                <tr>
                  <th>Carbohydrates</th>
                  <td>{product.nutriments.carbohydrates_100g}g</td>
                </tr>
                <tr>
                  <th>Sugars</th>
                  <td>{product.nutriments.sugars_100g}g</td>
                </tr>
                <tr>
                  <th>Proteins</th>
                  <td>{product.nutriments.proteins_100g}g</td>
                </tr>
                <tr>
                  <th>Salt</th>
                  <td>{product.nutriments.salt_100g}g</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No nutrition information available</p>
          )}
        </div>

        <div className="section labels">
          <h2>Labels</h2>
          {product.labels_tags && product.labels_tags.length > 0 ? (
            <ul>
              {product.labels_tags.map((label, index) => (
                <li key={index}>
                  {label.replace("en:", "").replace(/-/g, " ")}
                </li>
              ))}
            </ul>
          ) : (
            <p>No label information available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
