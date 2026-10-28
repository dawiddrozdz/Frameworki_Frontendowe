import { Routes } from '@angular/router';
import { RestaurantList } from './restaurant-list/restaurant-list';
import { RestaurantDetails } from './restaurant-details/restaurant-details';
import { AdminRestaurants } from './admin/admin-restaurants/admin-restaurants';
import { AdminRestaurantForm } from './admin/admin-restaurant-form/admin-restaurant-form';

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
    {
        path: 'admin/restaurants',
        component: AdminRestaurants,
    },
    {
        path: 'admin/restaurants/new',
        component: AdminRestaurantForm,
    },
    {
        path: 'admin/restaurants/:id/edit',
        component: AdminRestaurantForm,
    },
];
