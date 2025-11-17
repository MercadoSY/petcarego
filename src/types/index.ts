/**
 * @description Defines the shape of a ShopItem object.
 */
export interface ShopItem {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  store_id: number;
}

/**
 * @description Defines the shape of a Store object.
 */
export interface Store {
  id: number;
  created_at: string;
  name: string;
  slug: string;
  location: string;
  about_us: string;
  google_maps_url: string;
  appointments_info: string;
}

/**
 * @description Extends the Store type to include its related shop items.
 */
export interface StoreWithShopItems extends Store {
  shop_items: ShopItem[];
}

/**
 * @description Defines the shape of an Appointment object from the database.
 */
export interface Appointment {
  id: number;
  created_at: string;
  store_id: number;
  appointment_date: string;
  owner_name: string;
  owner_email: string;
  owner_phone: string;
  pet_name: string;
  pet_type: string;
  concern: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

/**
 * @description Defines the shape of the data submitted from the appointment form.
 */
export type AppointmentFormData = Omit<Appointment, 'id' | 'created_at' | 'status'>;