'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormStep from '../FormStep';
import RadioCard from '../RadioCard';
import {
  CurrencyDollarIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

interface MonthlyBudgetStepProps {
  form: UseFormReturn<any>;
}

const budgets = [
  {
    title: 'Under $5,000',
    description: 'Getting started with marketing',
    value: 'under_5k',
    icon: <CurrencyDollarIcon className="w-6 h-6" />
  },
  {
    title: '$5,000 - $10,000',
    description: 'Growing your marketing efforts',
    value: '5k_10k',
    icon: <RocketLaunchIcon className="w-6 h-6" />
  },
  {
    title: '$10,000 - $25,000',
    description: 'Scaling your marketing strategy',
    value: '10k_25k',
    icon: <ChartBarIcon className="w-6 h-6" />
  },
  {
    title: '$25,000 - $50,000',
    description: 'Advanced marketing campaigns',
    value: '25k_50k',
    icon: <BuildingOfficeIcon className="w-6 h-6" />
  }
];

const MonthlyBudgetStep: React.FC<MonthlyBudgetStepProps> = ({ form }) => {
  const { register, formState: { errors } } = form;

  return (
    <FormStep
      title="What's your monthly marketing budget?"
      subtitle="This helps us recommend the most suitable strategies"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {budgets.map((budget) => (
          <RadioCard
            key={budget.value}
            title={budget.title}
            description={budget.description}
            value={budget.value}
            name="monthlyBudget"
            register={register}
            icon={budget.icon}
          />
        ))}
      </div>
      {errors.monthlyBudget && (
        <p className="mt-2 text-sm text-primary">
          {errors.monthlyBudget.message as string}
        </p>
      )}
    </FormStep>
  );
};

export default MonthlyBudgetStep; 