import { useState } from 'react';

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  const calculateFinalPrice = () => {
    return (product.currentPrice + selectedVariant.priceDiff) * quantity;
  };

  const calculateOriginalPrice = () => {
    return (product.actualPrice + selectedVariant.priceDiff) * quantity;
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < selectedVariant.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="sticky top-20">
      {/* Product Title - Hidden on mobile */}
      <div className="md:hidden mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex items-center mt-1">
          <div className="flex items-center">
            <span className="text-yellow-400">★★★★★</span>
            <span className="ml-1 text-sm text-gray-600">({product.rating}) {product.reviewCount} reviews</span>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <p className="text-sm text-green-600 font-medium">{product.brand}</p>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>

        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <span className="text-yellow-400">★★★★★</span>
            <span className="ml-1 text-sm text-gray-600">({product.rating}) {product.reviewCount} reviews</span>
          </div>
        </div>
      </div>

      {/* Short Description */}
      <div className="mt-4">
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-center">
        <p className="text-2xl font-bold text-gray-900">₹{calculateFinalPrice()}</p>
        <p className="ml-3 text-lg text-gray-500 line-through">₹{calculateOriginalPrice()}</p>
        <p className="ml-3 text-green-600 font-medium">{product.discountPercentage}% OFF</p>
      </div>

      {/* Variants */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900">Size</h3>
        <div className="flex space-x-2 mt-2">
          {product.variants.map(variant => (
            <button
              key={variant.id}
              onClick={() => setSelectedVariant(variant)}
              disabled={!variant.inStock}
              className={`
                py-2 px-4 rounded-full border ${selectedVariant.id === variant.id
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : variant.inStock
                    ? 'border-gray-300 hover:border-gray-400'
                    : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {variant.size}
              {variant.priceDiff > 0 && ` (+₹${variant.priceDiff})`}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
        <div className="flex items-center mt-2">
          <button
            onClick={decrementQuantity}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
          >
            -
          </button>
          <span className="mx-4 w-8 text-center">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
          >
            +
          </button>
          <span className="ml-4 text-sm text-gray-500">
            {selectedVariant.stockCount} available
          </span>
        </div>
      </div>

      {/* Add to Cart & Buy Now */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button className="flex-1 py-3 px-6 bg-white border-2 border-green-600 text-green-600 font-medium rounded-full hover:bg-green-50 transition-colors">
          ADD TO CART
        </button>
        <button className="flex-1 py-3 px-6 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors">
          BUY NOW
        </button>
      </div>

      {/* Shipping Info */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          <p className="ml-2 text-sm text-gray-600">Free shipping on orders above ₹999</p>
        </div>
        <div className="flex items-center mt-2">
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          <p className="ml-2 text-sm text-gray-600">30-day hassle-free returns</p>
        </div>
      </div>

      {/* Features/Benefits */}
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-2">
          {product.benefits.slice(0, 6).map((benefit, index) => (
            <div key={index} className="flex items-center">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              <p className="ml-2 text-sm text-gray-600">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}