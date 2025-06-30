'use client'

import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="product-card animate-slide-up group shadow-glass">
      {/* Product Image */}
      <div className="relative mb-6 overflow-hidden rounded-xl">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary-900/20 to-secondary-900/20">
          <div className="h-48 bg-gradient-to-br from-primary-900/30 to-secondary-900/30 flex items-center justify-center relative">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-4 left-4 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-secondary-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-primary-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            {/* Product placeholder */}
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-400 font-medium">{product.category}</span>
            </div>
          </div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="glass rounded-full px-3 py-1 text-xs font-medium text-primary-300 border border-primary-500/30">
            {product.category}
          </span>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      </div>
      
      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors duration-300 gradient-text">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-400 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold gradient-text">
              ${product.price}
            </span>
            {product.price > 200 && (
              <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full">
                Premium
              </span>
            )}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full btn-primary group-hover:shadow-glow transition-all duration-300"
        >
          <span className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span>Add to Cart</span>
          </span>
        </button>
      </div>
    </div>
  )
} 