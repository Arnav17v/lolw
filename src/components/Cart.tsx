'use client'

import { Product } from '@/types/product'

interface CartProps {
  cart: Product[]
  onRemoveFromCart: (productId: number) => void
}

export default function Cart({ cart, onRemoveFromCart }: CartProps) {
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="card sticky top-24 animate-fade-in shadow-glass">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white gradient-text">Shopping Cart</h2>
        <div className="glass rounded-full px-3 py-1 text-sm text-primary-300 border border-primary-500/30">
          {cart.length} items
        </div>
      </div>
      
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="glass rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </div>
          <p className="text-gray-400 mb-2">Your cart is empty</p>
          <p className="text-sm text-gray-500">Add some products to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="glass rounded-xl p-4 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-white text-sm mb-1">{item.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-400 font-semibold">${item.price}</span>
                    <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="glass rounded-lg p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          
          <div className="border-t border-white/10 pt-6 space-y-4">
            {/* Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax</span>
                <span className="text-white">${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-white">Total</span>
                <span className="text-2xl font-bold gradient-text">
                  ${(total * 1.08).toFixed(2)}
                </span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button className="w-full btn-primary group">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <span>Proceed to Checkout</span>
              </span>
            </button>
            
            {/* Continue Shopping */}
            <button className="w-full btn-secondary">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 