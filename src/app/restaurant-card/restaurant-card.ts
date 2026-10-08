import { Component, input, model, signal } from '@angular/core';
import { Restaurant } from '../Models/restaurant.model';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.scss',
})
export class RestaurantCard {
  restaurant = input.required<Restaurant>();
}
