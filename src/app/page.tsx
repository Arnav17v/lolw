'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import ProductGrid from '@/components/ProductGrid'
import Cart from '@/components/Cart'
import { Product } from '@/types/product'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // Enhanced product catalog with more items
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'Wireless Noise-Canceling Headphones',
            price: 299.99,
            description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
            image: '/images/headphones.jpg',
            category: 'Electronics'
          },
          {
            id: 2,
            name: 'Smart Fitness Watch Pro',
            price: 399.99,
            description: 'Advanced fitness tracking with heart rate monitoring and GPS',
            image: '/images/smartwatch.jpg',
            category: 'Electronics'
          },
          {
            id: 3,
            name: 'Professional Running Shoes',
            price: 129.99,
            description: 'Lightweight performance running shoes with superior cushioning',
            image: '/images/shoes.jpg',
            category: 'Sports'
          },
          {
            id: 4,
            name: '4K Ultra HD Smart TV',
            price: 899.99,
            description: '65-inch 4K Smart TV with HDR and built-in streaming apps',
            image: '/images/tv.jpg',
            category: 'Electronics'
          },
          {
            id: 5,
            name: 'Gaming Laptop RTX 4070',
            price: 1499.99,
            description: 'High-performance gaming laptop with RTX 4070 graphics',
            image: '/images/laptop.jpg',
            category: 'Electronics'
          },
          {
            id: 6,
            name: 'Wireless Bluetooth Speaker',
            price: 89.99,
            description: 'Portable waterproof speaker with 360-degree sound',
            image: '/images/speaker.jpg',
            category: 'Electronics'
          },
          {
            id: 7,
            name: 'Yoga Mat Premium',
            price: 49.99,
            description: 'Non-slip yoga mat with alignment lines and carrying strap',
            image: '/images/yoga-mat.jpg',
            category: 'Sports'
          },
          {
            id: 8,
            name: 'Coffee Maker Pro',
            price: 199.99,
            description: 'Programmable coffee maker with built-in grinder',
            image: '/images/coffee-maker.jpg',
            category: 'Home'
          },
          {
            id: 9,
            name: 'Wireless Earbuds',
            price: 159.99,
            description: 'True wireless earbuds with active noise cancellation',
            image: '/images/earbuds.jpg',
            category: 'Electronics'
          },
          {
            id: 10,
            name: 'Smart Home Hub',
            price: 129.99,
            description: 'Central hub for controlling all your smart home devices',
            image: '/images/smart-hub.jpg',
            category: 'Home'
          },
          {
            id: 11,
            name: 'Dumbbell Set 20kg',
            price: 79.99,
            description: 'Adjustable dumbbell set for home workouts',
            image: '/images/dumbbells.jpg',
            category: 'Sports'
          },
          {
            id: 12,
            name: 'Blender Professional',
            price: 149.99,
            description: 'High-speed blender for smoothies and food processing',
            image: '/images/blender.jpg',
            category: 'Home'
          }
        ]
        
        setProducts(mockProducts)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product])
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-2xl p-8 text-center animate-fade-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Loading amazing products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header cartCount={cart.length} />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 gradient-text animate-float drop-shadow-lg">
            Welcome to TechStore
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover the latest in technology, sports, and home essentials. 
            Premium quality products with cutting-edge design.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="glass rounded-full p-2 animate-glow">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
            </div>
            <div className="glass rounded-full p-2 animate-glow" style={{animationDelay: '0.5s'}}>
              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
            </div>
            <div className="glass rounded-full p-2 animate-glow" style={{animationDelay: '1s'}}>
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-semibold text-white gradient-text">
                Featured Products
              </h2>
              <div className="text-sm text-gray-400">
                {products.length} products available
              </div>
            </div>
            <ProductGrid products={products} onAddToCart={addToCart} />
          </div>
          <div className="lg:col-span-1">
            <Cart cart={cart} onRemoveFromCart={removeFromCart} />
          </div>
        </div>
      </main>
    </div>
  )
} 