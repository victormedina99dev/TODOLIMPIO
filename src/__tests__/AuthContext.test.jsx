import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { signInWithPopup, signOut } from 'firebase/auth'

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual('firebase/auth')
  return {
    ...actual,
    getAuth: vi.fn(() => ({})),
    GoogleAuthProvider: vi.fn(() => ({})),
    signInWithPopup: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChanged: vi.fn((auth, callback) => {
      callback(null)
      return vi.fn()
    })
  }
})

const TestComponent = () => {
  const { user, loading, handleGoogleLogin, handleLogout } = useAuth()
  
  return (
    <div>
      <span data-testid="loading">{loading ? 'true' : 'false'}</span>
      <span data-testid="user">{user ? user.displayName : 'null'}</span>
      <button data-testid="login-btn" onClick={handleGoogleLogin}>Login</button>
      <button data-testid="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  )
}

describe('AuthContext - Google Login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería renderizar el contexto de autenticación', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('loading')).toBeTruthy()
  })

  it('debería iniciar con usuario null', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('user').textContent).toBe('null')
  })

  it('debería llamar a signInWithPopup cuando se hace click en login', async () => {
    const mockUser = {
      uid: '123',
      displayName: 'Test User',
      email: 'test@example.com',
      photoURL: 'https://example.com/photo.jpg'
    }

    signInWithPopup.mockResolvedValueOnce({ user: mockUser })

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    )

    const loginBtn = screen.getByTestId('login-btn')
    fireEvent.click(loginBtn)

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalled()
    })
  })

  it('debería llamar a signOut cuando se hace click en logout', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    )

    const logoutBtn = screen.getByTestId('logout-btn')
    fireEvent.click(logoutBtn)

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled()
    })
  })
})
