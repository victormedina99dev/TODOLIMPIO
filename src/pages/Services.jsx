import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { brand } from '../constants'

const services = [
  {
    id: 'hogar',
    title: 'Limpieza de Hogar',
    shortDescription: 'Servicio completo de limpieza para tu vivienda',
    description: 'Nuestro servicio de limpieza de hogar incluye una limpieza profunda y detallada de todas las áreas de tu vivienda, utilizando productos de alta calidad y técnicas especializadas.',
    icon: 'bi-house-heart',
    color: 'from-blue-500/20 to-blue-600/20',
    iconColor: 'text-blue-500',
    features: [
      'Limpieza general de todas las habitaciones',
      'Dusting y limpieza de superficies',
      'Aspirado de pisos y alfombras',
      'Trapeado y pulido de pisos',
      'Limpieza de baños completa',
      'Limpieza de cocina y electrodomésticos',
      'Organización de habitaciones',
      'Eliminación de basura'
    ],
    images: [
      '/imagenes/img_limpieza_hogar.png',
      '/imagenes/limpieza-de-la-casa.png'
    ]
  },
  {
    id: 'oficina',
    title: 'Limpieza de Oficina',
    shortDescription: 'Mantenimiento profesional para espacios de trabajo',
    description: 'Mantén tu lugar de trabajo impecable con nuestros servicios de limpieza de oficina. Ofrecemos horarios flexibles y personal capacitado para no interrumpir tus operaciones.',
    icon: 'bi-briefcase',
    color: 'from-emerald-500/20 to-emerald-600/20',
    iconColor: 'text-emerald-500',
    features: [
      'Limpieza de escritorios y estaciones',
      'Aspirado y trapeado de pisos',
      'Limpieza de áreas comunes',
      'Mantenimiento de baños',
      'Limpieza de cocina y área de lunch',
      'Gestión integral de residuos',
      'Servicios en horario flexible',
      'Contratos mensuales personalizados'
    ],
    images: [
      '/imagenes/Limpieza de oficina.png',
      '/imagenes/limpieza-de-oficinas.png'
    ]
  },
  {
    id: 'jardineria',
    title: 'Servicios de Jardinería',
    shortDescription: 'Diseño y mantenimiento de espacios verdes',
    description: 'Transforma tu exterior con nuestros servicios de jardinería. Desde diseño paisajístico hasta mantenimiento regular, cuidamos de tus áreas verdes.',
    icon: 'bi-flower2',
    color: 'from-green-500/20 to-green-600/20',
    iconColor: 'text-green-500',
    features: [
      'Diseño de paisajes',
      'Plantación de árboles y flores',
      'Corte de césped profesional',
      'Podas y mantenimiento estético',
      'Sistemas de riego',
      'Control de plagas de jardín',
      'Fertilización orgánica',
      'Limpieza de áreas exteriores'
    ],
    images: [
      '/imagenes/jardinero-con-weedwacker-cortando-el-cesped-en-el-jardin.jpg',
      '/imagenes/tijeras.png'
    ]
  }
]

const processSteps = [
  {
    step: 1,
    title: 'Solicita tu Servicio',
    description: 'Contáctanos a través de nuestro formulario o WhatsApp',
    icon: 'bi-clipboard-plus'
  },
  {
    step: 2,
    title: 'Recibe una Cotización',
    description: 'Te enviamos un presupuesto detallado en tiempo récord',
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
    <div className="min-h-screen bg-surface-950">
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Badge variant="primary" className="mb-6 animate-fade-in">SERVICIOS PROFESIONALES</Badge>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white mt-4 mb-8 tracking-tight animate-slide-up">
            Soluciones de <span className="text-gradient">Limpieza Total</span>
          </h1>
          <p className="text-xl text-surface-400 max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-100">
            Ofrecemos servicios de alta gama diseñados para el bienestar de tu familia y la productividad de tu empresa. 
            Calidad garantizada en cada rincón.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="space-y-32">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex flex-col lg:flex-row gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="flex-1 space-y-8 animate-fade-in">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-br ${service.color} border border-white/5 shadow-inner`}>
                    <i className={`bi ${service.icon} ${service.iconColor} text-4xl`}></i>
                  </div>
                  
                  <div>
                    <h2 className="text-4xl font-display font-extrabold text-white mb-4 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-lg text-surface-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.features.slice(0, 8).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-surface-300">
                        <div className="w-5 h-5 rounded-full bg-primary-500/10 flex items-center justify-center shrink-0">
                          <i className="bi bi-check2 text-primary-500 font-bold"></i>
                        </div>
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/solicitar-servicio" className="block sm:inline-block pt-6">
                    <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg font-bold shadow-xl shadow-primary-500/10" icon="bi-calendar-plus">
                      Solicitar este Servicio
                    </Button>
                  </Link>
                </div>

                {/* Images Overlay */}
                <div className="flex-1 relative animate-scale-in">
                  <div className="grid gap-6">
                    <div className="relative rounded-[2.5rem] p-4 bg-white/5 border border-white/10 shadow-2xl overflow-hidden group">
                      <img
                        src={service.images[0]}
                        alt={service.title}
                        className="rounded-[2rem] w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-950/60 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 px-4 -mt-12 relative z-10">
                      <div className="rounded-3xl p-3 bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                        <img
                          src={service.images[1]}
                          alt={`${service.title} - Detalle`}
                          className="rounded-2xl w-full h-32 object-cover"
                        />
                      </div>
                      <div className="rounded-3xl p-6 bg-primary-500 flex flex-col items-center justify-center shadow-2xl shadow-primary-500/30">
                        <div className="text-4xl font-display font-black text-white leading-none mb-1">100%</div>
                        <div className="text-xs font-bold text-white/80 uppercase tracking-widest">Garantizado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-surface-900/30">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <Badge variant="primary" className="mb-4">METODOLOGÍA</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-6">
              ¿Cómo lo hacemos?
            </h2>
            <p className="text-lg text-surface-400">
              Un proceso simple y transparente diseñado para tu comodidad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[70%] w-full h-[2px] bg-gradient-to-r from-primary-500/20 to-transparent"></div>
                )}
                <div className="relative z-10 w-20 h-20 mx-auto mb-8 rounded-[1.5rem] bg-surface-900 border border-white/5 flex items-center justify-center text-3xl text-primary-500 shadow-xl group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                  <i className={`bi ${step.icon}`}></i>
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center shadow-lg border-2 border-surface-950">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary-500 transition-colors">
                  {step.title}
                </h3>
                <p className="text-surface-500 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative rounded-[3rem] p-12 md:p-20 overflow-hidden text-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 tracking-tight">
                ¿Listo para transformar <br /> tu espacio?
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-2xl leading-relaxed font-medium">
                Únete a los cientos de clientes satisfechos que ya disfrutan de la calidad de {brand.name}. 
                Cotización sin compromiso en minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <Link to="/solicitar-servicio" className="group/btn relative">
                  <Button size="lg" className="bg-white text-primary-600 hover:bg-surface-50 w-full sm:w-auto px-12 h-16 text-lg font-bold shadow-2xl" icon="bi-send-check">
                    Solicitar Ahora
                  </Button>
                </Link>
                <a
                  href="https://wa.me/message/U7VEZNXGTCZ3H1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-4 bg-emerald-500/20 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold hover:bg-emerald-500/30 transition-all group h-16"
                >
                  <i className="bi bi-whatsapp mr-3 text-xl"></i>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
