import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Course } from 'src/app/models/Course';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseURL = 'http://localhost:8080/api/course/';
  headers = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) { }

  getAllCourses() {
    return this.http.get(this.baseURL);
  }

  getCourseByName(name: String) {
    return this.http.get(this.baseURL + name);
  }

  addCourse(course) {
    this.http.post(this.baseURL + 'add',course).subscribe();
  }

  updatecourse(course) {
    this.http.put(this.baseURL + 'update',course).subscribe();
  }

  deleteCourse(courseID) {
    this.http.delete(this.baseURL + 'delete/' + courseID).subscribe();
  }

  handleErrors(error: HttpErrorResponse) {
    console.log('courseService Http Error', error.message);
    return throwError(error);
  }

}
