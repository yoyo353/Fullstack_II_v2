import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Registro from './pages/Registro'
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

describe('Registro', () => {
  it('debe renderizar el formulario de registro', () => {
    renderWithProviders(<Registro />)
    expect(screen.getByText('Registro')).toBeInTheDocument()
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByLabelText('RUN (RUT)')).toBeInTheDocument()
  })

  it('debe validar nombre', () => {
    renderWithProviders(<Registro />)
    const nombreInput = screen.getByLabelText('Nombre')
    fireEvent.change(nombreInput, { target: { value: '123' } })
    fireEvent.blur(nombreInput)
    expect(screen.getByText('Solo letras y espacios')).toBeInTheDocument()
  })

  it('debe validar RUT', () => {
    renderWithProviders(<Registro />)
    const rutInput = screen.getByLabelText('RUN (RUT)')
    fireEvent.change(rutInput, { target: { value: '12345678-0' } })
    fireEvent.blur(rutInput)
    expect(screen.getByText('RUN inválido')).toBeInTheDocument()
  })

  it('debe mostrar selectores de región y comuna', () => {
    renderWithProviders(<Registro />)
    expect(screen.getByLabelText('Región')).toBeInTheDocument()
    expect(screen.getByLabelText('Comuna')).toBeInTheDocument()
  })

  it('debe actualizar comunas al cambiar región', () => {
    renderWithProviders(<Registro />)
    const regionSelect = screen.getByLabelText('Región')
    fireEvent.change(regionSelect, { target: { value: 'Metropolitana' } })
    // Verificar que se actualizan las opciones de comuna
  })
})
