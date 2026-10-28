import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Restaurants } from '../../services/restaurants';
import { AdminRestaurants } from '../admin-restaurants/admin-restaurants';
import { AdminRestaurantForm } from './admin-restaurant-form';

describe('AdminRestaurantForm', () => {
  let component: AdminRestaurantForm;
  let fixture: ComponentFixture<AdminRestaurantForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRestaurantForm],
      providers: [provideRouter([{ path: 'admin/restaurants', component: AdminRestaurants }])],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRestaurantForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates a restaurant with the entered form values', () => {
    const restaurantsService = TestBed.inject(Restaurants);
    const initialCount = restaurantsService.getAll().length;

    component.restaurantModel.set({
      name: 'Nowa restauracja',
      description: 'Opis nowej restauracji',
      cuisine: 'polish',
      imageUrl: 'https://example.com/restaurant.jpg',
      deliveryTimeMin: 20,
      deliveryTimeMax: 35,
      deliveryFee: 4.5,
      minimumOrderValue: 25,
      isActive: true,
      address: 'ul. Testowa 1',
    });

    component.onSubmit(new Event('submit'));

    expect(restaurantsService.getAll()).toHaveLength(initialCount + 1);
    expect(restaurantsService.getAll().at(-1)).toMatchObject({
      name: 'Nowa restauracja',
      rating: 0,
    });
  });

});
