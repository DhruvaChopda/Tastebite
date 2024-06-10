import { Injectable } from '@angular/core';
import { IProducts } from './Iproducts';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: IProducts[] = [];

  constructor() {}

  addCart(category: any): void {
    
  }

  getCart(): IProducts[] {
    return this.cart;
  }

  clearCart(): void {
    this.cart = [];
  }

  // calculateSubtotal(): number {
  //   let subtotal: number = 0;
  //   for (let val of this.cart) {
  //     // subtotal += val.prize * val.quantity;
  //     subtotal += val.prize;
  //   }
  //   return subtotal;
  // }

  // calculateVAT(): number {
  //   return this.calculateSubtotal() * 0.18;
  // }

  // calculateDiscount(): number {
  //   const subtotal = this.calculateSubtotal();
  //   let discount = 0;

  //   if (subtotal > 2500) {
  //     discount = subtotal * 0.15; // 15% discount
  //   } else if (subtotal > 1000) {
  //     discount = subtotal * 0.10; // 10% discount
  //   } else if (subtotal > 500) {
  //     discount = subtotal * 0.05; // 5% discount
  //   }

  //   return discount;
  // }

  // calculateTotal(): number {
  //   return this.calculateSubtotal() + this.calculateVAT() - this.calculateDiscount();
  // }
  
}
