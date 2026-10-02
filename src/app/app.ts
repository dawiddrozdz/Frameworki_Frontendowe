import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { RestaurantList } from './restaurant-list/restaurant-list';
import { Footer } from './footer/footer';

@Component({
  imports: [RouterOutlet, Header, RestaurantList, Footer],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('foodapp');
}
