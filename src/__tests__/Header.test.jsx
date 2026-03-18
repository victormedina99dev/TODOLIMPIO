import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Header from '../components/Header'
import { AuthProvider } from '../context/AuthContext'
import * as firebaseAuth from 'firebase/auth'

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  GoogleAuthProvider: vi.fn(() => ({})),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null)
    return vi.fn()
  })
}))

const renderWithRouter = (ui, { initialEntries = ['/'] } = {}) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('Header Component - Google Login Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería renderizar el botón de login cuando el usuario no está autenticado', () => {
    renderWithRouter(<Header />)
    
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeTruthy()
  })

  it('debería mostrar botón de login con icono de Google', () => {
    renderWithRouter(<Header />)

    const button = screen.getByRole('button', { name: /iniciar sesión/i })
    expect(button).toBeTruthy()
    // Verificar que contiene el SVG de Google
    expect(button.querySelector('svg')).toBeTruthy()
  })

  it('debería llamar a handleGoogleLogin cuando se hace click en el botón', async () => {
    const mockUser = {
      uid: '123',
      displayName: 'Test User',
      email: 'test@example.com'
    }

    firebaseAuth.signInWithPopup.mockResolvedValueOnce({ user: mockUser })

    renderWithRouter(<Header />)

    const loginButton = screen.getByRole('button', { name: /iniciar sesión/i })
    fireEvent.click(loginButton)

    await waitFor(() => {
      expect(firebaseAuth.signInWithPopup).toHaveBeenCalled()
    })
  })

  it('debería renderizar los enlaces de navegación', () => {
    renderWithRouter(<Header />)

    expect(screen.getByRole('link', { name: /inicio/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /servicios/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /solicitar/i })).toBeTruthy()
  })

  it('debería tener el logo de TodoLimpio', () => {
    renderWithRouter(<Header />)

    expect(screen.getByText('TodoLimpio')).toBeTruthy()
  })

  it('debería renderizar el menú móvil en pantallas pequeñas', () => {
    // Simular viewport móvil
    global.innerWidth = 375
    
    renderWithRouter(<Header />)

    const menuButton = screen.getByRole('button', { name: '' })
    expect(menuButton).toBeTruthy()
  })
})
