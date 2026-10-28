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
  readonly selectedCuisine = signal('all');
  readonly sortBy = signal('rating');

  readonly filteredRestaurants = computed(() => {
    const query = this.searchTerm().trim().toLocaleLowerCase();
    const filtered = this.restaurantsService.getAll().filter((restaurant) => {
      const matchesName = restaurant.name.toLocaleLowerCase().includes(query);
      const matchesCuisine = this.selectedCuisine() === 'all' || restaurant.cuisine === this.selectedCuisine();
      return restaurant.isActive && matchesName && matchesCuisine;
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
    this.sortBy.set('rating');
  }
}
  
