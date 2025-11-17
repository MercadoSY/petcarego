import React from 'react';
import AppointmentForm from '../../../components/common/AppointmentForm';
import { useAppointmentForm } from '../../../hooks/useAppointmentForm';
import { useStoreData } from '../../../contexts/StoreContext';

/**
 * @description The themed appointments page for the Seaside store.
 */
const Appointments: React.FC = () => {
  const storeData = useStoreData();
  const formProps = useAppointmentForm(storeData.id);

  return (
    <div className="rounded-lg border border-teal-300 bg-teal-100 p-6">
      <h2 className="mb-4 text-3xl font-bold text-teal-800">Schedule a Visit</h2>
      <p className="mb-8 whitespace-pre-wrap text-teal-700">{storeData.appointments_info}</p>
      
      <AppointmentForm
        {...formProps}
        submitButtonClassName="w-full rounded-md bg-teal-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      />
    </div>
  );
};

export default Appointments;