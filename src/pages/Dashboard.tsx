import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { usePropertyStore } from '../store/usePropertyStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { 
  Plus, 
  Trash2, 
  Settings, 
  Eye, 
  Sparkles, 
  Loader2, 
  Wifi, 
  Shield, 
  Car, 
  Waves, 
  Zap, 
  Droplet, 
  TreePine,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { toast } from 'sonner';
import { Link, Navigate } from 'react-router-dom';
import { Checkbox } from '../components/ui/checkbox';
import { Property } from '../types';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { properties, addProperty, deleteProperty } = usePropertyStore();
  const [isAdding, setIsAdding] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiDescription, setAiDescription] = useState('');

  if (!isAuthenticated || user?.role !== 'landlord') {
    return <Navigate to="/" replace />;
  }

  const myProperties = properties.filter((p) => p.landlordId === user.id);

  const handleGenerateAI = async (formData: FormData) => {
    setIsGeneratingAI(true);
    const title = formData.get('title') as string;
    const location = formData.get('location') as string;
    const bedrooms = formData.get('bedrooms') as string;
    
    // Simulate AI Generation
    setTimeout(() => {
      const generated = `Experience luxury living in this exceptional ${bedrooms}-bedroom property located in the heart of ${location}. ${title} offers a perfect blend of style and comfort, featuring top-tier amenities and a meticulously designed interior. Ideal for those who value privacy and sophistication, this residence provides a serene escape while keeping you connected to everything the city has to offer. Built with quality and attention to detail, it's more than just a house—it's a lifestyle statement.`;
      setAiDescription(generated);
      setIsGeneratingAI(false);
      toast.success('AI Description Generated!');
    }, 1500);
  };

  const handleAddProperty = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const amenities: string[] = [];
    ['wifi', 'parking', 'security', 'garden', 'electricity', 'water'].forEach(a => {
      if (formData.get(a)) amenities.push(a);
    });

    const newProp: Property = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      aiDescription: aiDescription || undefined,
      price: Number(formData.get('price')),
      location: formData.get('location') as string,
      bedrooms: Number(formData.get('bedrooms')),
      bathrooms: Number(formData.get('bathrooms')),
      area: Number(formData.get('area')),
      type: 'house',
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000'],
      amenities,
      landlordId: user.id,
      landlordName: user.name,
      landlordPhone: '+1 (555) 000-0000',
      landlordEmail: user.email,
      createdAt: new Date().toISOString(),
      nearbyServices: [
        { type: 'hospital', name: 'General Hospital', distance: '1.0 mile' },
        { type: 'school', name: 'Primary School', distance: '0.5 mile' },
      ],
    };

    addProperty(newProp);
    setIsAdding(false);
    setAiDescription('');
    toast.success('Property listed successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
          <p className="text-muted-foreground">Manage your listings and track interest.</p>
        </div>
        
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogTrigger asChild>
            <Button size="lg" className="h-12 px-6 shadow-lg shadow-primary/20">
              <Plus className="mr-2 h-5 w-5" />
              List New Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Property Details</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddProperty} className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input id="title" name="title" placeholder="Modern 3-Bedroom Villa" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" placeholder="City, Area" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Rent ($)</Label>
                  <Input id="price" name="price" type="number" placeholder="2500" required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Beds</Label>
                    <Input id="bedrooms" name="bedrooms" type="number" placeholder="3" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Baths</Label>
                    <Input id="bathrooms" name="bathrooms" type="number" placeholder="2" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (sqft)</Label>
                    <Input id="area" name="area" type="number" placeholder="1200" required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Original Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  placeholder="Describe your property..." 
                  className="min-h-[100px]"
                  required 
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border-2 border-dashed border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-primary font-bold flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI Description Generator
                  </Label>
                  <Button 
                    type="button" 
                    variant="secondary" 
                    size="sm"
                    disabled={isGeneratingAI}
                    onClick={() => {
                      const form = document.querySelector('form') as HTMLFormElement;
                      handleGenerateAI(new FormData(form));
                    }}
                  >
                    {isGeneratingAI ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                    Generate with AI
                  </Button>
                </div>
                {aiDescription && (
                  <div className="bg-white dark:bg-black p-4 rounded-xl border text-sm italic text-muted-foreground animate-in fade-in slide-in-from-top-2">
                    {aiDescription}
                  </div>
                )}
                {!aiDescription && (
                  <p className="text-xs text-muted-foreground text-center">
                    Fill in basic details above and click generate to create a compelling AI description.
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { id: 'wifi', label: 'WiFi', icon: <Wifi className="h-4 w-4" /> },
                    { id: 'parking', label: 'Parking', icon: <Car className="h-4 w-4" /> },
                    { id: 'security', label: 'Security', icon: <Shield className="h-4 w-4" /> },
                    { id: 'garden', label: 'Garden', icon: <TreePine className="h-4 w-4" /> },
                    { id: 'electricity', label: 'Electricity', icon: <Zap className="h-4 w-4" /> },
                    { id: 'water', label: 'Water', icon: <Droplet className="h-4 w-4" /> },
                  ].map((a) => (
                    <div key={a.id} className="flex items-center space-x-2">
                      <Checkbox id={a.id} name={a.id} />
                      <Label htmlFor={a.id} className="flex items-center gap-1.5 text-sm font-normal">
                        {a.icon}
                        {a.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="w-full h-12">Submit Listing</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="rounded-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Stats Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-primary/5 rounded-xl">
                <span className="text-sm">Active Listings</span>
                <span className="text-xl font-bold">{myProperties.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-500/5 rounded-xl">
                <span className="text-sm">Total Inquiries</span>
                <span className="text-xl font-bold text-blue-600">0</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="rounded-2xl bg-slate-900 text-white">
            <CardHeader>
              <CardTitle className="text-lg">Premium Support</CardTitle>
              <CardDescription className="text-slate-400">Need help with your listings?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Contact Advisor</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold mb-6">Your Listings</h2>
          {myProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myProperties.map((p) => (
                <Card key={p.id} className="overflow-hidden group rounded-2xl">
                  <div className="relative aspect-video">
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Link to={`/property/${p.id}`}>
                        <Button size="sm" variant="secondary"><Eye className="h-4 w-4 mr-1" /> View</Button>
                      </Link>
                      <Button size="sm" variant="destructive" onClick={() => {
                        deleteProperty(p.id);
                        toast.success('Property deleted');
                      }}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold line-clamp-1">{p.title}</h3>
                      <Badge variant="secondary">${p.price}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> {p.location}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-3 w-3 mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="w-10 px-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-card border-2 border-dashed rounded-3xl p-20 text-center">
              <Plus className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
              <h3 className="text-lg font-semibold">No listings yet</h3>
              <p className="text-muted-foreground mb-6">Start your journey by adding your first property.</p>
              <Button onClick={() => setIsAdding(true)}>Create Listing</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;