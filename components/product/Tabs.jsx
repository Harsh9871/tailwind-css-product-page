import { useState } from 'react';

export default function Tabs({ activeTab, setActiveTab, product }) {
    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'ingredients', label: 'Ingredients' },
        { id: 'how-to-use', label: 'How to Use' },
        { id: 'reviews', label: `Reviews (${product.reviewCount})` },
    ];

    // For review stars rendering
    const renderStars = (rating) => {
        return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
    };

    return (
        <div>
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto hide-scrollbar space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-1 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'border-green-500 text-green-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="py-6">
                {activeTab === 'description' && (
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: product.longDescription }} className="prose max-w-none" />
                    </div>
                )}

                {activeTab === 'ingredients' && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Ingredients</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {product.ingredients.map((ingredient, index) => (
                                <div key={index} className="flex items-center">
                                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                    <p className="ml-2">{ingredient}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Analysis</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(product.ingredientAnalysis).map(([key, value]) => (
                                    <div key={key} className="flex items-center">
                                        {value ? (
                                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        )}
                                        <p className="ml-2 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'how-to-use' && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">How to Use</h3>
                        <ol className="list-decimal pl-5 space-y-3">
                            {product.howToUse.map((step, index) => (
                                <li key={index} className="pl-1">{step}</li>
                            ))}
                        </ol>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div>
                        <div className="flex items-center mb-6">
                            <div className="mr-6">
                                <p className="text-5xl font-bold text-gray-900">{product.rating}</p>
                                <div className="flex mt-1">
                                    <span className="text-yellow-400 text-xl">{renderStars(product.rating)}</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</p>
                            </div>

                            <div className="flex-1">
                                {Object.entries(product.comments.ratingDistribution)
                                    .sort(([a], [b]) => Number(b) - Number(a))
                                    .map(([rating, count]) => (
                                        <div key={rating} className="flex items-center mb-1">
                                            <p className="w-10 text-sm text-gray-500">{rating} ★</p>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                                                <div
                                                    className="bg-yellow-400 h-2.5 rounded-full"
                                                    style={{ width: `${(count / product.reviewCount) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="w-10 text-xs text-gray-500">{((count / product.reviewCount) * 100).toFixed(0)}%</p>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {product.comments.data.map((review) => (
                                <div key={review.id} className="border-b border-gray-200 pb-6">
                                    <div className="flex items-center">
                                        <img
                                            src={review.user.avatar}
                                            alt={review.user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="ml-3">
                                            <p className="font-medium text-gray-900">
                                                {review.user.name}
                                                {review.user.verified && (
                                                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                                        Verified Purchase
                                                    </span>
                                                )}
                                            </p>
                                            <div className="flex items-center mt-1">
                                                <span className="text-yellow-400 text-sm">{renderStars(review.rating)}</span>
                                                <span className="ml-2 text-xs text-gray-500">
                                                    {new Date(review.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="mt-3 font-medium text-gray-900">{review.title}</h4>
                                    <p className="mt-1 text-gray-600">{review.text}</p>

                                    {review.images && review.images.length > 0 && (
                                        <div className="mt-3 flex space-x-2 overflow-x-auto">
                                            {review.images.map((image, i) => (
                                                <img
                                                    key={i}
                                                    src={image}
                                                    alt="Review image"
                                                    className="w-20 h-20 object-cover rounded-md"
                                                />
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-3 flex items-center">
                                        <button className="flex items-center text-gray-500 text-sm">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                                            </svg>
                                            Helpful ({review.likes})
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {product.comments.pagination.hasMore && (
                            <div className="mt-8 text-center">
                                <button className="py-2 px-6 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50">
                                    Load More Reviews
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

    );
}
// This component is a tabbed interface for displaying product information, including description, ingredients, how to use, and reviews.