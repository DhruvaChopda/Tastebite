import { Component, OnInit } from '@angular/core';
import { IProducts } from '../Iproducts';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  cartItems: any[] = [];
  getCartDetails:any=[];
  constructor(private cartService: CartService, private router: Router,public auth: AuthService) {}
  ngOnInit(): void {
    this.CartDetails();
    this.loadCart();
    this.cartItems=[];
  }

  gotoMenu(): void {
    this.router.navigate(['/menu']); 
  }

  CartDetails(){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '');
      console.log(this.getCartDetails);
    }
  }

  incQnt(productId:any, qnt:any){
    for(let i=0; i<this.getCartDetails.length;i++){
      if(this.getCartDetails[i].productId === productId){
        this.getCartDetails[i].qnt = parseInt(qnt) + 1;
      }
    }
    localStorage.setItem('localCart',JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  decQnt(productId:any, qnt:any){
    for(let i=0; i<this.getCartDetails.length;i++){
      if(this.getCartDetails[i].productId === productId){
        if(qnt!=1){
          this.getCartDetails[i].qnt = parseInt(qnt) - 1;
        }
      }
    }
    localStorage.setItem('localCart',JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  total:number=0;
  // loadCart(){
  //   if(localStorage.getItem('localCart')){
  //     this.getCartDetails = JSON.parse(localStorage.getItem('localCart') || '');
  //     this.total = this.getCartDetails.reduce((acc: number, val: any) => {
  //       const prize = val.prize ? val.prize : 0; // Handle cases where prize might not be available or invalid
  //       const qnt = val.qnt ? val.qnt : 0; // Handle cases where qnt might not be available or invalid
  //       return acc + (prize * qnt);
  //     }, 0);
  //   }
  // }

  loadCart(){
    const cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.getCartDetails = JSON.parse(cartData);
      this.total = this.getCartDetails.reduce((acc: number, val: any) => {
        const prize = val.prize ? val.prize : 0;
        const qnt = val.qnt ? val.qnt : 0;
        return acc + (prize * qnt);
      }, 0);
    } else {
      this.getCartDetails = undefined; // Set getCartDetails to undefined when localStorage is empty
      this.total = 0; // Set total to 0 when localStorage is empty
    }
  }
 
  removeall(){
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.total = 0;
    this.cartNumber= 0;
    this.auth.cartSubject.next(this.cartNumber);
  }

  singleDelete(getCartDetail:any){
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')||'');
      for(let i=0; i< this.getCartDetails.length; i++){
        if(this.getCartDetails[i].productId === getCartDetail){
          this.getCartDetails.splice(i,1);
          localStorage.setItem('localCart',JSON.stringify(this.getCartDetails));
          this.loadCart();
          this.cartNumberFunc();
        }
      }
    }
    
  }

  cartNumber : number =0;
  cartNumberFunc(){
    var cartValue = JSON.parse(localStorage.getItem('localCart') || '0');
    this.cartNumber = cartValue.length;
    this.auth.cartSubject.next(this.cartNumber);
  }
  
  checkout(): void {
    const localData = localStorage.getItem('loggedUser') !== null;
    console.log(localData);
    if (!localData) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/payment']);
    }
  }

}

