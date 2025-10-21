import { required, email } from './utils/validators'

describe('Validators', () => {
  describe('required', () => {
    it('debe retornar mensaje para valor vacío', () => {
      expect(required('')).toBe('Campo requerido')
    })
    
    it('debe retornar vacío para valor válido', () => {
      expect(required('test')).toBe('')
    })
  })

  describe('email', () => {
    it('debe validar emails correctos', () => {
      expect(email('test@test.com')).toBe('')
    })
    
    it('debe rechazar emails incorrectos', () => {
      expect(email('invalid')).toBe('Email inválido')
    })
  })
})
