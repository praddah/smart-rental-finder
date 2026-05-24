import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Property, SearchFilters } from '../types';
import { INITIAL_PROPERTIES } from '../lib/mockData';

interface PropertyState {
  properties: Property[];
  filteredProperties: Property[];
  filters: SearchFilters;
  addProperty: (property: Property) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

const initialFilters: SearchFilters = {
  query: '',
  location: '',
  minPrice: 0,
  maxPrice: 10000,
  bedrooms: 'all',
  amenities: [],
};

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      properties: INITIAL_PROPERTIES,
      filteredProperties: INITIAL_PROPERTIES,
      filters: initialFilters,
      
      addProperty: (property) => {
        set((state) => ({
          properties: [property, ...state.properties],
        }));
        get().setFilters({}); // Re-run filtering
      },

      updateProperty: (updated) => {
        set((state) => ({
          properties: state.properties.map((p) => (p.id === updated.id ? updated : p)),
        }));
        get().setFilters({});
      },

      deleteProperty: (id) => {
        set((state) => ({
          properties: state.properties.filter((p) => p.id !== id),
        }));
        get().setFilters({});
      },

      setFilters: (newFilters) => {
        const filters = { ...get().filters, ...newFilters };
        const { properties } = get();

        const filtered = properties.filter((p) => {
          const matchesQuery = p.title.toLowerCase().includes(filters.query.toLowerCase()) || 
                               p.description.toLowerCase().includes(filters.query.toLowerCase());
          const matchesLocation = !filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase());
          const matchesPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice;
          const matchesBedrooms = filters.bedrooms === 'all' || p.bedrooms.toString() === filters.bedrooms;
          const matchesAmenities = filters.amenities.every((a) => p.amenities.includes(a));

          return matchesQuery && matchesLocation && matchesPrice && matchesBedrooms && matchesAmenities;
        });

        set({ filters, filteredProperties: filtered });
      },

      resetFilters: () => {
        set({ filters: initialFilters, filteredProperties: get().properties });
      },
    }),
    {
      name: 'property-storage',
    }
  )
);