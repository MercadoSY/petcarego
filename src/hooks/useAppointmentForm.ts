import { useState } from 'react';
import type { AppointmentFormData } from '../types';
import { createAppointment } from '../services/api';

/**
 * @description A custom hook to manage the state and submission logic for the appointment form.
 * @param {number} storeId - The ID of the store for which the appointment is being booked.
 */
export const useAppointmentForm = (storeId: number) => {
  const [formData, setFormData] = useState<Omit<AppointmentFormData, 'store_id'>>({
    appointment_date: '',
    owner_name: '',
    owner_email: '',
    owner_phone: '',
    pet_name: '',
    pet_type: '',
    concern: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await createAppointment({ ...formData, store_id: storeId });
      setStatus('success');
      // Reset form on success
      setFormData({
        appointment_date: '',
        owner_name: '',
        owner_email: '',
        owner_phone: '',
        pet_name: '',
        pet_type: '',
        concern: '',
      });
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to book appointment. Please try again.');
      console.error(err);
    }
  };

  const resetForm = () => {
    setStatus('idle');
  };

  return {
    formData,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
};