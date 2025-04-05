'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormStep from '../FormStep';

interface RevenueStepProps {
  form: UseFormReturn<any>;
}

const RevenueStep: React.FC<RevenueStepProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <FormStep
      title="What are your revenue goals?"
      subtitle="Help us understand your growth targets"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-base font-medium text-text-dark mb-2">
            Current Monthly Revenue
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light">$</span>
            <input
              type="number"
              min="1"
              step="1"
              {...register('monthlyRevenue', {
                valueAsNumber: true,
              })}
              className={`w-full pl-7 pr-4 py-2 border-2 rounded-lg focus:ring-primary focus:border-primary ${
                errors.monthlyRevenue ? 'border-primary' : 'border-gray-300'
              }`}
              placeholder="0"
            />
          </div>
          {errors.monthlyRevenue && (
            <p className="mt-1 text-sm text-primary">{errors.monthlyRevenue.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-base font-medium text-text-dark mb-2">
            Target Monthly Revenue
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light">$</span>
            <input
              type="number"
              min="1"
              step="1"
              {...register('targetRevenue', {
                valueAsNumber: true,
              })}
              className={`w-full pl-7 pr-4 py-2 border-2 rounded-lg focus:ring-primary focus:border-primary ${
                errors.targetRevenue ? 'border-primary' : 'border-gray-300'
              }`}
              placeholder="0"
            />
          </div>
          {errors.targetRevenue && (
            <p className="mt-1 text-sm text-primary">{errors.targetRevenue.message as string}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-text-light italic mt-4">
        This helps us understand your growth ambitions and tailor our strategies accordingly.
      </p>
    </FormStep>
  );
};

export default RevenueStep;