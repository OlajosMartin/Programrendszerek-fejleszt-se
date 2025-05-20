import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent implements OnInit{
  hotelForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.hotelForm=this.formBuilder.group({
      name: [''],
      location: [''],
      description: [''],
      services: [''],
      image: ['']
    });
  }

  onSubmit(){
    if(this.hotelForm.valid){
      console.log('Form data: ', this.hotelForm.value);
      this.authService.uploadHotel(this.hotelForm.value).subscribe({
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
