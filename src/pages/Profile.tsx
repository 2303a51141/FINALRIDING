import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { mockRides } from "@/data/mockData";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Star,
  Car,
  MapPin,
  Clock,
} from "lucide-react";

export default function Profile() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  const userRides = mockRides.filter((r) => r.driverId === user!.id);

  return (
    <div className="page-transition max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">
          My <span className="gradient-text">Profile</span>
        </h1>
      </div>

      {/* Profile Card */}
      <div className="glass-card rounded-2xl overflow-hidden mb-8">
        <div className="gradient-primary p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {user!.avatar}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="font-heading text-2xl font-bold text-primary-foreground">
              {user!.name}
            </h2>
            <p className="text-primary-foreground/70 text-sm">{user!.college}</p>
            <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
              <Star className="h-4 w-4 fill-current text-primary-foreground" />
              <span className="text-primary-foreground font-medium">{user!.rating}</span>
              <span className="text-primary-foreground/60 text-sm">rating</span>
            </div>
          </div>
        </div>

        <div className="p-6 grid sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{user!.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-medium">{user!.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <GraduationCap className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">College</p>
              <p className="text-sm font-medium">{user!.college}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Car className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Stats</p>
              <p className="text-sm font-medium">
                {user!.ridesOffered} offered · {user!.ridesTaken} taken
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Travel History */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-heading font-semibold text-lg mb-4">Travel History</h3>
        {userRides.length > 0 ? (
          <div className="space-y-3">
            {userRides.map((ride) => (
              <div
                key={ride.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium">
                      {ride.source} → {ride.destination}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {ride.date} · {ride.time}
                    </div>
                  </div>
                </div>
                <Badge
                  variant={ride.status === "completed" ? "secondary" : "default"}
                  className={ride.status === "active" ? "gradient-primary border-0 text-primary-foreground" : ""}
                >
                  {ride.status}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            No travel history yet. Start by offering or booking a ride!
          </p>
        )}
      </div>
    </div>
  );
}
