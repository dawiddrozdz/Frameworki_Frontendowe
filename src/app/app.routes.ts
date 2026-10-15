import { Routes } from '@angular/router';
import { RestaurantList } from './restaurant-list/restaurant-list';
import { RestaurantDetails } from './restaurant-details/restaurant-details';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'restaurants',
    },
    {
        path: 'restaurants',
        pathMatch: 'full',
        component: RestaurantList,
    },
    {
        path: 'restaurants/:id',
        component: RestaurantDetails,
    },
];
