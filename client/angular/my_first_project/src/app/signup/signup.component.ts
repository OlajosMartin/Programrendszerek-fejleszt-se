import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { Location } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  signupForm!: FormGroup;
  myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  constructor(private formBuilder: FormBuilder, private navigate: Location, private authService: AuthService) {}

  ngOnInit(){
    this.signupForm=this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      address: [''],
      nickname: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    })
  }

  mustMatch(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(matchingControl.errors && matchingControl.errors['mustMatch']){
        return;
      }

      if(control.value !== matchingControl.value){
        matchingControl.setErrors({mustMatch: true});
      }else{
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmit(){
    if(this.signupForm.valid){
      console.log('Form data: ', this.signupForm.value);
      this.authService.register(this.signupForm.value).subscribe({
        next: (data) => {
          console.log(data);
          alert('Sikeres regisztráció!');
        }, error: (err) => {
          console.log(err);
        }
      });
    }else{
      console.log('Form is not valid.')
    }
  }

  goBack(){
    this.navigate.back();
  }

}
