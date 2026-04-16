export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  avatar: string;
  rating: number;
  ridesOffered: number;
  ridesTaken: number;
}

export interface Ride {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar: string;
  driverRating: number;
  source: string;
  destination: string;
  date: string;
  time: string;
  availableSeats: number;
  totalSeats: number;
  pricePerSeat: number;
  vehicle: string;
  notes: string;
  status: "active" | "completed" | "cancelled";
}

export interface Booking {
  id: string;
  rideId: string;
  passengerId: string;
  passengerName: string;
  seatsBooked: number;
  totalPrice: number;
  status: "confirmed" | "cancelled" | "completed";
  bookedAt: string;
  ride: Ride;
}

export const currentUser: User = {
  id: "u1",
  name: "Arjun Sharma",
  email: "arjun.sharma@university.edu",
  phone: "+91 98765 43210",
  college: "Delhi Technical University",
  avatar: "AS",
  rating: 4.7,
  ridesOffered: 12,
  ridesTaken: 28,
};

export const mockRides: Ride[] = [
  {
    id: "r1",
    driverId: "u2",
    driverName: "Priya Patel",
    driverAvatar: "PP",
    driverRating: 4.9,
    source: "Delhi University",
    destination: "Connaught Place",
    date: "2025-04-18",
    time: "09:00",
    availableSeats: 3,
    totalSeats: 4,
    pricePerSeat: 60,
    vehicle: "Maruti Swift",
    notes: "AC available, music friendly. Will wait 5 mins max.",
    status: "active",
  },
  {
    id: "r2",
    driverId: "u3",
    driverName: "Rohit Kumar",
    driverAvatar: "RK",
    driverRating: 4.5,
    source: "IIT Delhi",
    destination: "Hauz Khas",
    date: "2025-04-18",
    time: "14:30",
    availableSeats: 2,
    totalSeats: 3,
    pricePerSeat: 40,
    vehicle: "Honda Activa",
    notes: "Two-wheeler, helmet provided.",
    status: "active",
  },
  {
    id: "r3",
    driverId: "u4",
    driverName: "Sneha Reddy",
    driverAvatar: "SR",
    driverRating: 4.8,
    source: "Noida Sector 62",
    destination: "Rajiv Chowk",
    date: "2025-04-19",
    time: "08:00",
    availableSeats: 1,
    totalSeats: 4,
    pricePerSeat: 80,
    vehicle: "Hyundai i20",
    notes: "Early morning ride, prefer quiet passengers.",
    status: "active",
  },
  {
    id: "r4",
    driverId: "u5",
    driverName: "Karan Mehta",
    driverAvatar: "KM",
    driverRating: 4.3,
    source: "Gurgaon Cyber City",
    destination: "Delhi University",
    date: "2025-04-19",
    time: "17:00",
    availableSeats: 4,
    totalSeats: 4,
    pricePerSeat: 100,
    vehicle: "Toyota Innova",
    notes: "Spacious vehicle. Luggage friendly.",
    status: "active",
  },
  {
    id: "r5",
    driverId: "u6",
    driverName: "Ananya Singh",
    driverAvatar: "AS",
    driverRating: 4.6,
    source: "Dwarka Sector 21",
    destination: "Saket",
    date: "2025-04-20",
    time: "10:00",
    availableSeats: 2,
    totalSeats: 3,
    pricePerSeat: 50,
    vehicle: "Maruti Alto",
    notes: "Regular commute route, can pick up on the way.",
    status: "active",
  },
  {
    id: "r6",
    driverId: "u1",
    driverName: "Arjun Sharma",
    driverAvatar: "AS",
    driverRating: 4.7,
    source: "DTU Campus",
    destination: "Kashmere Gate",
    date: "2025-04-17",
    time: "11:00",
    availableSeats: 0,
    totalSeats: 3,
    pricePerSeat: 45,
    vehicle: "Honda City",
    notes: "Regular route.",
    status: "completed",
  },
];

export const mockBookings: Booking[] = [
  {
    id: "b1",
    rideId: "r1",
    passengerId: "u1",
    passengerName: "Arjun Sharma",
    seatsBooked: 1,
    totalPrice: 60,
    status: "confirmed",
    bookedAt: "2025-04-16T10:30:00",
    ride: mockRides[0],
  },
  {
    id: "b2",
    rideId: "r6",
    passengerId: "u7",
    passengerName: "Vikram Joshi",
    seatsBooked: 2,
    totalPrice: 90,
    status: "completed",
    bookedAt: "2025-04-15T08:00:00",
    ride: mockRides[5],
  },
];

export const popularRoutes = [
  { source: "Delhi University", destination: "Connaught Place", rides: 15 },
  { source: "IIT Delhi", destination: "Hauz Khas", rides: 12 },
  { source: "Noida Sector 62", destination: "Rajiv Chowk", rides: 10 },
  { source: "Gurgaon", destination: "South Delhi", rides: 8 },
];
