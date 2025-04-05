'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormStep from '../FormStep';

interface NameStepProps {
  form: UseFormReturn<any>;
}

const NameStep: React.FC<NameStepProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <FormStep
      title="What's your name?"
      subtitle="Let's start with a proper introduction"
    >
      <div className="space-y-4">
        <input
          {...register('name')}
          type="text"
          placeholder="Your name *"
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.name && (
          <p className="text-sm text-primary">{errors.name.message as string}</p>
        )}
      </div>
    </FormStep>
  );
};

export default NameStep; 