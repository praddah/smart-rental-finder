import { Property } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Minimalist Luxury Villa',
    description: 'A stunning luxury villa featuring contemporary architecture, an open-concept layout, and premium finishes throughout.',
    aiDescription: 'Experience the pinnacle of modern living in this architectural masterpiece. This sun-drenched villa boasts seamless indoor-outdoor integration, perfect for both relaxation and entertaining. The expansive garden and private pool offer a serene oasis, while the minimalist interior provides a sophisticated backdrop for any lifestyle. High-end amenities including security systems and high-speed WiFi ensure comfort and peace of mind.',
    price: 4500,
    location: 'Beverly Hills, CA',
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    type: 'villa',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/95a4093b-6f73-42cf-a734-84a25d7fd3f6/luxury-villa-exterior-b8427d8b-1779621285711.webp'],
    amenities: ['wifi', 'parking', 'security', 'garden', 'pool'],
    landlordId: 'l1',
    landlordName: 'John Smith',
    landlordPhone: '+1 (555) 123-4567',
    landlordEmail: 'john@example.com',
    createdAt: new Date().toISOString(),
    nearbyServices: [
      { type: 'hospital', name: 'Cedars-Sinai Medical Center', distance: '1.2 miles' },
      { type: 'school', name: 'Beverly Hills High School', distance: '0.8 miles' },
      { type: 'restaurant', name: 'The Ivy', distance: '0.5 miles' }
    ]
  },
  {
    id: '2',
    title: 'Cozy Scandinavian Apartment',
    description: 'Beautifully designed apartment with a focus on light, simplicity, and functionality. Located in a vibrant city center.',
    aiDescription: 'Discover urban serenity in this light-filled Scandinavian gem. Every inch of this apartment has been thoughtfully designed to maximize space and comfort. The large windows offer breathtaking city views while flooding the home with natural light. Ideal for young professionals or couples, this space combines modern aesthetics with everyday practicality, featuring top-tier electricity and water systems.',
    price: 2200,
    location: 'Seattle, WA',
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    type: 'apartment',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/95a4093b-6f73-42cf-a734-84a25d7fd3f6/modern-apartment-interior-b8e9d2f8-1779621286858.webp'],
    amenities: ['wifi', 'parking', 'electricity', 'water'],
    landlordId: 'l2',
    landlordName: 'Sarah Jenkins',
    landlordPhone: '+1 (555) 987-6543',
    landlordEmail: 'sarah@example.com',
    createdAt: new Date().toISOString(),
    nearbyServices: [
      { type: 'hospital', name: 'Virginia Mason Hospital', distance: '0.6 miles' },
      { type: 'school', name: 'University of Washington', distance: '2.5 miles' },
      { type: 'restaurant', name: 'The Pink Door', distance: '0.3 miles' }
    ]
  },
  {
    id: '3',
    title: 'Charming Family Suburban House',
    description: 'Perfect family home with a spacious backyard, white picket fence, and located in a safe, friendly neighborhood.',
    aiDescription: 'Welcome to your dream family retreat. This charming suburban home offers the perfect balance of traditional warmth and modern convenience. The spacious backyard and secure garden provide a safe haven for children and pets alike. Located in a highly sought-after school district with convenient access to local parks and shopping, this house is ready to become your forever home.',
    price: 3100,
    location: 'Austin, TX',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: 'house',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/95a4093b-6f73-42cf-a734-84a25d7fd3f6/family-suburban-house-f0e41de0-1779621286440.webp'],
    amenities: ['parking', 'security', 'garden', 'water'],
    landlordId: 'l1',
    landlordName: 'John Smith',
    landlordPhone: '+1 (555) 123-4567',
    landlordEmail: 'john@example.com',
    createdAt: new Date().toISOString(),
    nearbyServices: [
      { type: 'hospital', name: "St. David's Medical Center", distance: '2.0 miles' },
      { type: 'school', name: 'Austin High School', distance: '1.1 miles' },
      { type: 'mall', name: 'The Domain', distance: '3.5 miles' }
    ]
  },
  {
    id: '4',
    title: 'Industrial Modern Studio Loft',
    description: 'Unique industrial-style loft with exposed brick, high ceilings, and an open floor plan in a converted warehouse.',
    aiDescription: 'Embrace the character of industrial chic in this stunning loft studio. With its soaring ceilings and authentic brickwork, this space offers an unparalleled creative atmosphere. The open floor plan allows for versatile living arrangements, while the large industrial windows provide a steady stream of natural light. Perfect for those who appreciate history blended with contemporary design.',
    price: 1800,
    location: 'Brooklyn, NY',
    bedrooms: 1,
    bathrooms: 1,
    area: 700,
    type: 'studio',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/95a4093b-6f73-42cf-a734-84a25d7fd3f6/industrial-studio-loft-2721c6da-1779621287254.webp'],
    amenities: ['wifi', 'security', 'electricity'],
    landlordId: 'l3',
    landlordName: 'Mike Ross',
    landlordPhone: '+1 (555) 333-4444',
    landlordEmail: 'mike@example.com',
    createdAt: new Date().toISOString(),
    nearbyServices: [
      { type: 'hospital', name: 'Brooklyn Hospital Center', distance: '0.9 miles' },
      { type: 'school', name: 'Pratt Institute', distance: '0.4 miles' },
      { type: 'restaurant', name: 'Diner', distance: '0.2 miles' }
    ]
  },
  {
    id: '5',
    title: 'Sunset Beachfront Cottage',
    description: 'Escape to this beautiful beachfront cottage with a private deck and direct access to the ocean.',
    aiDescription: 'Awaken to the sound of crashing waves in this idyllic beachfront sanctuary. This cottage offers a rare opportunity to live directly on the sand, with a private wooden deck perfect for watching the sunset over the horizon. The interior is light and airy, capturing the essence of coastal living. A true paradise for water lovers seeking peace and tranquility.',
    price: 3800,
    location: 'Malibu, CA',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'house',
    images: ['https://storage.googleapis.com/dala-prod-public-storage/generated-images/95a4093b-6f73-42cf-a734-84a25d7fd3f6/beachfront-cottage-23463627-1779621286376.webp'],
    amenities: ['wifi', 'parking', 'security', 'garden', 'water'],
    landlordId: 'l2',
    landlordName: 'Sarah Jenkins',
    landlordPhone: '+1 (555) 987-6543',
    landlordEmail: 'sarah@example.com',
    createdAt: new Date().toISOString(),
    nearbyServices: [
      { type: 'hospital', name: 'UCLA Health Malibu', distance: '1.5 miles' },
      { type: 'school', name: 'Pepperdine University', distance: '2.2 miles' },
      { type: 'restaurant', name: 'Nobu Malibu', distance: '0.7 miles' }
    ]
  }
];