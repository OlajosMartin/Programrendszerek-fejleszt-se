import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  
    { path: 'signup', loadComponent: () => import('./signup/signup.component').then((c) => c.SignupComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },

    { path: 'user-management', loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent) , canActivate: [authGuard]},
  
    //{ path: 'admin/hotels/list', loadComponent: () => import('./hotel-list/hotel-list.component').then(c => c.HotelListComponent) },


    { path: 'hotels', loadComponent: () => import('./hotels/hotels.component').then((c) => c.HotelsComponent), canActivate: [authGuard] },
    { path: 'hotel-list', loadComponent: () => import('./hotel-list/hotel-list.component').then((c) => c.HotelListComponent), canActivate: [authGuard] },
    //{ path: 'hotels/:id', loadComponent: () => import('./hotel-detail/hotel-detail.component').then((c) => c.HotelDetailComponent), canActivate: [authGuard] },
  
    { path: 'bookings', loadComponent: () => import('./bookings/bookings.component').then((c) => c.BookingsComponent), canActivate: [authGuard] },
    { path: 'bookings-list', loadComponent: () => import('./bookings-list/bookings-list.component').then((c) => c.BookingsListComponent), canActivate: [authGuard] },
    { path: 'offer', loadComponent: () => import('./offer/offer.component').then((c) => c.OfferComponent), canActivate: [authGuard] },
    { path: 'user-offer', loadComponent: () => import('./user-offer/user-offer.component').then((c) => c.UserOfferComponent), canActivate: [authGuard] },
    { path: 'all-offer', loadComponent: () => import('./all-offer/all-offer.component').then((c) => c.AllOfferComponent), canActivate: [authGuard] },
  
    // Admin-only routes – opcionálisan egy adminGuard segítségével is levédhetők
    /*{ path: 'admin/hotels', loadComponent: () => import('./admin/hotel-management/hotel-management.component').then((c) => c.HotelManagementComponent), canActivate: [authGuard] },
    { path: 'admin/offers', loadComponent: () => import('./admin/offer-management/offer-management.component').then((c) => c.OfferManagementComponent), canActivate: [authGuard] },
    { path: 'admin/bookings', loadComponent: () => import('./admin/booking-management/booking-management.component').then((c) => c.BookingManagementComponent), canActivate: [authGuard] },*/
  
    { path: '**', redirectTo: 'login' }
  ];