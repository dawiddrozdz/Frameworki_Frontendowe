import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-restaurant-card',
  styleUrl: './restaurant-card.scss',
  templateUrl: './restaurant-card.html',
})
export class RestaurantCard {
  restaurant = signal({
    name: 'Makoo',
    description: 'Opis',
    cousineType: 'Kuchnia: Polska',
    image: 'https://picsum.photos/200/300',
    rating: 5.0,
    deliveryTime: '20min',
    deliveryCost: '15zł',
    isActive: 'Active',
  });
}
