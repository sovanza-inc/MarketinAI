'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { countries } from 'countries-list';
import FormStep from '../FormStep';

interface CountryStepProps {
  form: UseFormReturn<any>;
}

const CountryStep: React.FC<CountryStepProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  // Convert countries object to sorted array
  const countryList = Object.entries(countries)
    .map(([code, country]) => ({
      code,
      name: country.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <FormStep
      title="Where is your business based?"
      subtitle="This helps us understand your market better"
    >
      <div className="mt-4">
        <select
          {...register('country')}
          className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white"
          defaultValue=""
        >
          <option value="" disabled>Select your country</option>
          {countryList.map(({ code, name }) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-2 text-sm text-primary">
            {errors.country.message as string}
          </p>
        )}
      </div>
    </FormStep>
  );
};

export default CountryStep; 