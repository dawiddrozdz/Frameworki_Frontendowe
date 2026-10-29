import { Service, signal } from '@angular/core';
import restaurants from '../../data/restaurants.json';
import menu from '../../data/menu.json';
import { Menu, Restaurant } from '../Models/restaurant.model';

const RESTAURANTS_STORAGE_KEY = 'foodapp.restaurants';

function isRestaurant(value: unknown): value is Restaurant {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    return 'id' in value
        && typeof value.id === 'number'
        && 'name' in value
        && typeof value.name === 'string'
        && 'description' in value
        && typeof value.description === 'string'
        && 'cuisine' in value
        && typeof value.cuisine === 'string'
        && 'imageUrl' in value
        && typeof value.imageUrl === 'string'
        && 'rating' in value
        && typeof value.rating === 'number'
        && 'deliveryTimeMin' in value
        && typeof value.deliveryTimeMin === 'number'
        && 'deliveryTimeMax' in value
        && typeof value.deliveryTimeMax === 'number'
        && 'deliveryFee' in value
        && typeof value.deliveryFee === 'number'
        && 'minimumOrderValue' in value
        && typeof value.minimumOrderValue === 'number'
        && 'isActive' in value
        && typeof value.isActive === 'boolean'
        && 'address' in value
        && typeof value.address === 'string';
}

@Service()
export class Restaurants {
    private data = signal<Restaurant[]>(this.loadRestaurants());

    private loadRestaurants(): Restaurant[] {
        let storedRestaurants: string | null;

        try {
            storedRestaurants = localStorage.getItem(RESTAURANTS_STORAGE_KEY);
        } catch (error) {
            console.error('Nie udało się odczytać restauracji z localStorage.', error);
            return restaurants;
        }

        if (storedRestaurants === null) {
            return restaurants;
        }

        try {
            const parsed: unknown = JSON.parse(storedRestaurants);

            if (Array.isArray(parsed) && parsed.every(isRestaurant)) {
                return parsed;
            }

            console.error('Dane restauracji w localStorage mają nieprawidłowy format.');
        } catch (error) {
            console.error('Nie udało się sparsować restauracji z localStorage.', error);
        }

        return restaurants;
    }

    private updateData(update: (current: Restaurant[]) => Restaurant[]): void {
        const updated = update(this.data());
        localStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(updated));
        this.data.set(updated);
    }

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

        this.updateData(current => [...current, newRestaurant]);
    }

    update(id: number, updatedRestaurant: Omit<Restaurant, 'id' | 'rating'>): boolean {
        const exists = this.data().some(restaurant => restaurant.id === id);

        if (!exists) {
            return false;
        }

        this.updateData(current =>
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

        this.updateData(current =>
            current.map(restaurant =>
                restaurant.id === id
                    ? { ...restaurant, isActive: false }
                    : restaurant
            )
        );

        return true;
    }
}
