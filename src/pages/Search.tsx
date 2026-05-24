import React, { useEffect } from 'react';
import { Search as SearchIcon, MapPin, SlidersHorizontal, Filter, X } from 'lucide-react';
import { usePropertyStore } from '../store/usePropertyStore';
import { PropertyCard } from '../components/property/PropertyCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';

const AMENITIES = [
  { id: 'wifi', label: 'WiFi' },
  { id: 'parking', label: 'Parking' },
  { id: 'security', label: 'Security' },
  { id: 'garden', label: 'Garden' },
  { id: 'electricity', label: 'Electricity' },
  { id: 'water', label: 'Water' },
  { id: 'pool', label: 'Pool' },
];

const Search = () => {
  const { filteredProperties, filters, setFilters, resetFilters } = usePropertyStore();

  useEffect(() => {
    // Re-filter when mounting
    setFilters({});
  }, []);

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    const newAmenities = checked
      ? [...filters.amenities, amenityId]
      : filters.amenities.filter((a) => a !== amenityId);
    setFilters({ amenities: newAmenities });
  };

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Price Range (Monthly)</Label>
        <div className="flex items-center gap-2">
          <Input 
            type="number" 
            placeholder="Min" 
            value={filters.minPrice} 
            onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
            className="h-9"
          />
          <span className="text-muted-foreground">-</span>
          <Input 
            type="number" 
            placeholder="Max" 
            value={filters.maxPrice} 
            onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
            className="h-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Bedrooms</Label>
        <Select value={filters.bedrooms} onValueChange={(v) => setFilters({ bedrooms: v })}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            <SelectItem value="1">1 Bedroom</SelectItem>
            <SelectItem value="2">2 Bedrooms</SelectItem>
            <SelectItem value="3">3 Bedrooms</SelectItem>
            <SelectItem value="4">4+ Bedrooms</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Amenities</Label>
        <div className="grid grid-cols-1 gap-2">
          {AMENITIES.map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`amenity-${amenity.id}`}
                checked={filters.amenities.includes(amenity.id)}
                onCheckedChange={(checked) => handleAmenityChange(amenity.id, !!checked)}
              />
              <Label 
                htmlFor={`amenity-${amenity.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {amenity.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or description..."
              className="pl-10 h-12 text-lg shadow-sm"
              value={filters.query}
              onChange={(e) => setFilters({ query: e.target.value })}
            />
          </div>
          <div className="relative flex-1 md:max-w-xs">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="City, neighborhood..."
              className="pl-10 h-12 text-lg shadow-sm"
              value={filters.location}
              onChange={(e) => setFilters({ location: e.target.value })}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="lg" className="md:hidden">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow down your search</SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <FiltersContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 border rounded-xl p-6 bg-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center">
                  <SlidersHorizontal className="mr-2 h-4 w-4 text-primary" />
                  Filters
                </h3>
              </div>
              <FiltersContent />
            </div>
          </aside>

          {/* Results Area */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {filteredProperties.length} Results Found
              </h2>
              <div className="flex gap-2">
                {filters.location && (
                  <Badge variant="secondary" className="pl-2 pr-1 h-7 flex items-center gap-1">
                    {filters.location}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({ location: '' })} />
                  </Badge>
                )}
                {filters.bedrooms !== 'all' && (
                  <Badge variant="secondary" className="pl-2 pr-1 h-7 flex items-center gap-1">
                    {filters.bedrooms} BR
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({ bedrooms: 'all' })} />
                  </Badge>
                )}
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-3xl">
                <div className="bg-muted p-6 rounded-full mb-4">
                  <SearchIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-6 max-w-xs">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <Button onClick={resetFilters}>Clear All Filters</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Search;