import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from './model/Hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:5000/app/hotels';

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Hotel[]>('http://localhost:5000/app/getAllHotels', {withCredentials: true})
    }
}