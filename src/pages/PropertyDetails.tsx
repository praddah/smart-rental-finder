import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Bed, Bath, Maximize, MapPin, Sparkles, Calendar, User, 
  Phone, Mail, CheckCircle2, ChevronLeft, Building2, 
  Heart, Share2, School, Hospital, Utensils, ShoppingBag
} from 'lucide-react';
import { usePropertyStore } from '../store/usePropertyStore';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { properties } = usePropertyStore();
  const property = properties.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <Link to="/search">
          <Button>Back to Search</Button>
        </Link>
      </div>
    );
  }

  const amenityIcons: Record<string, any> = {
    wifi: <Sparkles className="h-4 w-4" />,
    parking: <MapPin className="h-4 w-4" />,
    security: <CheckCircle2 className="h-4 w-4" />,
    garden: <CheckCircle2 className="h-4 w-4" />,
    electricity: <CheckCircle2 className="h-4 w-4" />,
    water: <CheckCircle2 className="h-4 w-4" />,
    pool: <Sparkles className="h-4 w-4" />,
  };

  const serviceIcons: Record<string, any> = {
    school: <School className="h-5 w-5 text-blue-500" />,
    hospital: <Hospital className="h-5 w-5 text-red-500" />,
    restaurant: <Utensils className="h-5 w-5 text-orange-500" />,
    mall: <ShoppingBag className="h-5 w-5 text-purple-500" />,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/search" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Results
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Media & Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg">
              <img
                src={property.images[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full bg-white/90 backdrop-blur shadow-sm">
                  <Heart className="h-5 w-5 text-red-500" />
                </Button>
                <Button variant="secondary" size="icon" className="rounded-full bg-white/90 backdrop-blur shadow-sm">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            {property.images.length > 1 && (
              <div className="grid grid-cols-5 gap-4">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-none capitalize">
                  {property.type}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  Listed {new Date(property.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{property.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-1.5 h-4 w-4" />
                {property.location}
              </div>
            </div>
            <div className="bg-card border rounded-2xl p-4 md:text-right shadow-sm">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Monthly Rent</p>
              <p className="text-3xl font-bold text-primary">${property.price}</p>
            </div>
          </div>

          <Separator />

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border">
              <div className="bg-white dark:bg-black p-2 rounded-xl shadow-sm">
                <Bed className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Bedrooms</p>
                <p className="font-bold">{property.bedrooms} Units</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border">
              <div className="bg-white dark:bg-black p-2 rounded-xl shadow-sm">
                <Bath className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Bathrooms</p>
                <p className="font-bold">{property.bathrooms} Units</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border">
              <div className="bg-white dark:bg-black p-2 rounded-xl shadow-sm">
                <Maximize className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Area</p>
                <p className="font-bold">{property.area} sqft</p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-12 bg-slate-100 dark:bg-slate-900">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ai-desc">AI Insights</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="nearby">Nearby</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6 space-y-4">
              <h3 className="text-xl font-bold">Property Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {property.description}
              </p>
            </TabsContent>
            
            <TabsContent value="ai-desc" className="mt-6 space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6 relative overflow-hidden">
                <Sparkles className="absolute -top-4 -right-4 h-24 w-24 text-primary/10 rotate-12" />
                <h3 className="text-xl font-bold flex items-center mb-4">
                  <Sparkles className="mr-2 h-5 w-5 text-primary" />
                  AI-Generated Highlights
                </h3>
                <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed relative z-10">
                  "{property.aiDescription || "No AI description available for this listing."}"
                </p>
                <div className="mt-6 flex gap-2">
                  <Badge variant="outline" className="bg-white dark:bg-black">Expertly Curated</Badge>
                  <Badge variant="outline" className="bg-white dark:bg-black">High Value</Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="mt-6">
              <h3 className="text-xl font-bold mb-6">Offered Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 p-3 border rounded-xl capitalize">
                    <div className="bg-primary/10 p-1.5 rounded-lg text-primary">
                      {amenityIcons[amenity] || <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nearby" className="mt-6">
              <h3 className="text-xl font-bold mb-6">Nearby Services & POI</h3>
              <div className="grid gap-4">
                {property.nearbyServices.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-2xl bg-card hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white dark:bg-black rounded-xl shadow-sm border">
                        {serviceIcons[service.type]}
                      </div>
                      <div>
                        <p className="font-bold">{service.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{service.type}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-mono">{service.distance}</Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Contact Card */}
        <div className="space-y-6">
          <Card className="sticky top-24 border shadow-xl overflow-hidden rounded-3xl">
            <div className="bg-primary p-6 text-primary-foreground text-center">
              <h3 className="text-lg font-bold">Interested?</h3>
              <p className="text-sm opacity-90">Contact the landlord for a viewing</p>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-primary/20">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Property Owner</p>
                  <p className="text-lg font-bold">{property.landlordName}</p>
                  <Badge variant="outline" className="mt-1 text-[10px] h-5">VERIFIED LANDLORD</Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full h-12 text-lg" asChild>
                  <a href={`tel:${property.landlordPhone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Landlord
                  </a>
                </Button>
                <Button variant="outline" className="w-full h-12 text-lg" asChild>
                  <a href={`mailto:${property.landlordEmail}`}>
                    <Mail className="mr-2 h-5 w-5" />
                    Send Message
                  </a>
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <p className="text-sm font-semibold">Location Map</p>
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-dashed flex items-center justify-center text-center p-6 text-muted-foreground overflow-hidden relative">
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {/* Mock map pattern */}
                    <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  </div>
                  <div className="relative z-10">
                    <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-xs">Interactive Map Visualization<br/>(Coming Soon)</p>
                    <Badge variant="secondary" className="mt-4">{property.location}</Badge>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-center text-muted-foreground pt-4">
                ID: {property.id} • Posted on RentWise
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;