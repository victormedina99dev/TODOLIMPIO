import React from 'react'
import Hero from '../components/sections/Hero'
import ServicesGrid from '../components/sections/ServicesGrid'
import About from '../components/sections/About'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-surface-950">
      <Hero />
      <ServicesGrid />
      <About />

      {/* Final CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600 dark:bg-primary-900/40"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-white mb-8">
            ¿Listo para elevar <br /> el nivel de tu espacio?
          </h2>
          <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Únete a cientos de clientes satisfechos que ya disfrutan de un ambiente 
            impecable con el sello de calidad TodoLimpio.
          </p>
          <Link to="/solicitar-servicio">
            <Button variant="secondary" size="lg" className="h-16 px-12 text-xl font-bold shadow-2xl hover:scale-105">
              Empieza Hoy Mismo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
