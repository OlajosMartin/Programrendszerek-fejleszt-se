import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './model/Booking';
import { Offer } from './model/Offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = 'http://localhost:5000/app/offer';
    
    constructor(private http: HttpClient) { }
    
    getAll() {
        return this.http.get<Offer[]>('http://localhost:5000/app/getUserOffer', {withCredentials: true})
      }

    delete(id: string){
      return this.http.delete('http://localhost:5000/app/deleteOffer?id=' + id, {withCredentials: true})
    }

  /*private apiUrl = 'http://localhost:5000/app/offer';

  constructor(private http: HttpClient) {}

  getOffersByHotel(hotelId: string): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${this.apiUrl}/by-hotel/${hotelId}`);
  }

  // foglalás (később)
  reserveOffer(offerId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve`, {
      offerId,
      userId
    });
  }*/
}