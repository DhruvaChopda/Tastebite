
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; 
import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('1.should create', () => {
    expect(component).toBeTruthy();
  });
  // 1. Component Initialization and Data Binding:
  // it('2.should create the component and initialize currentUser, cartData, myDate', () => {
  //   expect(component).toBeTruthy();
  //   expect(component.currentUser).toBeDefined();
  //   expect(component.cartData).toEqual([]); // Assuming empty initial cart
  //   expect(component.myDate).toBeDefined(); // Date object expected
  // });

  // 2. loadCart Function:

  it('3.should load cart data from localStorage if it exists', () => {
    const mockCartData = [{ prize: 10, qnt: 2 }];
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockCartData));
  
    component.loadCart();
  
    expect(component.cartData).toEqual(mockCartData);
  });

  // it('4.should handle empty localStorage (no cart data)', () => {
  //   spyOn(localStorage, 'getItem').and.returnValue(null);  
  //   component.loadCart();  
  //   expect(component.cartData).toEqual([]);
  // });

  // 3. calculateGST and calculateTotal Functions:

  it('5.should calculate GST correctly (18% of stotal)', () => {
    component.stotal = 100;
    component.calculateGST();
  
    expect(component.gst).toBeCloseTo(18, 2); // Allow slight rounding error
  });

  it('6.should calculate total correctly for dine-in (stotal + gst)', () => {
    component.stotal = 100;
    component.calculateGST();
    component.calculateTotal(); // Assuming dine-in is selected initially
  
    expect(component.total).toBeCloseTo(118, 2);
  });

  it('7.should calculate total correctly for delivery (stotal + gst + Dfees)', () => {
    component.stotal = 100;
    component.calculateGST();
    component.selectedOption = 'delivery';
    component.calculateTotal();
  
    expect(component.total).toBeCloseTo(168, 2);
  });

  // 4. onRadioButtonChange Function:

  it('8.should update selectedOption and recalculate total on radio button change', () => {
    component.stotal = 100;
    component.calculateTotal(); // Assuming dine-in is selected initially
    component.calculateGST();
    component.onRadioButtonChange({ target: { value: 'delivery' } });    
    expect(component.selectedOption).toBe('delivery');
    expect(component.total).toBeCloseTo(168, 2);
  });

  // 5. closeQRCodeModal Function and paymentSuccess Flag:


  it('9.should set paymentSuccess to true and log a message when closeQRCodeModal is called', () => {
    spyOn(console, 'log'); // Spy on console.log for testing
  
    component.closeQRCodeModal();
  
    expect(component.paymentSuccess).toBeTrue();
    expect(console.log).toHaveBeenCalledWith('Modal closed!');
  });

  // razorpay integration test

  
});

