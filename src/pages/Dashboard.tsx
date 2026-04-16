import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Car, Search, MapPin, Clock, TrendingUp, Bookmark } from "lucide-react";
import { mockRides, mockBookings } from "@/data/mockData";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  const activeRides = mockRides.filter((r) => r.status === "active").length;
  const activeBookings = mockBookings.filter((b) => b.status === "confirmed").length;

  const quickStats = [
    { icon: <Car className="h-5 w-5" />, label: "Rides Offered", value: user!.ridesOffered },
    { icon: <Bookmark className="h-5 w-5" />, label: "Rides Taken", value: user!.ridesTaken },
    { icon: <TrendingUp className="h-5 w-5" />, label: "Active Rides", value: activeRides },
    { icon: <Clock className="h-5 w-5" />, label: "Active Bookings", value: activeBookings },
  ];

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">
          Hello, <span className="gradient-text">{user!.name.split(" ")[0]}</span> 👋
        </h1>
        <p className="text-muted-foreground mt-1">What would you like to do today?</p>
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Link to="/offer-ride">
          <div className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground shrink-0">
                <Car className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Offer a Ride</h3>
                <p className="text-sm text-muted-foreground">
                  Share your journey, earn money, and help fellow students
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link to="/find-ride">
          <div className="glass-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-accent flex items-center justify-center text-accent-foreground shrink-0">
                <Search className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Find a Ride</h3>
                <p className="text-sm text-muted-foreground">
                  Search available rides that match your route and schedule
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
              {stat.icon}
            </div>
            <p className="font-heading text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="font-heading font-semibold text-lg mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {mockBookings.slice(0, 3).map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">
                    {booking.ride.source} → {booking.ride.destination}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {booking.ride.date} · {booking.status}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold">₹{booking.totalPrice}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
