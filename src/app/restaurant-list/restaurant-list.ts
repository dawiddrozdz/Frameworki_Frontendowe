import { Component, computed, inject, signal } from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';
import { Restaurants } from '../services/restaurants';

@Component({
  imports: [RestaurantCard],
  selector: 'app-restaurant-list',
  styleUrl: './restaurant-list.scss',
  templateUrl: './restaurant-list.html',
})

export class RestaurantList {
  private readonly restaurantsService = inject(Restaurants);

  readonly searchTerm = signal('');
  readonly restaurants = signal(this.restaurantsService.getAll());
  readonly selectedCuisine = signal('all');
  readonly activeOnly = signal(false);
  readonly sortBy = signal('rating');

  readonly filteredRestaurants = computed(() => {
    const query = this.searchTerm().trim().toLocaleLowerCase();
    const filtered = this.restaurants().filter((restaurant) => {
    const matchesName = restaurant.name.toLocaleLowerCase().includes(query);
    const matchesActive = !this.activeOnly() || restaurant.isActive;
    const matchesCuisine = this.selectedCuisine() === 'all' || restaurant.cuisine === this.selectedCuisine();
      return matchesName && matchesActive && matchesCuisine;
    });

    return filtered.sort((a, b) => {
      if (this.sortBy() === 'rating') {
        return b.rating - a.rating;
      }
      if (this.sortBy() === 'deliveryTime') {
        return a.deliveryTimeMin - b.deliveryTimeMin;
      }
      return a.deliveryFee - b.deliveryFee;
    });
  });

  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedCuisine.set('all');
    this.activeOnly.set(false);
    this.sortBy.set('rating');
  }
}
  
