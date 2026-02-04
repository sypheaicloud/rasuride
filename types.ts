export interface Car {
  id: number;
  make: string;
  model: string;
  image: string;       // Matches Python's "image"
  price: number;       // Matches Python's "price"
  category: string;
  transmission: string;
  people: number;
  features: string[];  // Matches Python's ["GPS", "Bluetooth"]
  active: boolean;
}

export interface User {
  user_id: number;
  name: string;
  email: string;
  is_admin: boolean;
}