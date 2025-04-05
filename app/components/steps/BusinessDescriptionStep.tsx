'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormStep from '../FormStep';

interface BusinessDescriptionStepProps {
  form: UseFormReturn<any>;
}

const BusinessDescriptionStep: React.FC<BusinessDescriptionStepProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <FormStep
      title="Tell us about your business"
      subtitle="Help us understand what makes your business unique"
    >
      <div className="space-y-4">
        <textarea
          {...register('businessDescription')}
          rows={5}
          placeholder="Describe your business, products/services, target audience, and what sets you apart from competitors..."
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        {errors.businessDescription && (
          <p className="text-sm text-primary">{errors.businessDescription.message as string}</p>
        )}
        <div className="text-xs text-text-light space-y-2">
          <p>Some points to consider:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>What products or services do you offer?</li>
            <li>Who is your target audience?</li>
            <li>What are your unique selling points?</li>
            <li>What are your business goals?</li>
          </ul>
        </div>
      </div>
    </FormStep>
  );
};

export default BusinessDescriptionStep; 