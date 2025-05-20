import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './model/User';
import { Hotel } from './model/Hotel';
import { Booking } from './model/Booking';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  login(email: string, password: string){

    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/login', body, {headers: headers, withCredentials: true, responseType: 'text'});
  }

  register(user: User){
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('address', user.address);
    body.set('nickname', user.nickname);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/register', body, {headers: headers});
  }

  uploadHotel(hotel: Hotel){
    const body = new URLSearchParams();
    body.set('name', hotel.name);
    body.set('location', hotel.location);
    body.set('description', hotel.description);
    body.set('services', hotel.services);
    body.set('image', hotel.image);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/hotels', body, {headers: headers});
  }

  uploadBooking(booking: Booking){
    const body = new URLSearchParams();
    body.set('hotelName', booking.hotelName);
    body.set('fromDate', booking.fromDate);
    body.set('toDate', booking.toDate);
    body.set('description', booking.description);
    body.set('price', booking.price.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/bookings', body, {headers: headers});
  }

  logout(){
    return this.http.post('http://localhost:5000/app/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  checkAuth(){
    return this.http.get<boolean>('http://localhost:5000/app/checkAuth', {withCredentials: true});
  }

  /*getUserId(): string | null{
    const token = localStorage.getItem(this.tokenKey);
    if(!token) return null;

    try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload.id || null;
    }catch {
      return null;
    }
  }*/
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }



  /*createOffer(offerData: any) {
    return this.http.post('http://localhost:5000/app/offer', offerData, {withCredentials: true});
  }*/

  createOffer(offerData: any){
    const body = new URLSearchParams();
    body.set('hotelName', offerData.hotelName);
    body.set('fromDate', offerData.fromDate);
    body.set('toDate', offerData.toDate);
    body.set('description', offerData.description);
    body.set('price', offerData.price.toString());
    body.set('userId', offerData.userId)

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:5000/app/offer', body, {headers: headers});
  }


}
