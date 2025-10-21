import React from 'react'
import { createRoot } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

describe('App smoke', () => {
  it('renderiza Home', (done) => {
    const el = document.createElement('div'); document.body.appendChild(el)
    const root = createRoot(el)
    root.render(
      <MemoryRouter initialEntries={['/']}>
        <AuthProvider><CartProvider><App /></CartProvider></AuthProvider>
      </MemoryRouter>
    )
    setTimeout(()=>{
      expect(el.textContent.includes('GamerZone')).toBeTrue()
      done()
    },0)
  })
})
