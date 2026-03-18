import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

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
  const [address, setAddress] = useState('Cargando dirección...')
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER)
  const markerRef = useRef(null)

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    document.getElementById('fecha')?.setAttribute('min', today)
    fetchAddress(DEFAULT_CENTER[0], DEFAULT_CENTER[1])
  }, [])

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

  const validateForm = () => {
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
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      const response = await fetch('https://formsubmit.co/todolimpiovenezuela@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          direccion: address,
          ubicacion: `${formData.lat}, ${formData.lng}`
        }),
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
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
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary-500 font-medium">SOLICITAR SERVICIO</span>
          <h1 className="text-4xl font-display font-bold text-gray-900 mt-2 mb-4">
            Agenda tu Servicio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Completa el formulario y nuestro equipo te contactará para confirmar tu cita.
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="max-w-2xl mx-auto mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <i className="bi bi-check-circle text-green-500 text-3xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">¡Solicitud Enviada!</h3>
            <p className="text-green-700">
              Gracias por confiar en nosotros. Te contactaremos pronto para confirmar tu cita.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - User Data */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <i className="bi bi-person text-primary-500"></i>
                  Datos Personales
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={`input-field ${errors.nombre ? 'input-error' : ''}`}
                      placeholder="Tu nombre"
                    />
                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                  </div>
                  
                  <div>
                    <label className="label">Apellido</label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      className={`input-field ${errors.apellido ? 'input-error' : ''}`}
                      placeholder="Tu apellido"
                    />
                    {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="label">Correo Electrónico</label>
                    <input
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      className={`input-field ${errors.correo ? 'input-error' : ''}`}
                      placeholder="tu@email.com"
                    />
                    {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo}</p>}
                  </div>
                  
                  <div>
                    <label className="label">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className={`input-field ${errors.telefono ? 'input-error' : ''}`}
                      placeholder="+58 XXX XXX XXXX"
                    />
                    {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <i className="bi bi-briefcase text-primary-500"></i>
                  Selecciona el Servicio
                </h2>
                
                <div className="grid sm:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <label
                      key={service.id}
                      className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all ${
                        formData.servicio === service.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="servicio"
                        value={service.id}
                        checked={formData.servicio === service.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <i className={`bi ${service.icon} text-2xl text-primary-500 mb-2 block`}></i>
                        <span className="text-sm font-medium">{service.label}</span>
                      </div>
                      {formData.servicio === service.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                          <i className="bi bi-check text-white text-xs"></i>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
                {errors.servicio && <p className="text-red-500 text-sm mt-2">{errors.servicio}</p>}
              </div>

              {/* Date & Time */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <i className="bi bi-calendar-event text-primary-500"></i>
                  Fecha y Hora
                </h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Fecha del Servicio</label>
                    <input
                      type="date"
                      id="fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      className={`input-field ${errors.fecha ? 'input-error' : ''}`}
                    />
                    {errors.fecha && <p className="text-red-500 text-sm mt-1">{errors.fecha}</p>}
                  </div>
                  
                  <div>
                    <label className="label">Hora</label>
                    <input
                      type="time"
                      name="hora"
                      value={formData.hora}
                      onChange={handleChange}
                      className={`input-field ${errors.hora ? 'input-error' : ''}`}
                    />
                    {errors.hora && <p className="text-red-500 text-sm mt-1">{errors.hora}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <i className="bi bi-geo-alt text-primary-500"></i>
                  Ubicación del Servicio
                </h2>
                
                <p className="text-sm text-gray-500 mb-4">
                  Haz clic en el mapa para seleccionar la ubicación exacta donde deseas el servicio.
                </p>
                
                <div className="h-80 rounded-xl overflow-hidden mb-4 border border-gray-200">
                  <MapContainer
                    center={DEFAULT_CENTER}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <i className="bi bi-geo text-primary-500 mt-1"></i>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Dirección seleccionada:</p>
                      <p className="text-sm text-gray-600">{address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <i className="bi bi-hourglass-split animate-spin mr-2"></i>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send mr-2"></i>
                    Solicitar Servicio
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
