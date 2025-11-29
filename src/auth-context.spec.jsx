import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { authService } from './services/auth.service'

// Mock authService
jasmine.createSpyObj('authService', ['login', 'logout', 'register', 'getCurrentUser'])

// Componente de prueba para usar el contexto
const TestComponent = () => {
  const { user, login, logout, register } = useAuth()

  return (
    <div>
      <div data-testid="user">{user ? user.email : 'No user'}</div>
      <button onClick={() => login('test@test.com', 'password')}>Login</button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => register({ email: 'new@test.com', password: 'password' })}>Register</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    spyOn(authService, 'getCurrentUser').and.returnValue(null)
    spyOn(authService, 'login').and.returnValue(Promise.resolve({ user: { email: 'test@test.com' } }))
    spyOn(authService, 'logout')
    spyOn(authService, 'register').and.returnValue(Promise.resolve({ user: { email: 'new@test.com' } }))
  })

  const renderWithProvider = (component) => {
    return render(
      <AuthProvider>
        {component}
      </AuthProvider>
    )
  }

  it('debe inicializar sin usuario', async () => {
    renderWithProvider(<TestComponent />)
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('No user'))
  })

  it('debe permitir login', async () => {
    renderWithProvider(<TestComponent />)
    fireEvent.click(screen.getByText('Login'))
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('test@test.com'))
  })

  it('debe permitir logout', async () => {
    renderWithProvider(<TestComponent />)
    fireEvent.click(screen.getByText('Login'))
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('test@test.com'))
    fireEvent.click(screen.getByText('Logout'))
    await waitFor(() => expect(screen.getByTestId('user')).toHaveTextContent('No user'))
  })
})
