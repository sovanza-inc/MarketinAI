'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import NameStep from './steps/NameStep';
import EmailStep from './steps/EmailStep';
import BusinessTypeStep from './steps/BusinessTypeStep';
import MarketingChannelsStep from './steps/MarketingChannelsStep';
import CountryStep from './steps/CountryStep';
import MonthlyBudgetStep from './steps/MonthlyBudgetStep';
import WebsiteStep from './steps/WebsiteStep';
import BusinessDescriptionStep from './steps/BusinessDescriptionStep';
import RevenueStep from './steps/RevenueStep';
import ObstacleStep from './steps/ObstacleStep';
import CalendlyStep from './steps/CalendlyStep';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  businessType: z.enum(['product', 'service', 'other']).optional(),
  otherBusinessType: z.string().optional(),
  marketingChannels: z.array(z.string()).min(1, 'Please select at least one marketing channel'),
  country: z.string().min(1, 'Please select your country'),
  monthlyBudget: z.string().min(1, 'Please select your monthly budget'),
  website: z.string().url('Please enter a valid URL').or(z.literal('')),
  businessDescription: z.string().min(10, 'Please provide more details about your business'),

  monthlyRevenue: z.number().min(1, 'Monthly revenue must be greater than 0'),
  targetRevenue: z.number().min(1, 'Target revenue must be greater than 0'),

  obstacle: z.string().min(1, 'Please select your biggest challenge'),
  otherObstacle: z.string().optional(),
  startTime: z.string().min(1, 'Please select a consultation time'),
  
}).refine(
  (data) => data.targetRevenue > data.monthlyRevenue,
  {
    message: "Target revenue must be greater than current revenue",
    path: ["targetRevenue"], // This shows the error on the targetRevenue field
  }
);

type FormData = z.infer<typeof formSchema>;

const BookingForm = () => {
  const [step, setStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const totalSteps = 11;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      businessType: undefined,
      otherBusinessType: '',
      marketingChannels: [],
      country: '',
      monthlyBudget: '',
      website: '',
      businessDescription: '',
      monthlyRevenue: 0,
      targetRevenue: 0,
      obstacle: '',
      otherObstacle: '',
      startTime: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      // Submit to Google Sheets
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Redirect to success page
      window.location.href = '/success';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    const currentFields = getFieldsForStep(step);
    
    // Validate current step fields before proceeding
    form.trigger(currentFields).then((isValid) => {
      if (isValid) {
        setStep((prev) => Math.min(prev + 1, totalSteps));
      }
    });
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (stepNumber: number): Array<keyof FormData> => {
    switch (stepNumber) {
      case 1:
        return ['name'];
      case 2:
        return ['email'];
      case 3:
        return ['businessType'];
      case 4:
        return ['marketingChannels'];
      case 5:
        return ['country'];
      case 6:
        return ['monthlyBudget'];
      case 7:
        return ['website'];
      case 8:
        return ['businessDescription'];
      case 9:
        return ['monthlyRevenue', 'targetRevenue'];
      case 10:
        return ['obstacle'];
      case 11:
        return ['startTime'];
      default:
        return [];
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <NameStep form={form} />;
      case 2:
        return <EmailStep form={form} name={form.getValues('name')} />;
      case 3:
        return <BusinessTypeStep form={form} />;
      case 4:
        return <MarketingChannelsStep form={form} />;
      case 5:
        return <CountryStep form={form} />;
      case 6:
        return <MonthlyBudgetStep form={form} />;
      case 7:
        return <WebsiteStep form={form} />;
      case 8:
        return <BusinessDescriptionStep form={form} />;
      case 9:
        return <RevenueStep form={form} />;
      case 10:
        return <ObstacleStep form={form} />;
      case 11:
        return <CalendlyStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="mb-8">
            <div className="flex items-center justify-between gap-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                    i + 1 <= step ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="mt-2 text-sm text-text-light text-center">
              Step {step} of {totalSteps}
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8 gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-outline"
                  disabled={isSubmitting}
                >
                  Back
                </button>
              )}
              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`btn-primary ${step === 1 ? 'w-full' : 'ml-auto'}`}
                  disabled={isSubmitting}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary ml-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm; 