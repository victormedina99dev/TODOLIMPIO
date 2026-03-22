import { describe, it, expect } from 'vitest'

describe('Firebase Config Validation', () => {
  it('debería tener una API Key válida (no el marcador de posición)', () => {
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY
    expect(apiKey).toBeDefined()
    expect(apiKey).not.toBe('tu_api_key_aqui')
    expect(apiKey).not.toBe('YOUR_API_KEY')
    expect(apiKey?.length).toBeGreaterThan(10)
  })

  it('debería tener un Project ID válido', () => {
    const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
    expect(projectId).toBeDefined()
    expect(projectId).not.toBe('tu_project_id')
    expect(projectId).not.toBe('YOUR_PROJECT_ID')
  })

  it('debería tener un Auth Domain válido', () => {
    const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
    expect(authDomain).toBeDefined()
    expect(authDomain).not.toContain('YOUR_PROJECT')
    expect(authDomain).not.toContain('tu_proyecto')
  })
})
