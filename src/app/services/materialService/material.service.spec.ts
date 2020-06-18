import { TestBed } from '@angular/core/testing';

import { MaterialService } from './material.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { throwError } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { error } from 'protractor';
import { serialize } from 'v8';

const mockMaterials = [
  {
    'materialId' : 1,
    'courseId' : 6,
    'fileName' : 'Angular.txt',
    'active_flag' : 'N'
  },
  {
    'materialId' : 2,
    'courseId' : 7,
    'fileName' : 'Testing.pdf',
    'active_flag' : 'Y'
  },
  {
    'materialId' : 1,
    'courseId' : 6,
    'fileName' : 'AngularNew.txt',
    'active_flag' : 'Y'
  }
];

describe('MaterialService', () => {
  let service: MaterialService;
  let httpMock : HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [ HttpClientTestingModule ],
      providers : [ MaterialService ]
    });
    service = TestBed.inject(MaterialService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all materials', () => {

    service.getAllMaterial().subscribe((materials : any) => {
      expect(materials.length).toBe(3);
    });

    let req = httpMock.expectOne('http://localhost:8080/api/material/');
    expect(req.request.method).toBe('GET');
    req.flush(mockMaterials);
    httpMock.verify();
  });

  it('should get active materials', () => {

    service.getMaterialActive().subscribe((material : any) => {
      expect(material.length).toBe(2);
    });

    let req = httpMock.expectOne('http://localhost:8080/api/material/active');
    expect(req.request.method).toBe('GET');
    req.flush(mockMaterials.slice(1));
    httpMock.verify();    
  });

  it('should add material', () => {
    let material = {
      'materialId' : 5,
      'courseId' : 7,
      'fileName' : 'Java.txt',
      'active_flag' : 'Y'
    };

    service.addMaterial(material);
    let req = httpMock.expectOne('http://localhost:8080/api/material/add');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers).toBeDefined();
    httpMock.verify();
  });

  it('should delete material', () => {

    let mid = 5;
    service.deleteMaterial(mid);
    let req = httpMock.expectOne('http://localhost:8080/api/material/delete/' + mid);
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
