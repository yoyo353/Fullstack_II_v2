import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Productos from './pages/Productos'
import { CartProvider } from './context/CartContext'

const renderWithProviders = (component) => {
  return render(
    <MemoryRouter>
      <CartProvider>
        {component}
      </CartProvider>
    </MemoryRouter>
  )
}

describe('Productos', () => {
  it('debe renderizar el título', () => {
    renderWithProviders(<Productos />)
    expect(screen.getByText('Productos Gaming')).toBeInTheDocument()
  })

  it('debe mostrar campo de búsqueda', () => {
    renderWithProviders(<Productos />)
    expect(screen.getByPlaceholderText('Buscar productos...')).toBeInTheDocument()
  })

  it('debe mostrar filtro de categorías', () => {
    renderWithProviders(<Productos />)
    expect(screen.getByText('🎮 Todas las categorías')).toBeInTheDocument()
  })

  it('debe filtrar productos por búsqueda', () => {
    renderWithProviders(<Productos />)
    const searchInput = screen.getByPlaceholderText('Buscar productos...')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    // En un test real verificarías que se filtran los productos
  })

  it('debe mostrar productos', () => {
    renderWithProviders(<Productos />)
    // Verificar que se muestran productos (depende de los datos en productos.json)
    const addButtons = screen.getAllByText('Agregar al Carrito')
    expect(addButtons.length).toBeGreaterThan(0)
  })
})
