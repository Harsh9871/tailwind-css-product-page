import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ProductCard({ product }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    setIsAdded(true);
    // Here you would typically add to cart logic
  };

  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="group relative cursor-pointer">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
          />
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
              <p className="text-gray-900 font-medium">Out of Stock</p>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="mt-4">
          <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-yellow-400 text-xs">★★★★★</span>
            <span className="ml-1 text-xs text-gray-500">{product.rating}</span>
          </div>
          <div className="flex items-center mt-1">
            <p className="text-sm font-medium text-gray-900">₹{product.currentPrice}</p>
            <p className="ml-2 text-xs text-gray-500 line-through">₹{product.actualPrice}</p>
            <p className="ml-2 text-xs text-green-600">{product.discountPercentage}% OFF</p>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="mt-2">
          {isAdded ? (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="w-full py-2 bg-white text-green-600 border border-green-600 text-sm font-medium rounded-full hover:bg-green-50 transition-colors"
            >
              VIEW PRODUCT
            </button>
          ) : (
            <button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-2 text-sm font-medium rounded-full transition-colors ${
                product.inStock 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.inStock ? 'ADD TO CART' : 'SOLD OUT'}
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}