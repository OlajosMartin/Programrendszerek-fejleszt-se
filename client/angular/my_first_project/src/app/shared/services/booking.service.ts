import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './model/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/app/bookings';
  
    constructor(private http: HttpClient) { }
  
    getAll() {
        return this.http.get<Booking[]>('http://localhost:5000/app/getAllBookings', {withCredentials: true})
      }

    deleteBooking(id: string) {
      return this.http.delete(`http://localhost:5000/app/bookings/${id}`);
    }

}
