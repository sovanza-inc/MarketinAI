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
    // Add Calendly event listener
    const handleCalendlyEvent = (e: any) => {
      console.log('Received message event:', e.data);
      
      if (!e.data) {
        console.error('No event data received');
        return;
      }

      if (e.data.event && e.data.event.indexOf('calendly.') === 0) {
        console.log('Calendly event received:', e.data.event);
      }

      if (e.data.event === 'calendly.event_scheduled') {
        try {
          console.log('Calendly event scheduled:', e.data.payload);
          
          if (!e.data.payload || !e.data.payload.invitee) {
            throw new Error('Invalid event payload structure');
          }

          const eventDetails = e.data.payload;
          console.log('Event details:', eventDetails);
          
          const startTime = eventDetails.invitee.start_time || eventDetails.event.start_time;
          console.log('Start time:', startTime);
          
          if (!startTime) {
            throw new Error('No start time provided in event payload');
          }

          const scheduledDate = new Date(startTime);
          
          if (isNaN(scheduledDate.getTime())) {
            throw new Error('Invalid date format received');
          }

          // Format date in a simpler format
          const formattedDate = scheduledDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });

          // Format time separately
          const formattedTime = scheduledDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });

          const formattedDateTime = `${formattedDate} at ${formattedTime}`;
          console.log('Formatted date time:', formattedDateTime);

          setValue('startTime', formattedDateTime, { shouldValidate: true });
          setScheduledTime(formattedDateTime);
          setIsScheduled(true);
        } catch (error) {
          console.error('Error handling Calendly event:', error);
          // Set a fallback value to allow form submission
          setValue('startTime', 'Scheduled - Check your email for details', { shouldValidate: true });
          setIsScheduled(true);
        }
      }
    };

    window.addEventListener('message', handleCalendlyEvent);

    // Load Calendly script
    const head = document.head;
    const script = document.createElement('script');
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      console.log('Calendly script loaded');
      setIsCalendlyLoaded(true);
    };
    head.appendChild(script);

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
      if (head.contains(script)) {
        head.removeChild(script);
      }
    };
  }, [setValue]);

  return (
    <FormStep
      title="Schedule Your Consultation"
      subtitle="Choose a time that works best for you"
    >
      <div className="space-y-6">
        <div className="relative">
          {!isCalendlyLoaded && <LoadingSpinner />}
          <div 
            className={`${!isCalendlyLoaded ? 'opacity-0' : 'opacity-100'}`}
            style={{ 
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            {/* Calendly inline widget embed code */}
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/sovanza/30min"
              style={{ 
                minWidth: '320px',
                width: '100%',
                height: '700px',
              }}
            ></div>
          </div>
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