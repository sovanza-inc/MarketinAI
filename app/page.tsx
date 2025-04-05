'use client';

import React from 'react';
import BookingForm from './components/BookingForm';

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center py-8">
          <h1 className="text-4xl font-heading font-bold text-text-dark mt-20 mb-4">
            Book Your Free Growth Strategy Session
          </h1>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            Schedule your complimentary 30-minute consultation to explore how we can help scale your business with AI-powered marketing solutions.
          </p>
        </div>
        <BookingForm />
      </div>
    </main>
  );
} 