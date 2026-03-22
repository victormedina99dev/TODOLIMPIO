import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { brand } from '../constants'
import Button from './ui/Button'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, handleGoogleLogin, handleLogout, loading } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/solicitar-servicio', label: 'Solicitar' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? 'py-4 bg-white dark:bg-surface-950 border-b border-surface-200 dark:border-white/10 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
              <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
            </div>
            <span className="text-2xl font-display font-extrabold tracking-tight text-surface-900 dark:text-white transition-colors">
              {brand.name}
            </span>
          </Link>

          {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2 px-1.5 py-1.5 rounded-2xl backdrop-blur-sm border border-black/5 dark:border-white/5 bg-surface-100/20 dark:bg-surface-900/40">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-white dark:bg-surface-800 text-primary-500 shadow-soft dark:shadow-black/20'
                    : isScrolled 
                      ? 'text-surface-600 dark:text-surface-400 hover:text-primary-500'
                      : 'text-surface-900 dark:text-white hover:text-primary-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-surface-200 dark:border-surface-800">
                <img
                  src={user.photoURL || 'https://i.pravatar.cc/100'}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-xl border-2 border-primary-500/20"
                />
                <Button variant="ghost" onClick={handleLogout} className="text-sm font-bold">
                  Salir
                </Button>
              </div>
            ) : (
              <Button onClick={handleGoogleLogin} disabled={loading} icon="bi-google" className="h-11 font-bold">
                Entrar
              </Button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-surface-100 dark:bg-surface-900 text-surface-900 dark:text-white transition-all active:scale-95"
          >
            <i className={`bi ${isMobileMenuOpen ? 'bi-x-lg' : 'bi-distribute-vertical'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 md:hidden transition-all duration-500 z-40 ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        } ${
          isScrolled || isMobileMenuOpen ? 'top-20' : 'top-24'
        } bg-white dark:bg-surface-950`}
      >
        <nav className="container mx-auto px-6 py-10 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-display font-bold p-4 rounded-2xl transition-all ${
                isActive(link.path)
                  ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20'
                  : 'text-surface-900 dark:text-white hover:bg-surface-100 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between">
                {link.label}
                <i className="bi bi-chevron-right text-lg opacity-50"></i>
              </div>
            </Link>
          ))}
          
          <div className="mt-6 pt-10 border-t border-white/5">
            {user ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <img
                    src={user.photoURL || 'https://i.pravatar.cc/100'}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-xl border-2 border-primary-500/20"
                  />
                  <div className="overflow-hidden">
                    <p className="font-bold text-surface-900 dark:text-white truncate">{user.displayName}</p>
                    <p className="text-xs text-surface-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} 
                  className="w-full py-6 text-lg font-bold"
                  icon="bi-box-arrow-right"
                >
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => { handleGoogleLogin(); setIsMobileMenuOpen(false); }} 
                disabled={loading} 
                icon="bi-google" 
                className="w-full py-6 text-lg font-bold"
              >
                Entrar con Google
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
