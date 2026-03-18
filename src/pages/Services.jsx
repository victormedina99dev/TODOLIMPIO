import { Link } from 'react-router-dom'

const services = [
  {
    id: 'hogar',
    title: 'Limpieza de Hogar',
    shortDescription: 'Servicio completo de limpieza para tu vivienda',
    description: 'Nuestro servicio de limpieza de hogar incluye una limpieza profunda y detallada de todas las áreas de tu vivienda, utilizando productos de alta calidad y técnicas especializadas.',
    icon: 'bi-house-heart',
    color: 'from-blue-400 to-blue-600',
    features: [
      'Limpieza general de todas las habitaciones',
      'Dusting y limpieza de superficies',
      'Aspirado de pisos y alfombras',
      'Trapeado y pulido de pisos',
      'Limpieza de baños (inodoro, ducha, lavabo)',
      'Limpieza de cocina (encimeras, electrodomésticos)',
      'Cambio de sábanas y organize de habitaciones',
      'Eliminación de basura'
    ],
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695b69535?w=600&q=80',
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80'
    ],
    price: 'Desde $30',
    duration: '2-4 horas'
  },
  {
    id: 'oficina',
    title: 'Limpieza de Oficina',
    shortDescription: 'Mantenimiento profesional para espacios de trabajo',
    description: 'Mantén tu lugar de trabajo impecable con我们的 servicios de limpieza de oficina. Ofrecemos horarios flexibles y personal capacitado para no interrumpir tus operaciones.',
    icon: 'bi-briefcase',
    color: 'from-emerald-400 to-emerald-600',
    features: [
      'Limpieza de escritorios y estaciones de trabajo',
      'Aspirado y trapeado de pisos',
      'Limpieza de áreas comunes',
      'Mantenimiento de baños',
      'Limpieza de cocina y área de lunch',
      'Gestión de residuos',
      'Servicios en horario nocturno o temprano',
      'Contratos mensuales personalizados'
    ],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80'
    ],
    price: 'Desde $50',
    duration: '1-3 horas'
  },
  {
    id: 'jardineria',
    title: 'Servicios de Jardinería',
    shortDescription: 'Diseño y mantenimiento de espacios verdes',
    description: 'Transforma tu exterior con nuestros servicios de jardinería. Desde diseño paisajístico hasta mantenimiento regular, cuidamos de tus áreas verdes.',
    icon: 'bi-flower2',
    color: 'from-green-400 to-green-600',
    features: [
      'Diseño de paisajes',
      'Plantación de árboles y flores',
      'Corte de césped',
      'Podas y mantenimiento',
      'Instalación de sistemas de riego',
      'Control de plagas',
      'Fertilización',
      'Limpieza de áreas exteriores'
    ],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80'
    ],
    price: 'Desde $40',
    duration: '2-5 horas'
  }
]

const process = [
  {
    step: 1,
    title: 'Solicita tu Servicio',
    description: 'Contáctanos a través de nuestro formulario o WhatsApp',
    icon: 'bi-clipboard-plus'
  },
  {
    step: 2,
    title: 'Recibe una Cotización',
    description: 'Te enviamos un presupuesto detallado en menos de 24 horas',
    icon: 'bi-file-earmark-text'
  },
  {
    step: 3,
    title: 'Confirmar Cita',
    description: 'Agenda el día y hora que mejor te convenga',
    icon: 'bi-calendar-check'
  },
  {
    step: 4,
    title: 'Disfruta',
    description: 'Relájate mientras nosotros transformamos tu espacio',
    icon: 'bi-emoji-smile'
  }
]

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary-500 font-medium">SERVICIOS PROFESIONALES</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2 mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ofrecemos soluciones integrales de limpieza y mantenimiento 
            para hogares y empresas en Venezuela.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}>
                    <i className={`bi ${service.icon} text-white text-2xl`}></i>
                  </div>
                  
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {service.features.slice(0, 6).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <i className="bi bi-check-circle-fill text-primary-500"></i>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
                    <span className="flex items-center gap-2">
                      <i className="bi bi-currency-dollar text-primary-500"></i>
                      {service.price}
                    </span>
                    <span className="flex items-center gap-2">
                      <i className="bi bi-clock text-primary-500"></i>
                      {service.duration}
                    </span>
                  </div>

                  <Link
                    to="/solicitar-servicio"
                    className="btn-primary"
                  >
                    <i className="bi bi-calendar-plus mr-2"></i>
                    Solicitar este Servicio
                  </Link>
                </div>

                {/* Images */}
                <div className={`grid gap-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img
                    src={service.images[0]}
                    alt={service.title}
                    className="rounded-2xl shadow-lg w-full h-64 object-cover"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <img
                      src={service.images[1]}
                      alt={`${service.title} - Detalle`}
                      className="rounded-xl shadow-md w-full h-32 object-cover"
                    />
                    <div className="rounded-xl shadow-md bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <div className="text-3xl font-bold">100%</div>
                        <div className="text-sm opacity-90">Satisfecho</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary-500 font-medium">¿CÓMO FUNCIONA?</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-2">
              Proceso Simple
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative text-center">
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-200"></div>
                )}
                <div className="relative z-10 w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">{step.step}</span>
                </div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary-100 flex items-center justify-center">
                  <i className={`bi ${step.icon} text-primary-500 text-xl`}></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-display font-bold mb-4">
              ¿Necesitas algo más específico?
            </h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Contáctanos y te ofrecerá una solución personalizada 
              adaptée a tus necesidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/solicitar-servicio"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <i className="bi bi-chat-dots mr-2"></i>
                Contáctanos
              </Link>
              <a
                href="https://wa.me/message/U7VEZNXGTCZ3H1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                <i className="bi bi-whatsapp mr-2"></i>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
