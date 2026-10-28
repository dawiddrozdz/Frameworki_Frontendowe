import { Service, signal } from '@angular/core';
import restaurants from '../../data/restaurants.json';
import menu from '../../data/menu.json';
import { Menu, Restaurant } from '../Models/restaurant.model';

@Service()
export class Restaurants {
    private data = signal<Restaurant[]>(restaurants);

    getAll(): Restaurant[] {
        return this.data();
    }

    getById(id: number) {
        return this.data().find((restaurant) => restaurant.id === id);  
    }

    getMenuByRestaurantId(id: number): Menu | undefined {
        return menu.find((restaurantMenu) => restaurantMenu.restaurantId === id);
    }

    create(restaurant: Omit<Restaurant, 'id' | 'rating'>): void {
        const nextId = this.data().reduce(
            (maxId, current) => Math.max(maxId, current.id),
            0,
        ) + 1;
        const newRestaurant: Restaurant = {
            ...restaurant,
            id: nextId,
            rating: 0,
        };

        this.data.update(current => [...current, newRestaurant]);
    }

    update(id: number, updatedRestaurant: Omit<Restaurant, 'id' | 'rating'>): boolean {
        const exists = this.data().some(restaurant => restaurant.id === id);

        if (!exists) {
            return false;
        }

        this.data.update(current =>
            current.map(restaurant =>
                restaurant.id === id
                    ? { ...restaurant, ...updatedRestaurant }
                    : restaurant
            )
        );

        return true;
    }

    deactivate(id: number): boolean {
        const exists = this.data().some(restaurant => restaurant.id === id);

        if (!exists) {
            return false;
        }

        this.data.update(current =>
            current.map(restaurant =>
                restaurant.id === id
                    ? { ...restaurant, isActive: false }
                    : restaurant
            )
        );

        return true;
    }
}
