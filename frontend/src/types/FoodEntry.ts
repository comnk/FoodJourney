export type FoodEntry = {
  id: string;
  dishName: string;
  restaurantName: string;
  rating: number;
  time: string;
  notes?: string;
  latitude?: number;
  longitude?: number;
};