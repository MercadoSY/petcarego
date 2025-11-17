import React from 'react';

interface AppointmentFormProps {
  formData: {
    appointment_date: string;
    owner_name: string;
    owner_email: string;
    owner_phone: string;
    pet_name: string;
    pet_type: string;
    concern: string;
  };
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  // Allow passing custom class names for styling key elements
  submitButtonClassName?: string;
  successMessageClassName?: string;
  successButtonClassName?: string;
}

/**
 * @description A reusable, unstyled form component for booking appointments.
 */
const AppointmentForm: React.FC<AppointmentFormProps> = ({
  formData,
  status,
  errorMessage,
  handleChange,
  handleSubmit,
  resetForm,
  submitButtonClassName = 'w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-base font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400',
  successMessageClassName = 'rounded-lg bg-green-50 p-8 text-center shadow-md',
  successButtonClassName = 'mt-8 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
}) => {
  const today = new Date().toISOString().split('T')[0];

  if (status === 'success') {
    return (
      <div className={successMessageClassName}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="mt-5 text-3xl font-bold text-green-800">Appointment Requested!</h2>
        <p className="mt-3 text-green-700">Thank you! The clinic will contact you shortly to confirm your booking.</p>
        <button
          onClick={resetForm}
          className={successButtonClassName}
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  const inputClassName = "mt-1 block w-full rounded-lg border border-gray-300 bg-white p-3 shadow-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600";
  const labelClassName = "block text-sm font-medium text-gray-900";

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
      {/* Appointment Date */}
      <div>
        <label htmlFor="appointment_date" className={labelClassName}>Preferred Date</label>
        <input
          type="date"
          id="appointment_date"
          name="appointment_date"
          min={today}
          value={formData.appointment_date}
          onChange={handleChange}
          required
          className={inputClassName}
        />
      </div>

      {/* Owner Info */}
      <fieldset className="rounded-lg border p-4">
        <legend className="px-2 text-base font-semibold text-gray-900">Owner Information</legend>
        <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="owner_name" className={labelClassName}>Your Name</label>
                  <input type="text" id="owner_name" name="owner_name" value={formData.owner_name} onChange={handleChange} required className={inputClassName} placeholder="Enter your full name"/>
                </div>
                <div>
                  <label htmlFor="owner_email" className={labelClassName}>Email</label>
                  <input type="email" id="owner_email" name="owner_email" value={formData.owner_email} onChange={handleChange} required className={inputClassName} placeholder="name@example.com"/>
                </div>
            </div>
            <div>
              <label htmlFor="owner_phone" className={labelClassName}>Phone Number</label>
              <input type="tel" id="owner_phone" name="owner_phone" value={formData.owner_phone} onChange={handleChange} required className={inputClassName} placeholder="e.g., (123) 456-7890"/>
            </div>
        </div>
      </fieldset>
      
      {/* Pet Info */}
      <fieldset className="rounded-lg border p-4">
        <legend className="px-2 text-base font-semibold text-gray-900">Pet Information</legend>
        <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="pet_name" className={labelClassName}>Pet's Name</label>
                  <input type="text" id="pet_name" name="pet_name" value={formData.pet_name} onChange={handleChange} required className={inputClassName} placeholder="e.g., Buddy"/>
                </div>
                <div>
                  <label htmlFor="pet_type" className={labelClassName}>Pet Type</label>
                  <input type="text" id="pet_type" name="pet_type" value={formData.pet_type} onChange={handleChange} required placeholder="e.g., Dog, Cat" className={inputClassName}/>
                </div>
            </div>
        </div>
      </fieldset>

      {/* Concern */}
      <div>
        <label htmlFor="concern" className={labelClassName}>Reason for Visit</label>
        <textarea id="concern" name="concern" rows={4} value={formData.concern} onChange={handleChange} required className={inputClassName} placeholder="Briefly describe the reason for your visit."></textarea>
      </div>

      {/* Submission */}
      <div>
        {status === 'error' && <p className="mb-4 text-center text-red-600">{errorMessage}</p>}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={submitButtonClassName}
        >
          {status === 'submitting' ? 'Submitting...' : 'Request Appointment'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;