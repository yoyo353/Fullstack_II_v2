import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

describe('Navbar', () => {
  it('debe renderizar elementos básicos', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <CartProvider>
            <Navbar />
          </CartProvider>
        </AuthProvider>
      </MemoryRouter>
    )
    
    const logo = screen.getByText('GamerZone')
    const inicio = screen.getByText('Inicio')
    const productos = screen.getByText('Productos')
    
    expect(document.body.contains(logo)).toBe(true)
    expect(document.body.contains(inicio)).toBe(true)
    expect(document.body.contains(productos)).toBe(true)
  })
})
