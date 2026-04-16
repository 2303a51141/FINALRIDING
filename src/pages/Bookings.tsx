import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { mockBookings } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EmptyState from "@/components/EmptyState";
import { toast } from "sonner";
import { Bookmark, MapPin, Clock, IndianRupee, X } from "lucide-react";

export default function Bookings() {
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState(mockBookings);

  if (!isAuthenticated) return <Navigate to="/login" />;

  const handleCancel = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
    );
    toast.success("Booking cancelled");
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success/10 text-success border-success/20";
      case "completed":
        return "bg-primary/10 text-primary border-primary/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "";
    }
  };

  return (
    <div className="page-transition max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">
          My <span className="gradient-text">Bookings</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your ride bookings and travel history
        </p>
      </div>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="glass-card rounded-xl p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={statusColor(booking.status)}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Booked on {new Date(booking.bookedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-success shrink-0" />
                    <span className="text-sm">{booking.ride.source}</span>
                    <span className="text-muted-foreground">→</span>
                    <MapPin className="h-4 w-4 text-destructive shrink-0" />
                    <span className="text-sm">{booking.ride.destination}</span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {booking.ride.date} · {booking.ride.time}
                    </span>
                    <span>{booking.seatsBooked} seat{booking.seatsBooked > 1 && "s"}</span>
                    <span className="flex items-center gap-1 font-semibold text-foreground">
                      <IndianRupee className="h-3.5 w-3.5" />
                      {booking.totalPrice}
                    </span>
                  </div>
                </div>

                {booking.status === "confirmed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={() => handleCancel(booking.id)}
                  >
                    <X className="h-3.5 w-3.5 mr-1" /> Cancel
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bookmark className="h-7 w-7 text-primary-foreground" />}
          title="No bookings yet"
          description="When you book a ride, it will appear here."
        />
      )}
    </div>
  );
}
