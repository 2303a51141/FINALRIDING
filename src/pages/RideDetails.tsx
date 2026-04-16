import { useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockRides } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  MapPin,
  Clock,
  Users,
  IndianRupee,
  Star,
  Car,
  MessageSquare,
  ArrowLeft,
  Minus,
  Plus,
} from "lucide-react";

export default function RideDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [seats, setSeats] = useState(1);
  const [booking, setBooking] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const ride = mockRides.find((r) => r.id === id);

  if (!ride) {
    return (
      <div className="page-transition max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="font-heading text-2xl font-bold mb-2">Ride Not Found</h2>
        <p className="text-muted-foreground mb-6">This ride may have been removed or doesn&apos;t exist.</p>
        <Button onClick={() => navigate("/find-ride")}>Browse Rides</Button>
      </div>
    );
  }

  const handleBook = async () => {
    setBooking(true);
    await new Promise((r) => setTimeout(r, 1000));
    setBooking(false);
    toast.success(`Booked ${seats} seat${seats > 1 ? "s" : ""} successfully!`);
    navigate("/bookings");
  };

  return (
    <div className="page-transition max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="gradient-primary p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center font-semibold text-primary-foreground">
                {ride.driverAvatar}
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">{ride.driverName}</p>
                <div className="flex items-center gap-1 text-primary-foreground/80 text-sm">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  {ride.driverRating} rating
                </div>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-primary-foreground/20 text-primary-foreground border-0"
            >
              {ride.status === "active" ? "Active" : ride.status}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-primary-foreground" />
              <div className="w-0.5 h-10 bg-primary-foreground/40" />
              <div className="h-3 w-3 rounded-full bg-primary-foreground/60" />
            </div>
            <div className="space-y-5 flex-1">
              <div>
                <p className="text-xs text-primary-foreground/60">Pickup</p>
                <p className="font-semibold text-primary-foreground text-lg">{ride.source}</p>
              </div>
              <div>
                <p className="text-xs text-primary-foreground/60">Drop-off</p>
                <p className="font-semibold text-primary-foreground text-lg">{ride.destination}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Date & Time</p>
              <p className="text-sm font-semibold">{ride.date}</p>
              <p className="text-sm font-semibold">{ride.time}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Users className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Seats Available</p>
              <p className="text-sm font-semibold">{ride.availableSeats} / {ride.totalSeats}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <IndianRupee className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Price/Seat</p>
              <p className="text-sm font-semibold">₹{ride.pricePerSeat}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Car className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Vehicle</p>
              <p className="text-sm font-semibold">{ride.vehicle}</p>
            </div>
          </div>

          {ride.notes && (
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">Driver&apos;s Note</p>
              </div>
              <p className="text-sm text-muted-foreground">{ride.notes}</p>
            </div>
          )}

          {/* Booking */}
          {ride.availableSeats > 0 && ride.status === "active" && (
            <div className="border-t border-border pt-6">
              <h3 className="font-heading font-semibold mb-4">Book This Ride</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Number of seats</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSeats(Math.max(1, seats - 1))}
                    disabled={seats <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-semibold w-8 text-center">{seats}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSeats(Math.min(ride.availableSeats, seats + 1))}
                    disabled={seats >= ride.availableSeats}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">Total Price</span>
                <span className="font-heading text-2xl font-bold gradient-text">
                  ₹{seats * ride.pricePerSeat}
                </span>
              </div>
              <Button
                className="w-full gradient-primary border-0 text-primary-foreground"
                size="lg"
                onClick={handleBook}
                disabled={booking}
              >
                {booking ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
