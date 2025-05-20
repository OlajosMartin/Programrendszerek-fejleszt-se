import { Component } from '@angular/core';
import { Booking } from '../shared/services/model/Booking';
import { BookingService } from '../shared/services/booking.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OfferService } from '../shared/services/offer.service';
import { Offer } from '../shared/services/model/Offer';

@Component({
  selector: 'app-offer',
  imports: [CommonModule, MatTableModule, MatIconModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.scss'
})
export class OfferComponent {
  bookings!: Booking[];
  columns = ['hotelName', 'fromDate', 'toDate', 'description', 'price', 'add_shopping_cart'];

  offers!: Offer[];

  constructor(private offerService: OfferService, private bookingService: BookingService, private authService: AuthService, private router: Router, private snackBar: MatSnackBar){}

  ngOnInit(){
    this.bookingService.getAll().subscribe({
      next: (data) => {
        this.bookings = data;
        console.log(this.bookings);
      }, error: (err) => {
        console.log(err);
      }
    });

    this.offerService.getAll().subscribe({
    next: (data) => {
      this.offers = data;
      console.log('Offers:', this.offers);
    },
    error: (err) => {
      console.log(err);
    }
  });
  }

  logout(){
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  goBack(){
    this.router.navigateByUrl('/user-offer');
  }

reserveRoom(element: { hotelName: any; fromDate: any; toDate: any; price: any; description: any; }) {
  const userId = localStorage.getItem('userId')?.replace(/"/g, '');

  if (!userId) {
    console.error('User not logged in');
    return;
  }

   const alreadyHasOffer = this.offers?.some(o => o.userId?.toString() === userId);

  if (alreadyHasOffer){
    this.openSnackBar('Már van aktív foglalásod.', 5000);
    return;
  }

  const offerData = {
    hotelName: element.hotelName,
    fromDate: element.fromDate,
    toDate: element.toDate,
    price: element.price,
    description: element.description,
    userId: userId
  };

  console.log('Küldött adat:', offerData);

  this.authService.createOffer(offerData).subscribe({
    next: (res) => {
      console.log('Foglalás sikeres:', res);
      alert('Foglalás sikeres!');
    },
    error: (err) => {
      console.error('Hiba történt a foglalás során:', err);
      alert('Hiba történt a foglalás során.');
    }
  });
  
}


openSnackBar(message: string, duration: number){
    this.snackBar.open(message, undefined, {duration:duration});
}




}
