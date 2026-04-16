import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RideCard from "@/components/RideCard";
import EmptyState from "@/components/EmptyState";
import { mockRides } from "@/data/mockData";
import { Search, MapPin, Calendar, SlidersHorizontal } from "lucide-react";

export default function FindRide() {
  const { isAuthenticated } = useAuth();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");

  if (!isAuthenticated) return <Navigate to="/login" />;

  const activeRides = mockRides.filter((r) => r.status === "active");

  const filteredRides = activeRides.filter((ride) => {
    const matchSource = !source || ride.source.toLowerCase().includes(source.toLowerCase());
    const matchDest = !destination || ride.destination.toLowerCase().includes(destination.toLowerCase());
    const matchDate = !date || ride.date === date;
    return matchSource && matchDest && matchDate;
  });

  const clearFilters = () => {
    setSource("");
    setDestination("");
    setDate("");
  };

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">
          <span className="gradient-text">Find</span> a Ride
        </h1>
        <p className="text-muted-foreground mt-1">
          Search available rides and book your seat
        </p>
      </div>

      {/* Search Filters */}
      <div className="glass-card rounded-2xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Filter Rides</span>
        </div>
        <div className="grid sm:grid-cols-4 gap-3">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
            <Input
              placeholder="From where?"
              className="pl-10"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
            <Input
              placeholder="To where?"
              className="pl-10"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              className="pl-10"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredRides.length} ride{filteredRides.length !== 1 && "s"} found
        </p>
      </div>

      {filteredRides.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Search className="h-7 w-7 text-primary-foreground" />}
          title="No rides found"
          description="Try adjusting your filters or check back later for new rides."
          action={
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          }
        />
      )}
    </div>
  );
}
