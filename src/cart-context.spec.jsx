import React from 'react'
import { render, screen } from '@testing-library/react'
import { CartProvider, useCart } from './context/CartContext'

// Componente de prueba para usar el contexto
const TestComponent = () => {
  const { items, add, totalItems } = useCart()
  
  return (
    <div>
      <div data-testid="item-count">{totalItems}</div>
      <button onClick={() => add({ id: 1, nombre: 'Test', precio: 100 })}>
        Add to Cart
      </button>
    </div>
  )
}

describe('CartContext', () => {
  it('debe inicializar con carrito vacío', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    const itemCount = screen.getByTestId('item-count')
    expect(document.body.contains(itemCount)).toBe(true)
    expect(itemCount.textContent).toBe('0')
  })
})
