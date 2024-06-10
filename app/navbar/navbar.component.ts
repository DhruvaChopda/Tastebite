import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedUser: any;
  constructor(private auth:AuthService,private router: Router){
    this.auth.cartSubject.subscribe((data)=>{
      this.cartItem= data;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const localUser = localStorage.getItem('loggedUser');
        if (localUser != null) {
          this.loggedUser = JSON.parse(localUser);
        }else {
          console.log('No logged user data found in localStorage');
          this.loggedUser = null;
        }
      } else {
        console.log('Event is not NavigationEnd');
      }
    });

  }

  onLogoff() {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('localCart');
    this.loggedUser = null;
    this.cartItem = 0;
    this.router.navigateByUrl('/')
    
  }

  
  ngOnInit(): void {
    this.cartItemFunc();
   }

  cartItem : number = 0;
  cartItemFunc(){
    if(localStorage.getItem('localCart') != null){
      var cartCount = JSON.parse(localStorage.getItem('localCart') || '0');
      this.cartItem = cartCount.length;
    }
  }

  
}




