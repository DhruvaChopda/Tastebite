import { Component, OnInit } from '@angular/core';
import { IProducts } from '../Iproducts';
import { products } from '../products';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from '../cart.service';
import {AuthService} from '../auth.service';
import {  ElementRef, Renderer2, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  product : IProducts = {} as IProducts;
  // products: Array<IProducts> = products;
  //changes
  products: IProducts[] = [];
  selectedSortOption:any='';
  cartItem:any= 0;
  //pavan start
  // products = products;
  @ViewChild('preveiwContainer', { static: true }) preveiwContainerRef!: ElementRef;
  @ViewChildren('previewBox') previewBoxRef!: QueryList<ElementRef>;
  searchTerm: string = '';
  selectedTag: string = '';
  selectedProduct: any =null;
  
  //pavan comp
  constructor (private cardService: CartService,public auth:AuthService , public router:Router){

  }
  ngOnInit(): void {
    this.products = products;    
    this.updateLocalCartQuantities();
    // this.cartItemFunc();
  }

  updateLocalCartQuantities(): void {
    const cartDataNull = localStorage.getItem('localCart');
    // console.log(cartDataNull);
    if (cartDataNull) {
      var localCart = JSON.parse(cartDataNull);
      console.log(localCart);
      this.products.forEach((product) => {
        const cartItem = localCart.find((item: any) => item.productId === product.productId);
        if (cartItem) {
            product.qnt = cartItem.qnt;
        } else {
            product.qnt = 1; // Set quantity to 1 if product not found in localCart
        }
      });
    }
  }

  inc(product: { productId:number,qnt: number }) {
      product.qnt += 1;
  }

  dec(product: { productId:number,qnt: number }){
    if(product.qnt!=1){
      product.qnt-=1;
    }
  }
  
  itemsCart:any[]=[];

  addCart(category: any) {
    console.log(category);
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null){
      let storeDataGet:any =[];
      storeDataGet.push(category);
      localStorage.setItem('localCart',JSON.stringify(storeDataGet));
    }else{
      var id = category.productId;
      let index:number = -1;
      this.itemsCart= JSON.parse(cartDataNull) || [];
      for(let i=0;i<this.itemsCart.length;i++){
        if(parseInt(id) === parseInt(this.itemsCart[i].productId)){
          this.itemsCart[i].qnt = category.qnt;
          index = i;
          break;
        }
      }
      console.log(this.itemsCart);
      if(index == -1){
        this.itemsCart.push(category);        
        localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
      }else{
        localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
      }
      console.log(this.itemsCart);
    }
    this.cartNumberFunc();
    this.router.navigate(['/cart']);
  }

  cartNumber : number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart') || '[]'); // Set to empty array if null or empty string
    this.cartNumber = cartValue.length;
    this.auth.cartSubject.next(this.cartNumber);
  }

  //pavan function start

  showPreview(index: number): void {
    this.selectedProduct = this.products[index];
  }

  closePreview(): void {
    this.selectedProduct = null;
  }
  
  //uncomment when solve err
  // search(): void {
  //   if (!this.searchTerm.trim()) {
  //     this.products = products;
  //     return;
  //   }
  //   this.products = this.products.filter(product =>
  //     product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.products = products; // Reset to original list of products
      return;
    }
    this.products = products.filter(product =>
      product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  filterByTag(tag: string): void {
    this.selectedTag = tag;
    if (tag === '') {
      this.products = products; // Reset products if tag is empty
    } else {
      this.products = products.filter(product => product.Tag.includes(tag));
    }
  }

  sortHighToLow() {
    this.selectedSortOption = 'Price: High to Low';
    this.products.sort((a, b) => b.prize - a.prize);
  }

  sortLowToHigh() {
    this.selectedSortOption = 'Price: Low to High';
    this.products.sort((a, b) => a.prize - b.prize);
  }

  sortByNameAZ() {
    this.selectedSortOption = 'A - Z';
    this.products.sort((a, b) => a.productName.localeCompare(b.productName));
  }

  sortByNameZA() {
    this.selectedSortOption = 'Z - A';
    this.products.sort((a, b) => b.productName.localeCompare(a.productName));
  }

  // cartItemFunc(){
  //   if(localStorage.getItem('localCart') != null){
  //     var cartCount = JSON.parse(localStorage.getItem('localCart') || '0');
  //     this.cartItem = cartCount.length;
  //     this.updateLocalCartQuantities();
  //   }
  //   // this.updateLocalCartQuantities();
  // }
}
