import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent {
  bookingForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.bookingForm=this.formBuilder.group({
      hotelName: [''],
      fromDate: [''],
      toDate: [''],
      description: [''],
      price: [null]
    });
  }

  onSubmit(){
    if(this.bookingForm.valid){
      console.log('Form data: ', this.bookingForm.value);
      this.authService.uploadBooking(this.bookingForm.value).subscribe({
        next: (data) => {
          console.log(data);
        }, error: (err) => {
          console.log(err);
        }
      });
    }else{
      console.log('Form is not valid.')
    }
  }
  
  goBack(){
    this.router.navigateByUrl('/user-management');
  }


}
