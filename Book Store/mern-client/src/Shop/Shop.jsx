import React from 'react';

const products = [
  // Books
  {
    id: 1,
    name: 'The Creative Act: A Way of Being',
    price: 19.99,
    originalPrice: 24.99,
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1675618392i/101265124.jpg',
    category: 'books',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Atomic Habits',
    price: 14.99,
    image: 'https://images-na.ssl-images-amazon.com/images/I/81bGKUa1e0L._AC_UL600_SR600,400_.jpg',
    category: 'books',
    rating: 4.8
  },
  
  // Electronics
  {
    id: 3,
    name: 'Wireless Earbuds',
    price: 59.99,
    originalPrice: 79.99,
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327891675i/337116._SX600_.jpg',
    category: 'electronics',
    rating: 4.3
  },
  {
    id: 4,
    name: 'Smart Watch',
    price: 129.99,
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1275694232i/6050678._SX600_.jpg',
    category: 'electronics',
    rating: 4.6
  },
  
  // Fashion
  {
    id: 5,
    name: 'Running Shoes',
    price: 89.99,
    originalPrice: 120.99,
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1344256189i/11487807._SX600_.jpg',
    category: 'fashion',
    rating: 4.7
  },
  {
    id: 6,
    name: 'Denim Jacket',
    price: 45.99,
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1349316024i/769658._SX600_.jpg',
    category: 'fashion',
    rating: 4.4
  },
  
  // Home
  {
    id: 7,
    name: 'Coffee Maker',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1679757980i/123176505._SX600_.jpg',
    category: 'home',
    rating: 4.2
  },
  {
    id: 8,
    name: 'Air Fryer',
    price: 79.99,
    image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388240687i/17863._SX600_.jpg',
    category: 'home',
    rating: 4.5
  }
];

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
      {/* Image container with category-specific sizing */}
      <div className={`relative ${product.category === 'books' ? 'h-64' : 'h-48'} bg-gray-50 flex items-center justify-center p-2`}>
        <img 
          src={product.image} 
          alt={product.name}
          className={`${product.category === 'books' ? 'object-contain' : 'object-cover'} max-h-full max-w-full`}
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x${product.category === 'books' ? '450' : '300'}?text=Product+Image`;
            e.target.className = 'h-full w-full object-cover';
          }}
        />
        {product.originalPrice && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Sale
          </span>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center mb-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        
        <h3 className="text-md font-semibold text-gray-800 line-clamp-2 mb-2" style={{ minHeight: '2.5rem' }}>
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm line-through text-gray-500">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200 text-sm">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductGridPage = () => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Books Are Here</h1>
        <p className="text-gray-600 mb-8">Discover amazing products at great prices</p>
        
       
        
        
        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGridPage;