import { Link } from 'react-router-dom'

const stats = [
  { value: '50+', label: 'Empresas Atendidas', icon: 'bi-building' },
  { value: '100+', label: 'Hogares Felices', icon: 'bi-house-heart' },
  { value: '1C', label: 'Jardines Restaurados', icon: 'bi-flower1' },
]

const services = [
  {
    title: 'Limpieza de Hogar',
    description: 'Servicio completo de limpieza para tu hogar, incluyendo dusting, aspirado, trapeado y más.',
    icon: 'bi-house',
    image: '/images/limpieza-hogar.png',
    features: ['Limpieza profunda', 'Servicio especializado', 'Productos ecológicos']
  },
  {
    title: 'Limpieza de Oficina',
    description: 'Mantenimiento profesional para espacios de trabajo, salas de reuniones y áreas comunes.',
    icon: 'bi-briefcase',
    image: '/images/limpieza-oficina.png',
    features: ['Horario flexible', 'Personal capacitado', 'Contratos mensuales']
  },
  {
    title: 'Servicios de Jardinería',
    description: 'Diseño, mantenimiento y restauración de jardines, áreas verdes y exteriores.',
    icon: 'bi-flower2',
    image: '/images/jardineria.png',
    features: ['Diseño paisajístico', 'Mantenimiento', 'Riego automático']
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-primary-50/30 to-gray-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-600 text-sm font-medium mb-6">
                <i className="bi bi-stars"></i>
                Servicio Profesional de Limpieza
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight mb-6">
                Tu espacio,{' '}
                <span className="text-gradient">más limpio</span>{' '}
                que nunca
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Transformamos y mantenemos tus espacios con servicios de limpieza 
                y jardinería de la más alta calidad. Confía en los expertos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/solicitar-servicio" className="btn-primary">
                  <i className="bi bi-calendar-check mr-2"></i>
                  Solicitar Servicio
                </Link>
                <Link to="/servicios" className="btn-outline">
                  Ver Servicios
                  <i className="bi bi-arrow-right ml-2"></i>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-100 flex items-center justify-center">
                      <i className={`bi ${stat.icon} text-primary-500 text-xl`}></i>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-secondary-400 rounded-3xl transform rotate-3"></div>
                <img
                  src="/images/hero-cleaning.jpg"
                  alt="Servicio de limpieza profesional"
                  className="relative rounded-3xl shadow-2xl w-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1581578731548-c64695b69535?w=800&q=80'
                  }}
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-pulse-soft">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <i className="bi bi-check-circle-fill text-green-500 text-xl"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Servicio Completado</div>
                      <div className="text-sm text-gray-500">100% Satisfacción</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-500 font-medium">NUESTROS SERVICIOS</span>
            <h2 className="section-title mt-2">¿Qué podemos hacer por ti?</h2>
            <p className="section-subtitle mx-auto">
              Ofrecemos una amplia gama de servicios de limpieza y mantenimiento 
              para satisfacer todas tus necesidades.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card p-6 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className={`bi ${service.icon} text-white text-2xl`}></i>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                      <i className="bi bi-check2 text-primary-500"></i>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/servicios"
                  className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors"
                >
                  Ver más
                  <i className="bi bi-arrow-right ml-2"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&q=80"
                  alt="Limpieza profesional"
                  className="rounded-2xl shadow-lg mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                  alt="Jardinería"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <div>
              <span className="text-primary-500 font-medium">SOBRE NOSOTROS</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2 mb-6">
                Cuidamos tus espacios como si fueran nuestros
              </h2>
              <p className="text-gray-600 mb-6">
                <strong className="text-gray-900">TodoLimpio</strong> es mucho más que una empresa de limpieza; 
                somos tus aliados en el cuidado y mantenimiento de tus espacios. Con años de experiencia 
                en el mercado venezolano, nos dedicamos a transformar y mantener tus espacios.
              </p>
              <p className="text-gray-600 mb-8">
                Entendemos que un ambiente limpio y un jardín bien cuidado no solo mejoran la estética, 
                sino que también contribuyen al bienestar y la productividad.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <i className="bi bi-shield-check text-primary-500"></i>
                  </div>
                  <span className="font-medium">Personal Capacitado</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card">
                  <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                    <i className="bi bi-patch-check text-secondary-500"></i>
                  </div>
                  <span className="font-medium">Calidad Garantizada</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <i className="bi bi-clock-history text-green-500"></i>
                  </div>
                  <span className="font-medium">Puntualidad</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-card">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <i className="bi bi-heart text-purple-500"></i>
                  </div>
                  <span className="font-medium">Atención Personalizada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            ¿Listo para un espacio más limpio?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Solicita nuestro servicio ahora y descubre la diferencia de tener 
            profesionales cuidando de tus espacios.
          </p>
          <Link
            to="/solicitar-servicio"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-xl font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-xl"
          >
            <i className="bi bi-calendar-plus mr-2"></i>
            Solicitar Servicio Ahora
          </Link>
        </div>
      </section>
    </div>
  )
}
