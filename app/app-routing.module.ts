import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { AuthService } from './auth.service';
import { InquiryComponent } from './inquiry/inquiry.component';
import { ContactComponent } from './contact/contact.component';
import { CustomizeComponent } from './customize/customize.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [{
  path:"",component: HomeComponent
},{
  path:"about",component: AboutComponent
},{
  path:"menu",component: MenuComponent
},{
  path:"cart",component: CartComponent
},
{path:"login",component: LoginComponent},
{path:"payment",component: PaymentComponent},
{path:"inq",component: InquiryComponent},
{path:"contact",component: ContactComponent},
{path:"customize",component: CustomizeComponent},
{path:"footer",component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
