import { Component } from '@angular/core';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent {
  formDataArray: any[] = []; // Define an array to store form data
  currentUser:any=[];

  handleSubmit(event: Event) {
    // event.preventDefault(); // Prevent default form submission behavior

    const formData = {
      name: {
        title: (document.getElementById('Select1') as HTMLSelectElement).value,
        firstName: (document.getElementById('fname') as HTMLInputElement).value,
        middleName: (document.getElementById('mname') as HTMLInputElement).value,
        lastName: (document.getElementById('lname') as HTMLInputElement).value
      },
      age: (document.getElementById('age') as HTMLInputElement).value,
      email: (document.getElementById('exampleInputEmail1') as HTMLInputElement).value,
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      alternatePhone: (document.getElementById('phone2') as HTMLInputElement).value,
      storesInterestedIn: (document.getElementById('sqnt') as HTMLInputElement).value,
      plannedOpeningDate: (document.getElementById('area') as HTMLInputElement).value,
      businessExperience: (document.getElementById('inlineRadio1') as HTMLInputElement).checked,
      desiredLocation: (document.getElementById('area') as HTMLInputElement).value,
      professionalBackground: (document.getElementById('tellbg') as HTMLTextAreaElement).value,
      questions: (document.getElementById('que') as HTMLTextAreaElement).value
    };
    // const localUser =  JSON.parse(this.formDataArray);
    this.formDataArray.push(formData); // Push form data into the array
    // localStorage.setItem('formData', JSON.stringify(formDataArray));
    console.log('Form data saved successfully:', this.formDataArray);
    localStorage.setItem('formData', JSON.stringify(this.formDataArray));
    alert("Your application has been submited sucessfully");
  }  
}
