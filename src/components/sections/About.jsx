import React from 'react';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { brand } from '../../constants';

const About = () => {
  const features = [
    { icon: 'bi-shield-check', title: 'Personal Capacitado', color: 'bg-primary-500/10 text-primary-500' },
    { icon: 'bi-patch-check', title: 'Calidad Garantizada', color: 'bg-secondary-500/10 text-secondary-500' },
    { icon: 'bi-clock-history', title: 'Puntualidad', color: 'bg-green-500/10 text-green-500' },
    { icon: 'bi-heart', title: 'Atención Personalizada', color: 'bg-purple-500/10 text-purple-500' },
  ];

  return (
    <section className="py-24 bg-white dark:bg-surface-950 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <img
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80"
                alt="Limpieza profesional"
                className="rounded-[2rem] shadow-2xl mt-12 animate-float"
              />
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Jardinería"
                className="rounded-[2rem] shadow-2xl animate-float animate-delay-500"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/20 rounded-full blur-[80px] -z-10"></div>
          </div>

          <div>
            <Badge variant="secondary" className="mb-6">Sobre Nosotros</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-8 dark:text-white leading-[1.2]">
              Cuidamos tus espacios como si fueran nuestros
            </h2>
            <p className="text-xl text-surface-600 dark:text-surface-400 mb-8 leading-relaxed">
              <strong className="text-surface-900 dark:text-white font-bold">{brand.name}</strong> es mucho más que una empresa de limpieza; 
              somos tus aliados en el cuidado y mantenimiento de tus espacios. 
            </p>
            <p className="text-lg text-surface-500 dark:text-surface-400 mb-12">
              Entendemos que un ambiente limpio y un jardín bien cuidado no solo mejoran la estética, 
              sino que también contribuyen al bienestar y la productividad de quienes los habitan.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((item, idx) => (
                <Card key={idx} isGlass className="p-5 flex items-center gap-5 group hover:bg-white/10 transition-colors">
                  <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-2xl shadow-inner`}>
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <span className="font-bold text-surface-900 dark:text-white group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
