'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormStep from '../FormStep';

interface EmailStepProps {
  form: UseFormReturn<any>;
  name: string;
}

const EmailStep: React.FC<EmailStepProps> = ({ form, name }) => {
  const { register, formState: { errors } } = form;

  return (
    <FormStep
      title={`Hi ${name}, what's your email?`}
      subtitle="We'll send your session details here"
    >
      <div className="space-y-4">
        <input
          {...register('email')}
          type="email"
          placeholder="Your email *"
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && (
          <p className="text-sm text-primary">{errors.email.message as string}</p>
        )}
      </div>
    </FormStep>
  );
};

export default EmailStep; 