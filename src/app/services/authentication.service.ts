import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiLink=environment.apiLink;
  
  constructor(public http: HttpClient) { }

  login(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { action: 'login',email:data.email,password:data.password}, httpOptions
    )
  }
  
  register(data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `${this.apiLink}`,
      { 
        action: 'register',
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
      }, 
      httpOptions
    )
  }
}
