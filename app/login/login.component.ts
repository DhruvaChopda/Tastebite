import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Router, NavigationEnd,RoutesRecognized } from '@angular/router';
import {filter, pairwise } from 'rxjs/operators';
import {AuthService} from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isSignDivVisiable: boolean  = true;
  confirmPassword:string="";

  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();
  showLogin: boolean = true;
  previousUrl: string ="";
  currentUrl: string="";
  registrationForm: FormGroup;
  
  constructor(private location: Location, public router: Router, public auth: AuthService,private fb: FormBuilder){
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      confirmPassword: ['', Validators.required]
    })    
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.previousUrl = this.currentUrl;
      this.currentUrl = event.url;
      localStorage.setItem('previousUrl', JSON.stringify(this.previousUrl))      
    });
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
  }

  onRegister() {
    // const errorMessages = [];

    if (this.signUpObj.password !== this.signUpObj.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    debugger;
    const localUser = localStorage.getItem('angular17users');
    if(localUser != null) {
      const users =  JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('angular17users', JSON.stringify(users))
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('angular17users', JSON.stringify(users))
    }
    alert('Registration Successfully')
  }


  @ViewChild('registrationForm') regForm : any
  
  check(){
  console.log('regForm',this.regForm);
  }
  //------------------------login---------------------------------------------------
  prev:string="";
  wasPreviousUrl(): boolean {
 
    const cartRoute = '/cart'; 
    this.prev = this.auth.getPreviousUrl();
    console.log(this.prev);
    const isFromCart = this.prev.includes(cartRoute);
    // const isFromCart = this.previousUrl.toLowerCase().includes(cartRoute.toLowerCase());
    console.log('Is from cart:', isFromCart);
    return isFromCart;
  }

  

  onLogin() {
    
    debugger;
    const localUsers =  localStorage.getItem('angular17users');
    if(localUsers != null) {
      const users =  JSON.parse(localUsers);

      const isUserPresent =  users.find( (user:SignUpModel)=> user.email == this.loginObj.email && user.password == this.loginObj.password);
      if(isUserPresent != undefined) {
          alert("Login Successfull");
          localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
          if (this.wasPreviousUrl()) {
            this.router.navigateByUrl('/payment');
          } else {
            this.router.navigateByUrl('/');
          }              
      }else {
        alert("User not Found!! Please do SignUp First")
      }
    }
  }

  

}

export class SignUpModel  {
  name: string;
  email: string;
  password: string;
  phone:string;
  confirmPassword:string;
  constructor() {
    this.email = "";
    this.name = "";
    this.password= "";
    this.phone="";
    this.confirmPassword="";
  }
}

export class LoginModel  { 
  email: string;
  password: string;

  constructor() {
    this.email = ""; 
    this.password= ""
  }


}
