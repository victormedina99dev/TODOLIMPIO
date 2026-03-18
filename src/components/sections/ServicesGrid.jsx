import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { services } from '../../constants';
import { Link } from 'react-router-dom';

const ServicesGrid = () => {
  return (
    <section className="py-24 bg-transparent transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20 animate-fade-in">
          <Badge variant="primary" className="mb-4">Nuestros Servicios</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            Excelencia en cada detalle
          </h2>
          <p className="text-lg text-surface-400 max-w-2xl">
            Ofrecemos soluciones integrales de limpieza y mantenimiento adaptadas a tus necesidades específicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-0 border-0 overflow-hidden group hover:scale-[1.02]"
              animate
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-surface-950/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-500 text-white flex items-center justify-center text-xl shadow-lg shadow-primary-500/40">
                    <i className={`bi ${service.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-surface-400 mb-8 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-10">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-sm font-medium text-surface-300">
                      <i className="bi bi-check2-circle text-primary-500 text-lg"></i>
                      {feature}
                    </div>
                  ))}
                </div>

                <Link to="/solicitar-servicio">
                  <Button variant="outline" className="w-full h-12 rounded-xl group" icon="bi-arrow-right" iconPosition="right">
                    Solicitar Info
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
