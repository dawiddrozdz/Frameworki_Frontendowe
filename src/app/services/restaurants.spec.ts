import { TestBed } from '@angular/core/testing';
import { Restaurants } from './restaurants';

describe('Restaurants', () => {
  let service: Restaurants;

  beforeEach(() => {
    localStorage.removeItem('foodapp.restaurants');
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    service = TestBed.inject(Restaurants);
    expect(service).toBeTruthy();
  });

  it('loads restaurants from localStorage', () => {
    const savedRestaurant = {
      id: 101,
      name: 'Zapisana restauracja',
      description: 'Opis',
      cuisine: 'polish',
      imageUrl: 'https://example.com/restaurant.jpg',
      rating: 4.5,
      deliveryTimeMin: 20,
      deliveryTimeMax: 30,
      deliveryFee: 5,
      minimumOrderValue: 25,
      isActive: true,
      address: 'ul. Testowa 1',
    };
    localStorage.setItem('foodapp.restaurants', JSON.stringify([savedRestaurant]));

    service = TestBed.inject(Restaurants);

    expect(service.getAll()).toEqual([savedRestaurant]);
  });

  it('saves restaurant changes to localStorage', () => {
    service = TestBed.inject(Restaurants);
    service.create({
      name: 'Nowa restauracja',
      description: 'Opis',
      cuisine: 'polish',
      imageUrl: 'https://example.com/restaurant.jpg',
      deliveryTimeMin: 20,
      deliveryTimeMax: 30,
      deliveryFee: 5,
      minimumOrderValue: 25,
      isActive: true,
      address: 'ul. Testowa 1',
    });

    const savedRestaurants: unknown = JSON.parse(
      localStorage.getItem('foodapp.restaurants') ?? 'null',
    );

    expect(savedRestaurants).toEqual(service.getAll());
  });
});
