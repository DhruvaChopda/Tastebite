import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';

import { PaymentComponent } from './payment/payment.component';

import { GooglePayButtonModule } from '@google-pay/button-angular';
import { ContactComponent } from './contact/contact.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { CustomizeComponent } from './customize/customize.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    MenuComponent,
    CartComponent,
    LoginComponent,
    PaymentComponent,
    ContactComponent,
    InquiryComponent,
    CustomizeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePayButtonModule
  ],
  // exports: [
  //   FooterComponent 
  // ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
