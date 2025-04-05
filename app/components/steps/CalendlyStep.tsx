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
    console.log('Starting to load Calendly script...');
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Calendly script loaded successfully');
    };
    script.onerror = (error) => {
      console.error('Error loading Calendly script:', error);
    };
    document.body.appendChild(script);

    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    link.onload = () => {
      console.log('Calendly CSS loaded successfully');
    };
    link.onerror = (error) => {
      console.error('Error loading Calendly CSS:', error);
    };
    document.head.appendChild(link);

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
          
          if (!e.data.payload || !e.data.payload.event) {
            throw new Error('Invalid event payload structure');
          }

          const eventDetails = e.data.payload.event;
          console.log('Event details:', eventDetails);
          
          const startTime = eventDetails.start_time || eventDetails.startTime;
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

    // Cleanup
    return () => {
      console.log('Cleaning up Calendly resources...');
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
      console.log('Initializing Calendly widget...');
      if (window.Calendly) {
        try {
          const parentElement = document.getElementById('calendly-container');
          if (!parentElement) {
            console.error('Calendly parent element not found, retrying in 100ms...');
            setTimeout(initCalendly, 100);
            return;
          }

          // Use Calendly's inline embed code initialization
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/sovanza/30min',
            parentElement,
          });
          console.log('Calendly widget initialized successfully');
          // Set loaded state after initialization
          setTimeout(() => {
            setIsCalendlyLoaded(true);
            console.log('Calendly widget marked as loaded');
          }, 1000);
        } catch (error) {
          console.error('Error initializing Calendly widget:', error);
        }
      } else {
        console.error('Calendly not available for initialization');
      }
    };

    // Check if Calendly is already loaded
    if (window.Calendly) {
      console.log('Calendly already available, initializing...');
      // Add a small delay to ensure DOM is ready
      setTimeout(initCalendly, 100);
    } else {
      console.log('Waiting for Calendly to load...');
      // If not loaded, wait for script to load
      const timer = setInterval(() => {
        if (window.Calendly) {
          console.log('Calendly detected, initializing...');
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
            id="calendly-container"
            className={`calendly-inline-widget ${!isCalendlyLoaded ? 'opacity-0' : 'opacity-100'}`}
            style={{ 
              minWidth: '320px',
              width: '100%',
              height: '700px',
              overflow: 'hidden',
              transition: 'opacity 0.3s ease-in-out'
            }} 
          ></div>
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