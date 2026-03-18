import React from 'react';

const FormSection = ({ title, icon: Icon, children, className = '' }) => {
  return (
    <div className={`glass-card p-8 rounded-[2rem] border border-white/5 space-y-8 ${className}`}>
      <div className="flex items-center gap-4 pb-6 border-b border-white/5">
        <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center text-2xl shadow-lg shadow-primary-500/5">
          <i className={`bi ${Icon}`}></i>
        </div>
        <h2 className="text-2xl font-display font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
