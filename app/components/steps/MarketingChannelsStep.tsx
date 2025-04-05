'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormStep from '../FormStep';
import CheckboxCard from '../CheckboxCard';
import {
  HashtagIcon,
  EnvelopeIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

interface MarketingChannelsStepProps {
  form: UseFormReturn<any>;
}

const channels = [
  {
    title: 'Social Media',
    description: 'Marketing through social platforms',
    value: 'social',
    icon: <HashtagIcon className="w-6 h-6" />
  },
  {
    title: 'Email Marketing',
    description: 'Reaching customers through email campaigns',
    value: 'email',
    icon: <EnvelopeIcon className="w-6 h-6" />
  },
  {
    title: 'SEO',
    description: 'Improving search engine visibility',
    value: 'seo',
    icon: <MagnifyingGlassIcon className="w-6 h-6" />
  },
  {
    title: 'Content Marketing',
    description: 'Creating valuable content for audiences',
    value: 'content',
    icon: <DocumentTextIcon className="w-6 h-6" />
  },
  {
    title: 'Paid Advertising',
    description: 'Running paid ad campaigns',
    value: 'paid',
    icon: <CurrencyDollarIcon className="w-6 h-6" />
  },
  {
    title: 'Other',
    description: 'Other marketing channels',
    value: 'other',
    icon: <PencilSquareIcon className="w-6 h-6" />
  }
];

const MarketingChannelsStep: React.FC<MarketingChannelsStepProps> = ({ form }) => {
  const { register, watch, formState: { errors } } = form;
  const selectedChannels = watch('marketingChannels') || [];
  const showOtherInput = selectedChannels.includes('other');

  return (
    <FormStep
      title="Which marketing channels do you use?"
      subtitle="Select all that apply to your business"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {channels.map((channel) => (
          <CheckboxCard
            key={channel.value}
            title={channel.title}
            description={channel.description}
            value={channel.value}
            name="marketingChannels"
            register={register}
            icon={channel.icon}
          />
        ))}
      </div>
      
      {showOtherInput && (
        <div className="mt-4">
          <input
            type="text"
            {...register('otherMarketingChannel')}
            placeholder="Please specify other marketing channels"
            className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
      )}

      {errors.marketingChannels && (
        <p className="mt-2 text-sm text-primary">
          {errors.marketingChannels.message as string}
        </p>
      )}
    </FormStep>
  );
};

export default MarketingChannelsStep; 