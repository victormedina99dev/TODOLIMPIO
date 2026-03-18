import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import FormInput from '../components/ui/FormInput'
import FormSection from '../components/ui/FormSection'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { brand } from '../constants'

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const services = [
  { id: 'hogar', label: 'Limpieza del hogar', icon: 'bi-house-heart' },
  { id: 'oficina', label: 'Limpieza de oficina', icon: 'bi-briefcase' },
  { id: 'jardineria', label: 'Jardinería', icon: 'bi-flower2' },
]

const DEFAULT_CENTER = [10.0667, -69.3583] // Barquisimeto, Venezuela

function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

function RecenterMap({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center) {
      map.setView(center, 15)
    }
  }, [center, map])
  return null
}

export default function ServiceRequest() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    servicio: '',
    fecha: '',
    hora: '',
    direccion: '',
    lat: DEFAULT_CENTER[0],
    lng: DEFAULT_CENTER[1]
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [address, setAddress] = useState('Selecciona un punto en el mapa...')
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER)
  const [isLocating, setIsLocating] = useState(false)
  const markerRef = useRef(null)

  // Auto-detect location on mount
  useEffect(() => {
    handleDetectLocation()
  }, [])

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    document.getElementById('fecha')?.setAttribute('min', today)
  }, [])

  const handleDetectLocation = () => {
    if (!navigator.geolocation) return

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        handleLocationSelect(latitude, longitude)
        setIsLocating(false)
      },
      (error) => {
        console.error('Geolocation error:', error)
        setIsLocating(false)
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    )
  }

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'TodoLimpioApp/1.0'
          }
        }
      )
      const data = await response.json()
      setAddress(data.display_name || 'Dirección no encontrada')
    } catch (error) {
      setAddress('Error al obtener dirección')
    }
  }

  const handleLocationSelect = (lat, lng) => {
    setFormData(prev => ({ ...prev, lat, lng }))
    setMapCenter([lat, lng])
    fetchAddress(lat, lng)
    
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng])
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = (e) => {
    const newErrors = {}
    
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido'
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido'
    if (!formData.correo.trim()) newErrors.correo = 'El correo es requerido'
    else if (!/\S+@\S+\.\S+/.test(formData.correo)) newErrors.correo = 'Correo inválido'
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido'
    if (!formData.servicio) newErrors.servicio = 'Selecciona un servicio'
    if (!formData.fecha) newErrors.fecha = 'La fecha es requerida'
    if (!formData.hora) newErrors.hora = 'La hora es requerida'
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length > 0) {
      e.preventDefault()
      return false
    }
    
    setIsSubmitting(true)
    return true
  }

  return (
    <div className="min-h-screen bg-surface-950 pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="primary" className="mb-4">
            SOLICITAR SERVICIO
          </Badge>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold text-white mt-4 mb-6 tracking-tight">
            Agenda tu <span className="text-gradient">Servicio Premium</span>
          </h1>
          <p className="text-xl text-surface-400 max-w-2xl mx-auto leading-relaxed">
            Completa el formulario y nuestro equipo te contactará para confirmar tu cita. Experimenta la limpieza al más alto nivel.
          </p>
        </div>

        <form 
          action={`https://formsubmit.co/${brand.contactEmail}`} 
          method="POST"
          onSubmit={validateForm}
          className="max-w-6xl mx-auto"
        >
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_subject" value={`Nueva Solicitud: ${formData.servicio.toUpperCase()} - ${formData.nombre} ${formData.apellido}`} />
          <input type="hidden" name="_next" value={window.location.origin + '/solicitar-servicio?success=true'} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="text" name="_honey" style={{ display: 'none' }} />
          
          {/* Extra formatted data for the email */}
          <input type="hidden" name="direccion_completa" value={address} />
          <input type="hidden" name="google_maps" value={`https://www.google.com/maps?q=${formData.lat},${formData.lng}`} />
          <input type="hidden" name="coordenadas" value={`${formData.lat}, ${formData.lng}`} />
          <input type="hidden" name="resumen_cita" value={`Solicitado para el ${formData.fecha} a las ${formData.hora}`} />

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left Column - Form Fields */}
            <div className="space-y-10">
              <FormSection title="Datos Personales" icon="bi-person-badge">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormInput
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    error={errors.nombre}
                    placeholder="Tu nombre"
                    icon="bi-person"
                    required
                  />
                  <FormInput
                    label="Apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    error={errors.apellido}
                    placeholder="Tu apellido"
                    icon="bi-person"
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormInput
                    label="Correo Electrónico"
                    name="email"
                    type="email"
                    value={formData.correo}
                    onChange={(e) => {
                      handleChange(e)
                      setFormData(prev => ({ ...prev, correo: e.target.value }))
                    }}
                    error={errors.correo}
                    placeholder="nombre@gmail.com"
                    icon="bi-envelope"
                    required
                  />
                  <FormInput
                    label="Teléfono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    error={errors.telefono}
                    placeholder="+58 4XX XXXXXXX"
                    icon="bi-telephone"
                    required
                  />
                </div>
              </FormSection>

              <FormSection title="Detalles del Servicio" icon="bi-stars">
                <div className="grid sm:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 ${
                        formData.servicio === service.id
                          ? 'border-primary-500 bg-primary-500/5 shadow-lg shadow-primary-500/10'
                          : 'border-surface-800 bg-surface-900/50 hover:border-surface-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="servicio"
                        value={service.id}
                        checked={formData.servicio === service.id}
                        onChange={handleChange}
                        className="sr-only"
                        required
                      />
                      <div className="text-center">
                        <i className={`bi ${service.icon} text-3xl mb-3 block ${
                          formData.servicio === service.id ? 'text-primary-500' : 'text-surface-500'
                        }`}></i>
                        <span className={`text-sm font-bold block ${
                          formData.servicio === service.id ? 'text-white' : 'text-surface-400'
                        }`}>{service.label}</span>
                      </div>
                      {formData.servicio === service.id && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center animate-scale-in">
                          <i className="bi bi-check text-white text-lg"></i>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
                {errors.servicio && <p className="text-red-500 text-xs font-medium ml-1">{errors.servicio}</p>}

                <div className="grid sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/5">
                  <FormInput
                    label="Fecha Preferida"
                    id="fecha"
                    name="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={handleChange}
                    error={errors.fecha}
                    icon="bi-calendar-date"
                    required
                  />
                  <FormInput
                    label="Hora"
                    name="hora"
                    type="time"
                    value={formData.hora}
                    onChange={handleChange}
                    error={errors.hora}
                    icon="bi-clock"
                    required
                  />
                </div>
              </FormSection>
            </div>

            {/* Right Column - Map and Address */}
            <div className="space-y-10 lg:sticky lg:top-32">
              <FormSection title="Ubicación" icon="bi-geo-alt">
                <p className="text-sm text-surface-500">
                  Selecciona en el mapa el punto exacto para la prestación del servicio.
                </p>
                
                <div className="h-96 rounded-3xl overflow-hidden border-2 border-surface-800 shadow-2xl relative">
                  <MapContainer
                    center={DEFAULT_CENTER}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    className="z-10"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      className="dark-map-tiles"
                    />
                    <Marker
                      position={mapCenter}
                      ref={markerRef}
                      draggable={true}
                      eventHandlers={{
                        dragend: (e) => {
                          const { lat, lng } = e.target.getLatLng()
                          handleLocationSelect(lat, lng)
                        },
                      }}
                    />
                    <MapClickHandler onLocationSelect={handleLocationSelect} />
                    <RecenterMap center={mapCenter} />
                  </MapContainer>
                  
                  {/* Location Controls */}
                  <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        handleDetectLocation()
                      }}
                      className={`p-3 rounded-xl backdrop-blur-md border border-white/10 shadow-xl transition-all ${
                        isLocating 
                          ? 'bg-primary-500 text-white animate-pulse' 
                          : 'bg-surface-900/80 text-primary-500 hover:bg-primary-500 hover:text-white'
                      }`}
                      title="Detectar mi ubicación"
                    >
                      <i className={`bi ${isLocating ? 'bi-arrow-repeat' : 'bi-geo-alt-fill'} text-xl`}></i>
                    </button>
                  </div>

                  {/* Map overlay for premium feel */}
                  <div className="absolute inset-0 pointer-events-none border-[12px] border-surface-900/30 rounded-3xl z-20"></div>
                </div>

                <div className="p-6 bg-surface-900/50 rounded-2xl border border-white/5 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-xl shrink-0">
                    <i className="bi bi-geo"></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-surface-500 uppercase tracking-widest mb-1">Dirección Detectada</p>
                    <p className="text-white font-medium leading-snug">{address}</p>
                    {/* Hidden address input for form submission */}
                    <input type="hidden" name="direccion_mapa" value={address} />
                  </div>
                </div>
              </FormSection>

              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full py-8 text-xl font-bold shadow-xl shadow-primary-500/10"
                icon={isSubmitting ? "bi-hourglass-split" : "bi-send-check"}
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Solicitud'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
