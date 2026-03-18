import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { stats, brand } from '../../constants';

const Hero = () => {
  // Single premium image instead of carousel for a more focused brand message
  const heroImage = '/imagenes/premium_home_office_cleaning.png';

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white dark:bg-surface-950 transition-colors duration-500">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse-soft"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary-500/10 rounded-full blur-[100px] animate-pulse-soft animate-delay-300"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in text-center lg:text-left">
            <Badge variant="primary" className="mb-6 animate-slide-up">
              ✨ {brand.name} - Servicios Profesionales
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-8 leading-[1.1]">
              <span className="block text-surface-900 dark:text-white">Lo mejor para</span>
              <span className="text-gradient block mt-2">{brand.tagline}</span>
            </h1>
            
            <p className="text-xl text-surface-600 dark:text-surface-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {brand.description}. Transformamos hogares y oficinas con la dedicación que mereces.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link to="/solicitar-servicio">
                <Button size="lg" icon="bi-calendar-check" className="w-full sm:w-auto h-14 px-8 text-lg">
                  Solicitar Ahora
                </Button>
              </Link>
              <Link to="/servicios">
                <Button variant="outline" size="lg" icon="bi-arrow-right" iconPosition="right" className="w-full sm:w-auto h-14 px-8 text-lg">
                  Ver Servicios
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-surface-200 dark:border-surface-800 animate-slide-up animate-delay-200">
              {stats.map((stat, idx) => (
                <div key={idx} className="group cursor-default">
                  <div className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-surface-500 uppercase tracking-widest leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="relative z-10 rounded-[2.5rem] p-4 bg-glass-gradient border border-white/10 shadow-glass">
              <div className="rounded-[2rem] overflow-hidden">
                <img
                  src={heroImage}
                  alt="Servicios de limpieza premium en hogares y oficinas"
                  className="w-full h-[600px] object-cover animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
