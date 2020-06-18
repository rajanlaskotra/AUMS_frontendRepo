import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseURL = 'http://localhost:8080/api/user/';
  user: any;

  constructor(private http: HttpClient) { }

   async Savesresponse(response) {
    this.http.get(this.baseURL + response.email).subscribe((response)=>{
    this.user = response;
    console.log(this.user);
    sessionStorage.setItem('userId', this.user.userID);
    });
  }
}
