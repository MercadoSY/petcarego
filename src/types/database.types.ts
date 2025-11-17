export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          concern: string
          created_at: string
          id: number
          owner_email: string
          owner_name: string
          owner_phone: string
          pet_name: string
          pet_type: string
          status: string
          store_id: number
        }
        Insert: {
          appointment_date: string
          concern: string
          created_at?: string
          id?: number
          owner_email: string
          owner_name: string
          owner_phone: string
          pet_name: string
          pet_type: string
          status?: string
          store_id: number
        }
        Update: {
          appointment_date?: string
          concern?: string
          created_at?: string
          id?: number
          owner_email?: string
          owner_name?: string
          owner_phone?: string
          pet_name?: string
          pet_type?: string
          status?: string
          store_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "appointments_store_id_fkey"
            columns: ["store_id"]
            referencedRelation: "stores"
            referencedColumns: ["id"]
          }
        ]
      }
      shop_items: {
        Row: {
          created_at: string
          description: string
          id: number
          image_url: string
          name: string
          price: number
          store_id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          image_url: string
          name: string
          price: number
          store_id: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          image_url?: string
          name?: string
          price?: number
          store_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "shop_items_store_id_fkey"
            columns: ["store_id"]
            referencedRelation: "stores"
            referencedColumns: ["id"]
          }
        ]
      }
      stores: {
        Row: {
          about_us: string
          appointments_info: string
          created_at: string
          google_maps_url: string
          id: number
          location: string
          name: string
          slug: string
        }
        Insert: {
          about_us: string
          appointments_info: string
          created_at?: string
          google_maps_url: string
          id?: number
          location: string
          name: string
          slug: string
        }
        Update: {
          about_us?: string
          appointments_info?: string
          created_at?: string
          google_maps_url?: string
          id?: number
          location?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}