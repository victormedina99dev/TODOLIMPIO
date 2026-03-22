import { createContext, useContext, useState, useEffect } from 'react'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Validación de configuración
const missingVars = Object.entries(firebaseConfig)
  .filter(([_, value]) => !value || value.includes('YOUR_') || value.includes('tu_api_key'))
  .map(([key]) => key);

if (missingVars.length > 0) {
  const errorMsg = `⚠️ Firebase Error: Faltan las siguientes variables de entorno: ${missingVars.join(', ')}. 
                    Asegúrate de configurarlas en tu archivo .env (local) o en el panel de Netlify (producción).`;
  console.error(errorMsg);
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    } catch (error) {
      let errorMessage = 'Error al iniciar sesión con Google';
      
      switch (error.code) {
        case 'auth/unauthorized-domain':
          errorMessage = 'Este dominio no está autorizado en la consola de Firebase.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'El usuario cerró la ventana de autenticación.';
          break;
        case 'auth/configuration-not-found':
          errorMessage = 'Falta la configuración de autenticación de Google en Firebase.';
          break;
        default:
          errorMessage = error.message;
      }

      console.error('Detalle del error:', error.code, error.message);
      alert(errorMessage); // Feedback inmediato al usuario
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    handleGoogleLogin,
    handleLogout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
