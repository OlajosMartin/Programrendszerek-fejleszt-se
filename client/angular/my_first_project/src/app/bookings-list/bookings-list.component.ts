import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Booking } from '../shared/services/model/Booking';
import { BookingService } from '../shared/services/booking.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings-list',
  imports: [CommonModule, MatTableModule],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.scss'
})
export class BookingsListComponent implements OnInit{
  bookings!: Booking[];
  columns = ['hotelName', 'fromDate', 'toDate', 'description', 'price'];

  constructor(private bookingService: BookingService, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.bookingService.getAll().subscribe({
      next: (data) => {
        this.bookings = data;
        console.log(this.bookings);
      }, error: (err) => {
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
    this.router.navigateByUrl('/user-management');
  }


}
