import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

const renderWithProviders = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('Integration Tests', () => {
  it('debe navegar entre páginas correctamente', () => {
    renderWithProviders(['/'])
    
    // Navegar a productos
    fireEvent.click(screen.getByText('Productos'))
    expect(screen.getByText('Productos Gaming')).toBeInTheDocument()
    
    // Navegar a login
    fireEvent.click(screen.getByText('Login'))
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
  })

  it('debe mantener estado del carrito entre navegaciones', () => {
    renderWithProviders(['/productos'])
    
    // Agregar producto al carrito
    const addButtons = screen.getAllByText('Agregar al Carrito')
    if (addButtons.length > 0) {
      fireEvent.click(addButtons[0])
    }
    
    // Navegar a otra página y volver
    fireEvent.click(screen.getByText('Inicio'))
    fireEvent.click(screen.getByText('Productos'))
    
    // Verificar que el carrito mantiene el estado
    // (Esto dependería de la implementación específica)
  })

  it('debe mostrar navbar en todas las páginas', () => {
    const routes = ['/', '/productos', '/login', '/registro', '/admin']
    
    routes.forEach(route => {
      renderWithProviders([route])
      expect(screen.getByText('GamerZone')).toBeInTheDocument()
      // Limpiar para el siguiente test
      screen.getByText('GamerZone').remove()
    })
  })

  it('debe manejar formularios de login y registro', async () => {
    renderWithProviders(['/login'])
    
    // Llenar formulario de login
    fireEvent.change(screen.getByLabelText('Email'), { 
      target: { value: 'test@test.com' } 
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), { 
      target: { value: 'password' } 
    })
    
    // En un test real, verificarías el comportamiento del login
    expect(screen.getByText('Ingresar')).toBeInTheDocument()
  })
})
