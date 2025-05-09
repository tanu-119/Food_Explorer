import React, { memo } from 'react';
import ProductCard from './ProductCard';

const ProductList = memo(({ products }) => {
    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard key={product._id || product.code} product={product} />
            ))}
        </div>
    );
});

export default ProductList;