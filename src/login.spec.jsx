import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'

const renderWithProviders = (component) => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('Login', () => {
  it('debe renderizar el formulario de login', () => {
    renderWithProviders(<Login />)
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
  })

  it('debe mostrar validación de email', () => {
    renderWithProviders(<Login />)
    const emailInput = screen.getByLabelText('Email')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)
    expect(screen.getByText('Email inválido')).toBeInTheDocument()
  })

  it('debe mostrar validación de contraseña', () => {
    renderWithProviders(<Login />)
    const passwordInput = screen.getByLabelText('Contraseña')
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.blur(passwordInput)
    expect(screen.getByText('Mínimo 4 caracteres')).toBeInTheDocument()
  })

  it('debe mostrar enlace a registro', () => {
    renderWithProviders(<Login />)
    expect(screen.getByText('Regístrate')).toBeInTheDocument()
  })

  it('debe deshabilitar botón cuando hay errores', () => {
    renderWithProviders(<Login />)
    const submitButton = screen.getByText('Ingresar')
    expect(submitButton).toBeDisabled()
  })
})
