import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { AuthProvider, useAuth } from './context/AuthContext'

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
  const renderWithProvider = (component) => {
    return render(
      <AuthProvider>
        {component}
      </AuthProvider>
    )
  }

  it('debe inicializar sin usuario', () => {
    renderWithProvider(<TestComponent />)
    expect(screen.getByTestId('user')).toHaveTextContent('No user')
  })

  it('debe permitir login', async () => {
    renderWithProvider(<TestComponent />)
    fireEvent.click(screen.getByText('Login'))
    // Nota: En un test real necesitarías mockear localStorage
    expect(screen.getByTestId('user')).toHaveTextContent('test@test.com')
  })

  it('debe permitir logout', () => {
    renderWithProvider(<TestComponent />)
    fireEvent.click(screen.getByText('Login'))
    fireEvent.click(screen.getByText('Logout'))
    expect(screen.getByTestId('user')).toHaveTextContent('No user')
  })
})
