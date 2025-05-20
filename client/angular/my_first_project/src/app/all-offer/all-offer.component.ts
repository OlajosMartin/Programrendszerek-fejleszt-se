import { Component, OnInit } from '@angular/core';
import { Offer } from '../shared/services/model/Offer';
import { OfferService } from '../shared/services/offer.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-all-offer',
  imports: [CommonModule, MatTableModule, MatIconModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './all-offer.component.html',
  styleUrl: './all-offer.component.scss'
})
export class AllOfferComponent implements OnInit{

  offers!: Offer[];
    columns = ['hotelName', 'fromDate', 'toDate', 'description', 'price','delete'];
  
    constructor(private offerService: OfferService, public authService: AuthService, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar){}
    
      ngOnInit(){
        this.offerService.getAll().subscribe({
          next: (data) => {
            this.offers = data;
            console.log(this.offers);
            /*const currentUserId = this.authService.getUserId()?.toString().replace(/"/g, '').trim();
            this.offers = data.filter(o => {
              const offerUserId = o.userId?.toString().replace(/"/g, '').trim();
              return offerUserId === currentUserId;
            });*/
          }, error: (err) => {
            console.log(err);
          }
        });
      }
  
      goBack(){
        this.router.navigateByUrl('/user-management');
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
  
      deleteOffer(id: string, n: number){
          const dialogRef = this.dialog.open(DialogComponent);
      
          dialogRef.afterClosed().subscribe({
            next: (data) => {
              if(data){
                console.log(data)
                this.offerService.delete(id).subscribe({
                  next: (data) => {
                    console.log(data);
                    this.offers?.splice(n, 1)
                    this.offers = [...this.offers];
                    this.openSnackBar('A foglalás sikeresen törölve lett.', 3000)
                  }, error: (err) => {
                    console.log(err);
                  }
                });
              }
            }, error: (err) =>{
              console.log(err);
            }
          })
        }
  
        openSnackBar(message: string, duration: number){
          this.snackBar.open(message, undefined, {duration:duration});
        }

}
