import { TestBed, ComponentFixture} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginModel } from './login.component';
import {SignUpModel} from './login.component';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let location: Location;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [AuthService]
    }).compileComponents();   

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('1.should create', () => {
    expect(component).toBeTruthy();
  });

  it('2.should toggle between login and signup forms', () => {
    const component = fixture.componentInstance;
    expect(component.showLogin).toBeTrue(); // Initially show login form
  
    component.toggleForm();
    fixture.detectChanges();
  
    expect(component.showLogin).toBeFalse(); // After toggle, show signup form
  
    component.toggleForm();
    fixture.detectChanges();
  
    expect(component.showLogin).toBeTrue(); // Toggle back to login form
  });

  // a.password mismatch

  it('3.should alert for password mismatch', () => {
    const component = fixture.componentInstance;
    component.signUpObj.password = 'test123';
    component.signUpObj.confirmPassword = 'differentPass';
  
    spyOn(window, 'alert'); // Spy on alert function
  
    component.onRegister();
  
    expect(window.alert).toHaveBeenCalledWith('Passwords do not match.');
  });

  //Successful registration 

  it('4.should register user and store in localStorage', () => {
    const component = fixture.componentInstance;
    const signUpData = { name: 'John Doe', email: 'john@example.com', password: 'password123', phone: '1234567890', confirmPassword: 'password123' };
    component.signUpObj = signUpData;
  
    spyOn(localStorage, 'setItem'); // Spy on localStorage.setItem
  
    component.onRegister();
  
    expect(localStorage.setItem).toHaveBeenCalledWith('angular17users', JSON.stringify([signUpData]));
  });

  // wasPreviousUrl Function:

  // it('5.should return true if previous URL includes /cart', () => {
  //   const component = fixture.componentInstance;
  //   spyOn(component.auth, 'getPreviousUrl').and.returnValue('/products/item1'); // Mock previous URL  
  //   const isFromCart = component.wasPreviousUrl();  
  //   expect(isFromCart).toBeFalse(); // Not from cart  
  //   spyOn(component.auth, 'getPreviousUrl').and.returnValue('/cart'); // Mock previous URL as cart  
  //   const isFromCartAfter = component.wasPreviousUrl();  
  //   expect(isFromCartAfter).toBeTrue(); // Now from cart
  // });

  // it('6.should login user and redirect based on previous URL', () => {
  //   const component = fixture.componentInstance;
  //   const loginData = { email: 'john@example.com', password: 'password123' };
  //   component.loginObj = loginData;
  
  //   const users = [
  //     { name: 'John Doe', email: 'john@example.com', password: 'password123', phone: '1234567890', confirmPassword: 'password123' },
  //   ];
  //   spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(users)); // Mock localStorage users
    
  //   const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']); // Create a spy object for Router
  //   routerSpy.navigateByUrl.and.stub(); // Stub navigateByUrl method
    
  //   component.router = routerSpy; // Replace component's router with the spy object
    
  //   component.onLogin();
  //   fixture.detectChanges();
  //   expect(localStorage.setItem).toHaveBeenCalledWith('loggedUser', JSON.stringify(users[0])); // Store logged user  
    
  //   spyOn(component.auth, 'getPreviousUrl').and.returnValue('/cart'); // Mock previous URL as cart  
  //   component.onLogin(); // Login again  
  //   expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/payment'); // Redirect to payment  
    
  //   spyOn(component.auth, 'getPreviousUrl').and.returnValue('/products'); // Mock previous URL as products  
  //   component.onLogin(); // Login again  
  //   expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/'); // Redirect to home
  // });
  
  
  it('5.should alert for user not found', () => {
    const component = fixture.componentInstance;
    const loginData = { email: 'notfound@example.com', password: 'wrongpassword' };
    component.loginObj = loginData;  
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([ // Mock localStorage users
      { name: 'John Doe', email: 'john@example.com', password: 'password123', phone: '1234567890', confirmPassword: 'password123' },
    ])); // User with different email exists  
    spyOn(window, 'alert'); // Spy on alert function  
    component.onLogin();  
    expect(window.alert).toHaveBeenCalledWith('User not Found!! Please do SignUp First');
  });

  it('6.should login successfully', () => {
    const loginObj = new LoginModel();
    loginObj.email = 'john@example.com';
    loginObj.password = 'Password@12';
    component.loginObj = loginObj;
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{
      email: 'john@example.com',
      password: 'Password@12'
    }]));
    spyOn(localStorage, 'setItem');
    spyOn(authService, 'getPreviousUrl').and.returnValue('/cart');
    spyOn(router, 'navigateByUrl');
    component.onLogin();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/payment');
  });
  
});
