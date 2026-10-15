import { Component, computed, inject, input } from '@angular/core';
import { Restaurants } from '../services/restaurants';
import { ProductCard } from '../product-card/product-card';

@Component({
  imports: [ProductCard],
  selector: 'app-restaurant-details',
  styleUrl: './restaurant-details.scss',
  templateUrl: './restaurant-details.html',
})
export class RestaurantDetails {
  readonly id = input.required<string>();
  private readonly restaurantsService = inject(Restaurants);

  readonly restaurant = computed(() =>
    this.restaurantsService.getById(Number(this.id()))
  );

  readonly menu = computed(() =>
    this.restaurantsService.getMenuByRestaurantId(Number(this.id()))
  );
}
