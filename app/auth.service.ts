import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';

function _window() : any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
  
  cartSubject = new Subject<any>();
  
  get nativeWindow() : any {
    return _window();
  }
  
  // getCurrentUser(){
  //   const currentUser = JSON.parse(localStorage.getItem('loggedUser') || ""); 
  //   return currentUser ? currentUser : [];

  // }

  getCurrentUser() {
    const currentUserJson = localStorage.getItem('loggedUser');
    if (currentUserJson) {
        try {
            return JSON.parse(currentUserJson);
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error);
            return null; // or handle the error appropriately
        }
    } else {
        return null; // or undefined, depending on your application logic
    }
}


  getLocalCart(): any {
    return JSON.parse(localStorage.getItem('localCart') || '[]');
  }
  


  //for login---------
  private previousUrl: string = '';
  setPreviousUrl(url: string): void {
    localStorage.setItem('previousUrl', url);
  }

  getPreviousUrl(): string {
    return JSON.parse(localStorage.getItem('previousUrl')||"");
  }

  
}

