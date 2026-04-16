import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Car, Users, Shield, Zap, MapPin, ArrowRight, Star } from "lucide-react";
import { popularRoutes } from "@/data/mockData";

export default function Landing() {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Peer-to-Peer",
      description: "No fixed drivers. Any student can offer or book a ride seamlessly.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Students",
      description: "Only verified college students can use the platform for safer rides.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Smart Matching",
      description: "Instantly find rides matching your route, time, and preferences.",
    },
  ];

  const stats = [
    { value: "5,000+", label: "Active Students" },
    { value: "12,000+", label: "Rides Completed" },
    { value: "₹8L+", label: "Money Saved" },
    { value: "4.8", label: "Avg Rating" },
  ];

  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sm font-medium text-primary mb-6">
              <Car className="h-4 w-4" />
              Smart Student Ride Sharing
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Share Rides,{" "}
              <span className="gradient-text">Save Money,</span>
              <br />
              Make Friends
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              The peer-to-peer ride sharing platform built for college students.
              Offer a ride or find one — it&apos;s that simple. Split costs, cut
              commute stress, and travel smarter together.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to={isAuthenticated ? "/find-ride" : "/signup"}>
                <Button size="lg" className="gradient-primary border-0 text-primary-foreground gap-2 text-base px-8">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to={isAuthenticated ? "/offer-ride" : "/login"}>
                <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                  Offer a Ride
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-4 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold mb-3">
            Why Choose <span className="gradient-text">RideConnect</span>?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Built specifically for the student community with safety, affordability, and convenience in mind.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 text-primary-foreground">
                {feature.icon}
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Routes */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold mb-3">Popular Routes</h2>
            <p className="text-muted-foreground">Most frequently shared rides by students</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularRoutes.map((route, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">{route.source}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-destructive" />
                  <span className="text-sm font-medium">{route.destination}</span>
                </div>
                <p className="text-xs text-muted-foreground">{route.rides} rides this week</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="gradient-primary rounded-2xl p-10 md:p-16 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Sharing Rides?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Join thousands of students already saving money and making their commute
            more enjoyable with RideConnect.
          </p>
          <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
            <Button
              size="lg"
              variant="secondary"
              className="text-base font-semibold px-8"
            >
              Join Now — It&apos;s Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
