import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Maximize, MapPin, Sparkles } from 'lucide-react';
import { Property } from '../../types';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="group block">
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-none shadow-sm">
              ${property.price}/mo
            </Badge>
            {property.aiDescription && (
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-none shadow-sm">
                <Sparkles className="mr-1 h-3 w-3" />
                AI Enhanced
              </Badge>
            )}
          </div>
          <Badge className="absolute bottom-3 left-3 bg-black/60 text-white backdrop-blur-sm border-none capitalize">
            {property.type}
          </Badge>
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center text-muted-foreground text-xs mb-1">
            <MapPin className="mr-1 h-3 w-3" />
            {property.location}
          </div>
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
            {property.description}
          </p>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Bed className="mr-1.5 h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-1.5 h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Maximize className="mr-1.5 h-4 w-4" />
                <span>{property.area} <span className="text-[10px]">sqft</span></span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};