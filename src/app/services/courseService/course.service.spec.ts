import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { error } from 'protractor';

const mockCourses = [
  {
    'courseId' : 1,
    'courseName' : 'Angular',
    'courseLocation' : 'Mumbai'
  },
  {
    'courseId' : 2,
    'courseName' : 'Spring',
    'courseLocation' : 'Bangalore'
  }
];

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        CourseService
      ]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get All courses', () => {
    
    service.getAllCourses().subscribe((courses : any) => {
      expect(courses.length).toBe(2);
    });

    let req = httpMock.expectOne('http://localhost:8080/api/course/');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
    httpMock.verify();
  });

  it('should get course By name', () => {

    let name = 'Spring';
    service.getCourseByName(name).subscribe((course : any) => {
      expect(course.courseId).toBe(2);
    });

    let req = httpMock.expectOne('http://localhost:8080/api/course/' + name);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[1]);
    httpMock.verify();
  });

  it('should add a course', () => {

    const course = {
      'courseId' : 3,
      'courseName' : 'Java',
      'courseLocation' : 'Mumbai'
    };

    service.addCourse(course);

    let req = httpMock.expectOne('http://localhost:8080/api/course/add');
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('should update course', () => {

    service.updatecourse(mockCourses[0]);
    let req = httpMock.expectOne('http://localhost:8080/api/course/update');
    expect(req.request.method).toBe('PUT');
    httpMock.verify();
  });

  it('should delete a course', () => {

    service.deleteCourse(1);
    let req = httpMock.expectOne('http://localhost:8080/api/course/delete/1');
    expect(req.request.method).toBe('DELETE');
    httpMock.verify();
  });

  it('should handle error', () => {
    let err = new HttpErrorResponse({
      statusText: "Error Created"
    });
    service.handleErrors(err).subscribe((error : any) => {
      expect(error.statusText).toBe('Error Created');
    });
  });
});
