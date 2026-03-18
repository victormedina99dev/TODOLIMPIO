import { Link } from 'react-router-dom'
import { brand } from '../constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/todolimpio.venezuela', icon: 'bi-instagram' },
    { name: 'WhatsApp', url: 'https://wa.me/message/U7VEZNXGTCZ3H1', icon: 'bi-whatsapp' },
    { name: 'Facebook', url: 'https://www.facebook.com/todolimpio.vnzla', icon: 'bi-facebook' }
  ]

  const quickLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/solicitar-servicio', label: 'Solicitar Servicio' },
  ]

  return (
    <footer className="bg-surface-950 text-surface-400 pt-24 pb-12 border-t border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-display font-extrabold tracking-tight text-white">
                {brand.name}
              </span>
            </Link>
            <p className="text-lg leading-relaxed mb-10 max-w-sm">
              {brand.description}. Elevando el estándar de limpieza y cuidado en cada espacio venezolano.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-surface-900 border border-white/5 flex items-center justify-center text-white transition-all hover:bg-primary-500 hover:scale-110 shadow-xl"
                  aria-label={social.name}
                >
                  <i className={`bi ${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">Navegación</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-primary-400 transition-colors font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-4">
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-widest">Contacto</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-900 border border-white/5 flex items-center justify-center text-primary-400">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <span className="font-medium text-white">Barquisimeto, Lara<br /><span className="text-surface-500">Venezuela</span></span>
              </div>
              <a href="mailto:todolimpiovenezuela@gmail.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-surface-900 border border-white/5 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <i className="bi bi-envelope"></i>
                </div>
                <span className="font-medium group-hover:text-white transition-colors">todolimpiovenezuela@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-8">
          <p className="text-sm font-medium tracking-wide">
            © {currentYear} {brand.name}. Todos los derechos reservados.
          </p>
          <div className="flex gap-10 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
