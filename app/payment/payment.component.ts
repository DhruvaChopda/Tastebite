import { Component, OnInit , ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {jsPDF} from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers:[DatePipe]
})

export class PaymentComponent implements OnInit {
  currentUser:any=[];
  selectedOption: string = 'dineIn';;
  paymentMethod: string = "";
  deliveryAddress: string = "";
  selectedPaymentOption: string="";
  Dfees: number=50;
  paymentSuccess: boolean = false;

  //for gpay
  // title='AngularGooglePay';
  // buttonColor="black";
  // buttonType="buy";
  // isCustomSize=250;
  // buttonHeight=50;
  isTop = window == window.top;
  myDate:any = new Date();
  cartData: any=[];

  constructor(private auth: AuthService, private router: Router,private datePipe: DatePipe,private cdr: ChangeDetectorRef) {
    this.cartData = this.auth.getLocalCart();
    console.log('Cart Data:', this.cartData);

    this.myDate = this.datePipe.transform(this.myDate, 'dd/MM/yyyy');
  }

  @ViewChild('content',{static:false}) el!: ElementRef;
  // @ViewChild('dineIn', { static: true }) dineInRadioButton!: ElementRef;
  // @ViewChild('delivery', { static: true }) deliveryRadioButton!: ElementRef;

  ngOnInit(): void {
    this.currentUser = this.auth.getCurrentUser();
    this.loadCart();
    this.calculateGST();
    this.calculateTotal();
    // this.cartData=[]; //change:20-5
  }

  onSubmit(form: any) {
    console.log('Form submitted:', form.value);
    // You can perform further actions here, like sending data to backend
  }


  options:any = {
    key: '//add your razorpay key',
    amount: "total * 100", // paise format 
    currency: 'INR',
    name: 'Tastebite', 
    description: '', 
    image: '../../assets/Images/Logo.png',
    handler: function (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
    }, 
    order_id: '',
    modal: {
      escape: false,
    },
    theme: {
      color: '#0c238a'
    }
  };

  stotal:number=0;
  loadCart(){
    
    if(localStorage.getItem('localCart')){
      this.cartData = JSON.parse(localStorage.getItem('localCart') || '');
      this.stotal=  this.cartData.reduce(function(acc:any , val:any){
        return Math.round(acc + (val.prize * val.qnt));
      }, 0);
    }
  }

  // loadCart(): void {
  //   const localCart = localStorage.getItem('localCart');
  //   if (localCart) {
  //     this.cartData = JSON.parse(localCart);
  //     this.stotal = this.cartData.reduce((acc: number, val: any) => acc + (val.prize * val.qnt), 0);
  //   }
  // }

  gst: number = 0;
  calculateGST() {
    this.gst = Math.round(this.stotal * 0.18); 
  }

  total: number = 0;
  calculateTotal() {
    if (this.selectedOption === 'dineIn') {
      this.total = Math.round(this.gst + this.stotal);
    } else if (this.selectedOption === 'delivery') {
      this.total = Math.round(this.gst + this.stotal + this.Dfees);
    }
    // Consider removing unnecessary else blocks if radio buttons are guaranteed to be available.
    console.log('Selected Option:', this.selectedOption);
  }

  onRadioButtonChange(event: any) {
    this.selectedOption = event.target.value;
    this.calculateTotal(); // Recalculate total after selection change
  }
  
  closeQRCodeModal() {
    console.log("Modal closed!");
    this.paymentSuccess = true;
  }


  rzp1:any='';
   pay(total: any){
    this.options['handler']=this.razorPaySuccessHandler.bind(this);
    this.options.amount = total * 100;
    this.rzp1 = new this.auth.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
    this.calculateTotal();
    console.log(this.total);
   }


   razorPaySuccessHandler(response: any) {
    console.log(response);
    this.paymentSuccess = true; // Set paymentSuccess to true upon successful payment
    console.log(this.paymentSuccess);
    this.cdr.detectChanges();
    alert('Payment Successful');
}

  makePDF() {
    // Implement your logic to print the bill here
    console.log('Printing bill...');
    let pdf = new jsPDF('p', 'pt', [2000,1334]);
    
    pdf.html(this.el.nativeElement,{
      callback:(pdf)=>{
        pdf.save('bill.pdf');
      }
    });
    
  }

  // onLoadPaymentData(event: any) {
  //   // Implement your logic to handle payment data loading here
  //   console.log('Payment data loaded:', event);
  // }

  
  }


  
   



