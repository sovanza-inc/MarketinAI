'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormStep from '../FormStep';
import RadioCard from '../RadioCard';
import { ShoppingBagIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

interface BusinessTypeStepProps {
  form: UseFormReturn<any>;
}

const businessTypes = [
  {
    title: 'Product-based',
    description: 'I sell physical or digital products to customers',
    value: 'product',
    icon: <ShoppingBagIcon className="w-6 h-6" />
  },
  {
    title: 'Service-based',
    description: 'I provide services to clients',
    value: 'service',
    icon: <BriefcaseIcon className="w-6 h-6" />
  }
];

const BusinessTypeStep: React.FC<BusinessTypeStepProps> = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const currentValue = watch('businessType');

  const handleUnselect = () => {
    setValue('businessType', undefined);
  };

  return (
    <FormStep
      title="What type of business do you run?"
      subtitle="This helps us tailor our strategies to your industry"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {businessTypes.map((type) => (
          <RadioCard
            key={type.value}
            title={type.title}
            description={type.description}
            value={type.value}
            name="businessType"
            register={register}
            icon={type.icon}
            currentValue={currentValue}
            onUnselect={handleUnselect}
          />
        ))}
      </div>

      {errors.businessType && (
        <p className="mt-2 text-sm text-primary">
          {errors.businessType.message as string}
        </p>
      )}
    </FormStep>
  );
};

export default BusinessTypeStep; 