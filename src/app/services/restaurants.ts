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
}
