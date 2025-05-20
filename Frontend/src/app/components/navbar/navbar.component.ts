import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router){

  }
   logOut(){
    localStorage.removeItem('myToken')
    this.router.navigate(['/logIn'])
   }
}
