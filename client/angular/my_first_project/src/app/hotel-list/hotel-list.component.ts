import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../shared/services/model/Hotel';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HotelService } from '../shared/services/hotel.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent implements OnInit {
  hotels!: Hotel[];
  columns = ['name', 'location', 'description', 'services', 'image'];

  constructor(private hotelService: HotelService, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.hotelService.getAll().subscribe({
      next: (data) => {
        this.hotels = data;
        console.log(this.hotels);
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
