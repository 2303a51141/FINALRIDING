import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Car, MapPin } from "lucide-react";

export default function OfferRide() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    source: "",
    destination: "",
    date: "",
    time: "",
    seats: "",
    price: "",
    vehicle: "",
    notes: "",
  });

  if (!isAuthenticated) return <Navigate to="/login" />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.source || !form.destination || !form.date || !form.time || !form.seats || !form.price) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    toast.success("Ride published successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="page-transition max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">
          <span className="gradient-text">Offer</span> a Ride
        </h1>
        <p className="text-muted-foreground mt-1">
          Share your journey with fellow students and split the costs
        </p>
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source">Pickup Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
                <Input
                  id="source"
                  name="source"
                  placeholder="e.g. Delhi University"
                  className="pl-10"
                  value={form.source}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Drop-off Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
                <Input
                  id="destination"
                  name="destination"
                  placeholder="e.g. Connaught Place"
                  className="pl-10"
                  value={form.destination}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seats">Available Seats *</Label>
              <Input
                id="seats"
                name="seats"
                type="number"
                min="1"
                max="6"
                placeholder="e.g. 3"
                value={form.seats}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per Seat (₹) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="1"
                placeholder="e.g. 60"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle</Label>
              <Input
                id="vehicle"
                name="vehicle"
                placeholder="e.g. Maruti Swift"
                value={form.vehicle}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Any preferences or details for passengers..."
              rows={3}
              value={form.notes}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full gradient-primary border-0 text-primary-foreground"
            size="lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Publishing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Car className="h-4 w-4" /> Publish Ride
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
