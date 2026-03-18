import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/todolimpio.venezuela',
      icon: 'bi-instagram',
      color: 'hover:text-pink-500'
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/message/U7VEZNXGTCZ3H1',
      icon: 'bi-whatsapp',
      color: 'hover:text-green-500'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/todolimpio.vnzla',
      icon: 'bi-facebook',
      color: 'hover:text-blue-600'
    }
  ]

  const quickLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/solicitar-servicio', label: 'Solicitar Servicio' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <i className="bi bi-droplet-fill text-white text-xl"></i>
              </div>
              <span className="text-2xl font-display font-bold text-white">
                TodoLimpio
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Tu aliado en el cuidado y mantenimiento de tus espacios. 
              Transformamos y mantenemos tus hogares y oficinas con servicios 
              de limpieza y jardinería de la más alta calidad.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center transition-all hover:bg-primary-500 ${social.color}`}
                  aria-label={social.name}
                >
                  <i className={`bi ${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="footer-link flex items-center gap-2"
                  >
                    <i className="bi bi-chevron-right text-xs text-primary-400"></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="bi bi-geo-alt text-primary-400 mt-1"></i>
                <span>Barquisimeto, Lara<br />Venezuela</span>
              </li>
              <li>
                <a
                  href="mailto:todolimpiovenezuela@gmail.com"
                  className="footer-link flex items-center gap-2"
                >
                  <i className="bi bi-envelope text-primary-400"></i>
                  todolimpiovenezuela@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+58XXXXXXXXXX"
                  className="footer-link flex items-center gap-2"
                >
                  <i className="bi bi-telephone text-primary-400"></i>
                  +58 (XXX) XXX-XXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} TodoLimpio. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="footer-link">Términos de Servicio</a>
              <a href="#" className="footer-link">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
