import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Trainer } from 'src/app/models/Trainer';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private baseURL = 'http://localhost:8080/api/trainer/'; 
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllTrainers() {
    return this.http.get(this.baseURL);
  }
  
  getAllUsers() {
    return this.http.get('http://localhost:8080/api/user/');
  }

  addTrainer(trainer){
    this.http.post(this.baseURL + 'add', trainer).subscribe();
  }

  deleteTrainer(trainerID,courseID) {
    this.http.delete(this.baseURL + 'delete/' + trainerID + '/' + courseID).subscribe();
  }

  handleErrors(error: HttpErrorResponse) {
    console.log('trainerService Http Error', error.message);
    return throwError(error);
  }
}
