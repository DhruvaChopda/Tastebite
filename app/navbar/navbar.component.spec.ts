import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd, Event } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
// import {CartService} from '../cart.service'

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let router: Router;
  let routerEventsSubject: BehaviorSubject<Event>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
      providers: [AuthService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should load logged user from local storage on navigation end', () => {
  //   const mockUser = {email: "dhruvachopda@gmail.com", name: "Dhruva chopda", password: "Dhruva@123", phone: "9988332211",confirmPassword: "Dhruva@123"};    
  //   const navigationEndEvent = new NavigationEnd(1, '/', '/');
  //   spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
  //   spyOn(router.events, 'subscribe').and.callFake((callback: (event: Event) => void) => {
  //     callback(navigationEndEvent);
  //     return new Subscription(); // Return a Subscription object
  //   });
  //   component.ngOnInit();
  //   expect(component.loggedUser).toEqual(mockUser);
  // });

  it('should remove user data and navigate to home on logoff', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(router, 'navigateByUrl');
    component.onLogoff();
    expect(localStorage.removeItem).toHaveBeenCalledWith('loggedUser');
    expect(localStorage.removeItem).toHaveBeenCalledWith('localCart');
    expect(component.loggedUser).toBeNull();
    expect(component.cartItem).toEqual(0);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should update cart item count', () => {
    const mockCart = [1, 2, 3];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockCart));
    component.cartItemFunc();
    expect(component.cartItem).toEqual(mockCart.length);
  });

});
