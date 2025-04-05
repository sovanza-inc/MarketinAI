'use client';

import React, { ReactNode } from 'react';

interface FormStepProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const FormStep: React.FC<FormStepProps> = ({ title, subtitle, children }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-h3 font-heading font-semibold text-text-dark">{title}</h2>
        {subtitle && (
          <p className="mt-2 text-body text-text-light">{subtitle}</p>
        )}
      </div>
      <div className="mt-8">
        {children}
      </div>
    </div>
  );
};

export default FormStep; 