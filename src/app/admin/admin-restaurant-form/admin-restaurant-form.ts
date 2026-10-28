import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormField, form, min, pattern, required } from '@angular/forms/signals';
import { Restaurants } from '../../services/restaurants';
import type { Restaurant } from '../../Models/restaurant.model';

type NewRestaurant = Omit<Restaurant, 'id' | 'rating'>;

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-admin-restaurant-form',
  styleUrl: './admin-restaurant-form.scss',
  templateUrl: './admin-restaurant-form.html',
})
export class AdminRestaurantForm {
  private readonly restaurantsService = inject(Restaurants);
  private readonly router = inject(Router);

  readonly id = input<string>();
  readonly submitted = signal(false);
  readonly submitError = signal('');
  readonly isEditing = computed(() => this.id() !== undefined);
  readonly restaurantModel = linkedSignal<NewRestaurant>(() => {
    const id = this.id();
    const restaurant = id
      ? this.restaurantsService.getById(Number(id))
      : undefined;

    if (!restaurant) {
      return {
        name: '',
        description: '',
        cuisine: '',
        imageUrl: '',
        deliveryTimeMin: 20,
        deliveryTimeMax: 30,
        deliveryFee: 0,
        minimumOrderValue: 0,
        isActive: true,
        address: '',
      };
    }

    return {
      name: restaurant.name,
      description: restaurant.description,
      cuisine: restaurant.cuisine,
      imageUrl: restaurant.imageUrl,
      deliveryTimeMin: restaurant.deliveryTimeMin,
      deliveryTimeMax: restaurant.deliveryTimeMax,
      deliveryFee: restaurant.deliveryFee,
      minimumOrderValue: restaurant.minimumOrderValue,
      isActive: restaurant.isActive,
      address: restaurant.address,
    };
  });

  readonly restaurantForm = form(this.restaurantModel, (schema) => {
    required(schema.name, { message: 'Podaj nazwę restauracji.' });
    required(schema.description, { message: 'Podaj opis restauracji.' });
    required(schema.cuisine, { message: 'Wybierz rodzaj kuchni.' });
    required(schema.imageUrl, { message: 'Podaj adres URL zdjęcia.' });
    pattern(schema.imageUrl, /^https?:\/\/.+/, {
      message: 'Adres zdjęcia musi zaczynać się od http:// lub https://.',
    });
    required(schema.deliveryTimeMin, { message: 'Podaj minimalny czas dostawy.' });
    min(schema.deliveryTimeMin, 1, { message: 'Czas dostawy musi wynosić co najmniej 1 minutę.' });
    required(schema.deliveryTimeMax, { message: 'Podaj maksymalny czas dostawy.' });
    min(schema.deliveryTimeMax, 1, { message: 'Czas dostawy musi wynosić co najmniej 1 minutę.' });
    required(schema.deliveryFee, { message: 'Podaj koszt dostawy.' });
    min(schema.deliveryFee, 0, { message: 'Koszt dostawy nie może być ujemny.' });
    required(schema.minimumOrderValue, { message: 'Podaj minimalną wartość zamówienia.' });
    min(schema.minimumOrderValue, 0, { message: 'Minimalna wartość zamówienia nie może być ujemna.' });
    required(schema.address, { message: 'Podaj adres restauracji.' });
  });

  readonly deliveryRangeInvalid = computed(() => {
    const restaurant = this.restaurantModel();
    return restaurant.deliveryTimeMax < restaurant.deliveryTimeMin;
  });

  readonly deliveryRangeErrorVisible = computed(() =>
    this.deliveryRangeInvalid()
    && (
      this.submitted()
      || this.restaurantForm.deliveryTimeMin().touched()
      || this.restaurantForm.deliveryTimeMax().touched()
    ),
  );

  onSubmit(event: Event): void {
    event.preventDefault();
    this.submitted.set(true);
    this.submitError.set('');

    if (!this.restaurantForm().valid() || this.deliveryRangeInvalid()) {
      return;
    }

    const id = this.id();

    if (id !== undefined) {
      const updated = this.restaurantsService.update(
        Number(id),
        this.restaurantModel(),
      );

      if (!updated) {
        this.submitError.set('Nie znaleziono restauracji do edycji.');
        return;
      }
    } else {
      this.restaurantsService.create(this.restaurantModel());
    }

    void this.router.navigateByUrl('/admin/restaurants');
  }
}
