import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { usePropertyStore } from '../store/usePropertyStore';
import { PropertyCard } from '../components/property/PropertyCard';
import { motion } from 'framer-motion';

const Home = () => {
  const { properties } = usePropertyStore();
  const featured = properties.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
            >
              Find Your <span className="text-primary">Perfect</span> Home with AI Efficiency
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              The smartest way to rent. Discover verified properties, get AI-powered insights, and connect with landlords directly.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/search">
                <Button size="lg" className="w-full sm:w-auto text-lg h-12 px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Properties
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-12 px-8">
                  View Featured
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </section>

      {/* Stats/Features */}
      <section className="py-16 border-y bg-white dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Smart Search</h3>
                <p className="text-muted-foreground text-sm">Advanced filters to find exactly what you need in seconds.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Verified Listings</h3>
                <p className="text-muted-foreground text-sm">Every property is vetted for accuracy and quality.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Direct Contact</h3>
                <p className="text-muted-foreground text-sm">Communicate with landlords without middlemen or hidden fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold mb-4">Featured Properties</h2>
              <p className="text-muted-foreground">Check out some of our top-rated listings selected just for you.</p>
            </div>
            <Link to="/search" className="hidden md:flex items-center text-primary font-medium hover:underline mt-4 md:mt-0">
              View all listings <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/search">
              <Button variant="outline" className="w-full">
                View all listings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-primary-foreground text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Are You a Landlord?</h2>
              <p className="text-lg opacity-90 mb-10">
                List your property on RentWise and reach thousands of potential tenants. Use our AI tools to create compelling descriptions and manage your listings effortlessly.
              </p>
              <Button size="lg" variant="secondary" className="px-10 h-14 text-lg">
                Start Listing Today
              </Button>
            </div>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;