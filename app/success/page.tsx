export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <svg
              className="w-20 h-20 text-primary mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You for Booking!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We've received your booking request and will be in touch shortly to confirm your consultation time.
          </p>
          <p className="text-gray-500">
            Please check your email for further instructions. If you don't receive an email within the next few minutes, please check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
} 