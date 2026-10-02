import { Component } from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';

@Component({
  imports: [RestaurantCard],
  selector: 'app-restaurant-list',
  styleUrl: './restaurant-list.scss',
  templateUrl: './restaurant-list.html',
})
export class RestaurantList {}
