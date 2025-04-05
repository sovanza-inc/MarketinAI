'use client';

import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface CheckboxCardProps {
  title: string;
  description?: string;
  value: string;
  name: string;
  register: UseFormRegister<any>;
  icon?: React.ReactNode;
}

const CheckboxCard: React.FC<CheckboxCardProps> = ({
  title,
  description,
  value,
  name,
  register,
  icon
}) => {
  return (
    <label className="relative group cursor-pointer block">
      <input
        type="checkbox"
        {...register(name)}
        value={value}
        className="peer sr-only"
        defaultChecked={false}
      />
      <div className="card px-4 py-4 border-2 transition-all duration-200 peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/50 flex items-center">
        <div className="flex items-start gap-3 py-2 w-full min-h-[100px]">
          {icon && (
            <div className="flex-shrink-0 w-6 h-6 text-text-light group-hover:text-primary transition-colors duration-200 peer-checked:text-primary mt-0.5">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0 overflow-hidden">
            <h3 className="text-base font-semibold text-text-dark group-hover:text-primary transition-colors duration-200 leading-tight truncate">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-text-light mt-0.5 leading-snug line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </label>
  );
};

export default CheckboxCard; 