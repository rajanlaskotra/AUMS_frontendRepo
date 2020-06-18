import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Material } from 'src/app/models/Material';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  private baseURL = 'http://localhost:8080/api/material';
  //headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getMaterialActive() {
    return this.http.get(this.baseURL + '/active');
  }
  
  getAllMaterial() {
    return this.http.get(this.baseURL + '/');
  }

  deleteMaterial(materialId: any) {
    this.http.delete(this.baseURL + '/delete/' + materialId).subscribe();
  }

  addMaterial(formData) {
    
    let headers =  {headers: new  HttpHeaders({ enctype:"multipart/form-data"})};
    this.http.post(this.baseURL + '/add',formData, headers).subscribe();
  }

  handleErrors(error: HttpErrorResponse) {
    console.log('materialService Http Error', error.message);
    return throwError(error);
  }
}
