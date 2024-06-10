import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  serviceFormDataArray:any =[];
  currentUser:any=[]

  // Submit(event: Event) {
    // event.preventDefault();
    Submit() {

    const serviceFormData = {
      name: {
        // title: (document.getElementById('Select1') as HTMLSelectElement).value,
        firstName: (document.getElementById('fname') as HTMLInputElement).value,
        middleName: (document.getElementById('mname') as HTMLInputElement).value,
        lastName: (document.getElementById('lname') as HTMLInputElement).value
      },
      email: (document.getElementById('exampleInputEmail1') as HTMLInputElement).value,
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      service: (document.getElementById('Select1') as HTMLSelectElement).value,
      noOfGuests: (document.getElementById('guest') as HTMLInputElement).value,
    };

    this.serviceFormDataArray.push(serviceFormData); // Push form data into the array
    console.log('Form data saved successfully:', this.serviceFormDataArray);
    localStorage.setItem('serviceFormData', JSON.stringify(this.serviceFormDataArray));
    alert("Your application has been submited sucessfully");
  }
}
