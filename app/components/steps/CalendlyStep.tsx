'use client';

import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormStep from '../FormStep';

interface CalendlyStepProps {
  form: UseFormReturn<any>;
}

declare global {
  interface Window {
    Calendly: any;
  }
}

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    <p className="text-gray-600">Loading calendar...</p>
  </div>
);

const CalendlyStep: React.FC<CalendlyStepProps> = ({ form }) => {
  const { setValue } = form;
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<string>('');
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add Calendly event listener
    const handleCalendlyEvent = (e: any) => {
      if (e.data.event === 'calendly.event_scheduled') {
        try {
          const eventDetails = e.data.payload.event;
          const startTime = eventDetails.start_time || eventDetails.startTime;
          
          if (!startTime) {
            throw new Error('No start time provided in event payload');
          }

          const scheduledDate = new Date(startTime);
          
          if (isNaN(scheduledDate.getTime())) {
            throw new Error('Invalid date format received');
          }

          // Format date in a simpler format
          const formattedDate = scheduledDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });

          // Format time separately
          const formattedTime = scheduledDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });

          const formattedDateTime = `${formattedDate} at ${formattedTime}`;

          setValue('startTime', formattedDateTime, { shouldValidate: true });
          setScheduledTime(formattedDateTime);
          setIsScheduled(true);
        } catch (error) {
          console.error('Error handling Calendly event:', error);
          setValue('startTime', 'Scheduled - Check your email for details', { shouldValidate: true });
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    // Cleanup
    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [setValue]);

  useEffect(() => {
    // Initialize Calendly widget after script loads
    const initCalendly = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/sovanza/30min',
          parentElement: document.querySelector('.calendly-inline-widget'),
          prefill: {},
          utm: {}
        });
        // Set loaded state after initialization
        setTimeout(() => setIsCalendlyLoaded(true), 1000);
      }
    };

    // Check if Calendly is already loaded
    if (window.Calendly) {
      initCalendly();
    } else {
      // If not loaded, wait for script to load
      const timer = setInterval(() => {
        if (window.Calendly) {
          initCalendly();
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, []);

  return (
    <FormStep
      title="Schedule Your Consultation"
      subtitle="Choose a time that works best for you"
    >
      <div className="space-y-6">
        <div className="relative">
          {!isCalendlyLoaded && <LoadingSpinner />}
          <div 
            className={`calendly-inline-widget ${!isCalendlyLoaded ? 'opacity-0' : 'opacity-100'}`}
            style={{ 
              minWidth: '320px',
              width: '100%',
              height: '700px',
              overflow: 'hidden',
              transition: 'opacity 0.3s ease-in-out'
            }} 
          />
        </div>
        {isScheduled && (
          <p className="text-green-600 text-center font-medium">
            ✓ Consultation scheduled successfully for {scheduledTime}!
          </p>
        )}
      </div>
    </FormStep>
  );
};

export default CalendlyStep; 