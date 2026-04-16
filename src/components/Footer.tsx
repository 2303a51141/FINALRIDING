import { Car, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="gradient-primary p-2 rounded-lg">
                <Car className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-lg text-primary-foreground">
                RideConnect
              </span>
            </div>
            <p className="text-sm text-primary-foreground/60">
              A peer-to-peer ride sharing platform built for students, by students.
              Save money, reduce emissions, make friends.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/find-ride" className="hover:text-primary-foreground transition-colors">Find a Ride</Link></li>
              <li><Link to="/offer-ride" className="hover:text-primary-foreground transition-colors">Offer a Ride</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/bookings" className="hover:text-primary-foreground transition-colors">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">Help Center</span></li>
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">Safety Guidelines</span></li>
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">Terms of Service</span></li>
              <li><span className="cursor-pointer hover:text-primary-foreground transition-colors">Privacy Policy</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                support@rideconnect.edu
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +91 11 2345 6789
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Delhi Technical University
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/40">
          <p>&copy; {new Date().getFullYear()} RideConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
