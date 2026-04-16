import { Link } from "react-router-dom";
import { Ride } from "@/data/mockData";
import { MapPin, Clock, Users, IndianRupee, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RideCardProps {
  ride: Ride;
}

export default function RideCard({ ride }: RideCardProps) {
  return (
    <Link to={`/ride/${ride.id}`}>
      <div className="glass-card rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-sm font-semibold text-primary-foreground">
              {ride.driverAvatar}
            </div>
            <div>
              <p className="font-medium text-sm">{ride.driverName}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-warning text-warning" />
                {ride.driverRating}
              </div>
            </div>
          </div>
          <Badge
            variant={ride.availableSeats > 0 ? "default" : "secondary"}
            className={ride.availableSeats > 0 ? "gradient-primary border-0 text-primary-foreground" : ""}
          >
            {ride.availableSeats > 0
              ? `${ride.availableSeats} seats left`
              : "Full"}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-success" />
              <div className="w-0.5 h-6 bg-border" />
              <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
            </div>
            <div className="space-y-3 flex-1">
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="text-sm font-medium">{ride.source}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">To</p>
                <p className="text-sm font-medium">{ride.destination}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {ride.date} · {ride.time}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {ride.totalSeats} total
            </span>
          </div>
          <div className="flex items-center gap-1 font-heading font-bold text-primary">
            <IndianRupee className="h-3.5 w-3.5" />
            {ride.pricePerSeat}
            <span className="text-xs font-normal text-muted-foreground">/seat</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  );
}
