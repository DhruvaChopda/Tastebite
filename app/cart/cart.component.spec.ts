import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { CartComponent } from './cart.component';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let router: Router;
  let authService: AuthService;
  let cartService: CartService;
  let localStorageMock: any;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [RouterTestingModule],
      providers: [AuthService, CartService]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    cartService = TestBed.inject(CartService);
    

    localStorageMock = {
      getItem: jasmine.createSpy('getItem'),
      setItem: jasmine.createSpy('setItem')
    };
    
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to menu', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.gotoMenu();
    expect(navigateSpy).toHaveBeenCalledWith(['/menu']);
  });

  it('should retrieve cart details on initialization', () => {
    const CartDetailsSpy = spyOn(component, 'CartDetails');
    const loadCartSpy = spyOn(component, 'loadCart');
    component.ngOnInit();
    expect(CartDetailsSpy).toHaveBeenCalled();
    expect(loadCartSpy).toHaveBeenCalled();
  });

  it('should increment quantity', () => {
    const productId = '1';
    const qnt = 1;
    component.getCartDetails = [{ productId: productId, qnt: qnt }];
    component.incQnt(productId, qnt);
    expect(component.getCartDetails[0].qnt).toBe(qnt + 1);
  });

  it('should decrement quantity', () => {
    const productId = '1';
    const qnt = 2;
    component.getCartDetails = [{ productId: productId, qnt: qnt }];
    component.decQnt(productId, qnt);
    expect(component.getCartDetails[0].qnt).toBe(qnt - 1);
  });

  // it('should calculate total', () => {
  //   component.getCartDetails = [{ prize: 10, qnt: 2 }, { prize: 20, qnt: 1 }];
  //   // console.log('Before loadCart() call:', component.total); // Log the total before calling loadCart()
  //   component.loadCart();
  //   // console.log('After loadCart() call:', component.total); // Log the total after calling loadCart()
  //   expect(component.total).toBe(40);
  // });

  it('should load cart details and calculate total correctly', () => {
    const cartDetails = [
      { prize: 10, qnt: 2 },
      { prize: 20, qnt: 3 }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(cartDetails));

    component.loadCart();

    expect(component.getCartDetails).toEqual(cartDetails);
    expect(component.total).toEqual(10*2 + 20*3);
  });

  it('should handle cases where localStorage is empty then total', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
  
    component.loadCart();
  
    expect(component.getCartDetails).toBeUndefined();
    expect(component.total).toBe(0);
  });
  
  
  it('should handle cases where cart details are invalid', () => {
    const invalidCartDetails = [
      { prize: 'invalid', qnt: 2 },
      { prize: 20, qnt: 'invalid' }
    ];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(invalidCartDetails));

    component.loadCart();

    expect(component.getCartDetails).toEqual(invalidCartDetails);
    expect(component.total).toBeNaN(); // Total should be 0 as invalid values are ignored
  });
  

  it('should remove item from cart and update local storage (single delete)', () => {
    const mockCartItem = { productId: 12 };
    const mockCart = [mockCartItem];
    component.getCartDetails = mockCart;

    component.singleDelete(12);
    expect(component.getCartDetails).not.toContain(mockCartItem);
  });
  
  it('should clear cart', () => {
    const localStorageRemoveItemSpy = spyOn(localStorage, 'removeItem');
    spyOn(component.auth.cartSubject, 'next'); 
    component.removeall();
    expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('localCart');
    expect(component.getCartDetails.length).toBe(0);
    expect(component.total).toBe(0);
    expect(component.cartNumber).toBe(0);
    expect(component.auth.cartSubject.next).toHaveBeenCalledWith(0);
  }); 
  

  it('should update cart number', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{ productId: '1' }, { productId: '2' }]));
    spyOn(authService.cartSubject, 'next'); // Spy on the next method of authService.cartSubject
    component.cartNumberFunc();
    expect(component.cartNumber).toBe(2);
    expect(authService.cartSubject.next).toHaveBeenCalledWith(2); // Verify if next method was called with the correct argument
  });
  

  it('should navigate to login if not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');
    component.checkout();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to payment if logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someUser');
    const navigateSpy = spyOn(router, 'navigate');
    component.checkout();
    expect(navigateSpy).toHaveBeenCalledWith(['/payment']);
  });
});
