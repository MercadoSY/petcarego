import React from 'react';
import AppointmentForm from '../../../components/common/AppointmentForm';
import { useAppointmentForm } from '../../../hooks/useAppointmentForm';
import { useStoreData } from '../../../contexts/StoreContext';

/**
 * @description The themed appointments page for the Happy Paws store.
 */
const Appointments: React.FC = () => {
  const storeData = useStoreData();
  // Use the custom hook to get all form logic and state
  const formProps = useAppointmentForm(storeData.id);

  return (
    <div className="rounded-lg border border-green-300 bg-green-200 p-6">
      <h2 className="mb-4 text-3xl font-bold text-green-800">Book an Appointment</h2>
      <p className="mb-8 whitespace-pre-wrap text-green-700">{storeData.appointments_info}</p>
      
      <AppointmentForm
        {...formProps}
        submitButtonClassName="w-full rounded-lg bg-yellow-500 px-5 py-3 text-center text-base font-semibold text-yellow-900 shadow-md transition hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
      />
    </div>
  );
};

export default Appointments;