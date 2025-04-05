'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormStep from '../FormStep';
import RadioCard from '../RadioCard';
import {
  UserGroupIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  UsersIcon,
  BanknotesIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

interface ObstacleStepProps {
  form: UseFormReturn<any>;
}

const obstacles = [
  {
    title: 'Not enough leads',
    description: 'Struggling to generate quality leads',
    value: 'leads',
    icon: <UserGroupIcon className="w-6 h-6" />
  },
  {
    title: 'Low conversion rates',
    description: 'Difficulty converting leads into customers',
    value: 'conversion',
    icon: <ChartBarIcon className="w-6 h-6" />
  },
  {
    title: 'Low brand awareness',
    description: 'Need help increasing market visibility',
    value: 'awareness',
    icon: <BuildingStorefrontIcon className="w-6 h-6" />
  },
  {
    title: 'High competition',
    description: 'Standing out in a crowded market',
    value: 'competition',
    icon: <UsersIcon className="w-6 h-6" />
  },
  {
    title: 'Poor marketing ROI',
    description: 'Not seeing returns on marketing investment',
    value: 'roi',
    icon: <BanknotesIcon className="w-6 h-6" />
  },
  {
    title: 'Other',
    description: 'A different challenge not listed above',
    value: 'other',
    icon: <QuestionMarkCircleIcon className="w-6 h-6" />
  }
];

const ObstacleStep: React.FC<ObstacleStepProps> = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const currentValue = watch('obstacle');
  const showOtherInput = currentValue === 'other';

  const handleUnselect = () => {
    setValue('obstacle', '');
  };

  return (
    <FormStep
      title="What's your biggest marketing challenge?"
      subtitle="Let us know what's holding you back"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {obstacles.map((obstacle) => (
          <RadioCard
            key={obstacle.value}
            title={obstacle.title}
            description={obstacle.description}
            value={obstacle.value}
            name="obstacle"
            register={register}
            icon={obstacle.icon}
            currentValue={currentValue}
            onUnselect={handleUnselect}
          />
        ))}
      </div>

      {showOtherInput && (
        <div className="mt-4">
          <input
            type="text"
            {...register('otherObstacle')}
            placeholder="Please specify your biggest marketing challenge"
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      )}

      {errors.obstacle && (
        <p className="mt-2 text-sm text-primary">
          {errors.obstacle.message as string}
        </p>
      )}
    </FormStep>
  );
};

export default ObstacleStep; 