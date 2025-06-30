import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '../ProductCard'
import { Product } from '@/types/product'

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: 99.99,
  description: 'Test description',
  image: '/test-image.jpg',
  category: 'Electronics'
}

const mockOnAddToCart = jest.fn()

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
  })

  it('calls onAddToCart when Add to Cart button is clicked', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    
    const addToCartButton = screen.getByText('Add to Cart')
    fireEvent.click(addToCartButton)
    
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct)
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1)
  })

  it('displays product image placeholder', () => {
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />)
    
    expect(screen.getByText('Product Image')).toBeInTheDocument()
  })
}) 