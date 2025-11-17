import { supabase } from '../api/supabaseClient';
import type { Store, StoreWithShopItems, AppointmentFormData } from '../types';

/**
 * @description Fetches a list of all stores from the database.
 * @returns {Promise<Store[]>} A promise that resolves to an array of stores.
 */
export const getStores = async (): Promise<Store[]> => {
  const { data, error } = await supabase.from('stores').select('*');

  if (error) {
    console.error('Error fetching stores:', error);
    throw new Error(error.message);
  }

  return data || [];
};

/**
 * @description Fetches a single store and all its related shop items by its slug.
 * @param {string} slug - The slug of the store to fetch.
 * @returns {Promise<StoreWithShopItems | null>} A promise that resolves to the store with its items.
 */
export const getStoreBySlug = async (slug: string): Promise<StoreWithShopItems | null> => {
    const { data, error } = await supabase
      .from('stores')
      .select('*, shop_items(*)')
      .eq('slug', slug)
      .single();

    if (error) {
        console.error('Error fetching store by slug:', error);
        if (error.code === 'PGRST116') return null; 
        throw new Error(error.message);
    }

    return data;
}

/**
 * @description Submits a new appointment request to the database.
 * @param {AppointmentFormData} appointmentData - The appointment details from the form.
 * @returns {Promise<any>} A promise that resolves with the result of the insertion.
 */
export const createAppointment = async (appointmentData: AppointmentFormData): Promise<any> => {
  const { data, error } = await supabase
    .from('appointments')
    .insert([appointmentData])
    .select();

  if (error) {
    console.error('Error creating appointment:', error);
    throw new Error(error.message);
  }

  return data;
}