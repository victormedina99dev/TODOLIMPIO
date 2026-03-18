import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

// Mock Firebase
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  GoogleAuthProvider: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn((auth, callback) => {
    callback(null)
    return vi.fn()
  })
}))

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({}))
}))

// Mock window.location
delete window.location
window.location = { href: '', assign: vi.fn() }
