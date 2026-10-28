import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurants } from '../../services/restaurants';
import type { Restaurant } from '../../Models/restaurant.model';

@Component({
  imports: [RouterLink],
  selector: 'app-admin-restaurants',
  styleUrl: './admin-restaurants.scss',
  templateUrl: './admin-restaurants.html',
})
export class AdminRestaurants {
  private readonly restaurantsService = inject(Restaurants);

  readonly restaurants = signal<Restaurant[]>(this.restaurantsService.getAll());
  readonly actionError = signal('');

  deactivateRestaurant(id: number): void {
    this.actionError.set('');

    if (!this.restaurantsService.deactivate(id)) {
      this.actionError.set('Nie znaleziono restauracji do dezaktywacji.');
      return;
    }

    this.restaurants.set(this.restaurantsService.getAll());
  }
}
