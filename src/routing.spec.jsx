import React from 'react'
import { render, screen } from '@testing-library/react'
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

describe('Routing', () => {
  it('debe renderizar Home en ruta raíz', () => {
    renderWithProviders(['/'])
    const element = screen.getByText('La tienda definitiva para gamers')
    expect(document.body.contains(element)).toBe(true)
  })

  it('debe renderizar Login en /login', () => {
    renderWithProviders(['/login'])
    const element = screen.getByText('Login')
    expect(document.body.contains(element)).toBe(true)
  })

  it('debe renderizar Registro en /registro', () => {
    renderWithProviders(['/registro'])
    const element = screen.getByRole('heading', { name: 'Registro' })
    expect(document.body.contains(element)).toBe(true)
  })

  it('debe renderizar 404 para rutas inexistentes', () => {
    renderWithProviders(['/ruta-inexistente'])
    const element = screen.getByRole('heading', { name: /página no encontrada/i })
    expect(document.body.contains(element)).toBe(true)
  })
})
