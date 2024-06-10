import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { RouterTestingModule } from '@angular/router/testing';
import { IProducts } from '../Iproducts';
import { FormsModule } from '@angular/forms';




describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let cartService: CartService;
  let authService: AuthService;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [RouterTestingModule,FormsModule],
      providers: [CartService, AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    cartService = TestBed.inject(CartService);
    authService = TestBed.inject(AuthService);
  });

  it('1.should create', () => {
    expect(component).toBeTruthy();
  });
  // updateLocalCartQuantities Function:

  it('2.should update product quantities based on localStorage data', () => {
    const mockCartData = [{ productId: 1, qnt: 1 }];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockCartData));
  
    component.updateLocalCartQuantities();
    fixture.detectChanges();
  
    expect(component.products[0].qnt).toBe(1); // Assuming product IDs match
  });

  // it('3.should set product quantity to 1 if not found in localStorage', () => {
  //   const mockCartData = [{ productId: 1, image: 'image1.jpg', productName: 'apple', productDescription: 'Description 1', prize: 10, availability: true, qnt: 1, Tag: ['tag1', 'tag2'], rating: 4 },
  //   { productId: 2, image: 'image2.jpg', productName: 'banana', productDescription: 'Description 2', prize: 20, availability: false, qnt: 1, Tag: ['tag3'], rating: 3 },
  //   { productId: 3, image: 'image3.jpg', productName: 'strobbary', productDescription: 'Description 3', prize: 15, availability: true, qnt: 1, Tag: ['tag2', 'tag4'], rating: 5 }
  // ];
  //   spyOn(localStorage, 'getItem').and.returnValue(null);
  
  //   component.updateLocalCartQuantities();
  //   fixture.detectChanges();
  
  //   expect(component.products[0].qnt).toBe(1); // Assuming product has initial qnt of 0
  // });

  // inc and dec Functions:
  it('4.should increment product quantity', () => {
    const product = { productId: 1, qnt: 1 };
  
    component.inc(product);
  
    expect(product.qnt).toBe(2);
  });
  
  it('5.should decrement product quantity if greater than 1', () => {
    const product = { productId: 1, qnt: 2 };
  
    component.dec(product);
  
    expect(product.qnt).toBe(1);
  });
  
  it('6.should not decrement product quantity if equal to 1', () => {
    const product = { productId: 1, qnt: 1 };
  
    component.dec(product);
  
    expect(product.qnt).toBe(1);
  });

  // addCart Function:
  // it('7.should add product to localStorage and navigate to cart', () => {
  //   const product = { productId: 1, qnt: 2 };
  //   spyOn(localStorage, 'setItem');
  //   spyOn(component.router, 'navigate');
  
  //   component.addCart(product);
  //   fixture.detectChanges();
  
  //   expect(localStorage.setItem).toHaveBeenCalledWith('localCart', JSON.stringify([product]));
  //   expect(component.router.navigate).toHaveBeenCalledWith(['/cart']);
  // });

  // cartNumberFunc Function:
  it('8.should update cart number based on localStorage data', () => {
    const mockCartData = [{ productId: 1, image: 'image1.jpg', productName: 'apple', productDescription: 'Description 1', prize: 10, availability: true, qnt: 0, Tag: ['tag1', 'tag2'], rating: 4 },
    { productId: 2, image: 'image2.jpg', productName: 'banana', productDescription: 'Description 2', prize: 20, availability: false, qnt: 0, Tag: ['tag3'], rating: 3 },
    { productId: 3, image: 'image3.jpg', productName: 'strobbary', productDescription: 'Description 3', prize: 15, availability: true, qnt: 0, Tag: ['tag2', 'tag4'], rating: 5 }
  ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockCartData));
    spyOn(component.auth.cartSubject, 'next');
  
    component.cartNumberFunc();
    fixture.detectChanges();
  
    expect(component.cartNumber).toBe(3);
    expect(component.auth.cartSubject.next).toHaveBeenCalledWith(3);
  });

  // showPreview and closePreview Functions:

  it('9.should set selectedProduct when showPreview is called', () => {
    const selectedIndex = 1;
  
    component.showPreview(selectedIndex);
    fixture.detectChanges();
  
    expect(component.selectedProduct).toBe(component.products[selectedIndex]);
  });
  
  it('10.reset selectedProduct when closePreview is called', () => {
    component.selectedProduct = { productId: 1, qnt: 2 };
  
    component.closePreview();
    fixture.detectChanges();
  
    expect(component.selectedProduct).toBeNull();
  });

  // 

  it('11.should filter products by search term', () => {
    // component.products = [
    //   { productId: 1, image: 'image1.jpg', productName: 'apple', productDescription: 'Description 1', prize: 10, availability: true, qnt: 0, Tag: ['tag1', 'tag2'], rating: 4 },
    //   { productId: 2, image: 'image2.jpg', productName: 'banana', productDescription: 'Description 2', prize: 20, availability: false, qnt: 0, Tag: ['tag3'], rating: 3 },
    //   { productId: 3, image: 'image3.jpg', productName: 'strobbary', productDescription: 'Description 3', prize: 15, availability: true, qnt: 0, Tag: ['tag2', 'tag4'], rating: 5 }
    // ];

    component.searchTerm = 'Rasgulla';
    component.search();

    expect(component.products.length).toBe(1);
    expect(component.products[0].productName).toBe('Rasgulla');
  });

  
  it('12.should return all products if search term is empty', () => {
    
    component.searchTerm = '';
    component.search();
    expect(component.products.length).toBe(90); // Assuming all products are returned
  });
  
  it('13.should handle non-existent search terms gracefully', () => {
    component.searchTerm = 'xyz';
    component.search();
    fixture.detectChanges();
  
    expect(component.products.length).toBe(0); // No matches found
  });

  // 

  it('14.should filter products based on tag', () => {
    component.filterByTag('Drinks');
    fixture.detectChanges();
    expect(component.products.length).toBe(15);
  });

  it('15.should return an empty list if no products match the tag', () => {
    component.filterByTag('vegetable');
    fixture.detectChanges();
  
    expect(component.products.length).toBe(0);
  });

  // 

  it('16.should sort products from high to low price', () => {
    component.sortHighToLow();
    fixture.detectChanges();
    expect(component.products[0].productName).toBe('Gulab Jamun');
    // expect(component.products).toEqual(expectedProducts);
  });

  it('17.should sort products from low to high price', () => {
    component.sortLowToHigh();
    fixture.detectChanges();
    expect(component.products[0].productName).toBe('Masala Tea');
    
  });

  it('18.should sort products from A to Z', () => {
    component.sortByNameAZ();
    fixture.detectChanges();
    expect(component.products[0].productName).toBe('7 Up');
  });
  it('19.should sort products from Z to A', () => {
    component.sortByNameZA();
    fixture.detectChanges();
    expect(component.products[0].productName).toBe('Venilla Ice Cream');
  });
});
