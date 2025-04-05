'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormStep from '../FormStep';

interface WebsiteStepProps {
  form: UseFormReturn<any>;
}

const WebsiteStep: React.FC<WebsiteStepProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <FormStep
      title="What's your website URL?"
      subtitle="We'll analyze your current online presence"
    >
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg className="w-5 h-5 text-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </div>
          <input
            {...register('website')}
            type="url"
            placeholder="https://example.com"
            className="w-full p-4 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        {errors.website && (
          <p className="text-sm text-primary">{errors.website.message as string}</p>
        )}
        <p className="text-xs text-text-light italic">
          Don't have a website yet? No problem! Just leave this field empty.
        </p>
      </div>
    </FormStep>
  );
};

export default WebsiteStep; 