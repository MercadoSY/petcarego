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
    <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
      <h2 className="mb-4 text-3xl font-bold text-sky-800 md:text-4xl">Schedule a Visit</h2>
      <p className="mb-8 text-base leading-relaxed text-gray-700 md:text-lg">
        {storeData.appointments_info}
      </p>

      <AppointmentForm
        {...formProps}
        submitButtonClassName="w-full rounded-md bg-sky-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      />
    </div>
  );
};

export default Appointments;