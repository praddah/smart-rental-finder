export type UserRole = 'tenant' | 'landlord';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  aiDescription?: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'house' | 'apartment' | 'studio' | 'villa';
  images: string[];
  amenities: string[];
  landlordId: string;
  landlordName: string;
  landlordPhone: string;
  landlordEmail: string;
  createdAt: string;
  nearbyServices: {
    type: 'hospital' | 'school' | 'restaurant' | 'mall';
    name: string;
    distance: string;
  }[];
}

export interface SearchFilters {
  query: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  amenities: string[];
}