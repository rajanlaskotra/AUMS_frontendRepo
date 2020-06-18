import { TestBed } from '@angular/core/testing';

import { TrainerService } from './trainer.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

const mockTrainers = [
  {
    'trainerId' : 2,
    'courseId' : 1,
    'name' : 'Lokesh',
    'location' : 'Mumbai'
  },
  {
    'trainerId' : 4,
    'courseId' : 2,
    'name' : 'Prafull',
    'location' : 'Mumbai'
  }
];

describe('TrainerService', () => {
  let service: TrainerService;
  let httpMock : HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [ HttpClientTestingModule ],
      providers : [ TrainerService ]
    });
    service = TestBed.inject(TrainerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all Trainers', () => {
    service.getAllTrainers().subscribe((trainers : any) => {
      expect(trainers.length).toBe(2);
    });

    let req = httpMock.expectOne('http://localhost:8080/api/trainer/');
    expect(req.request.method).toBe('GET');
    req.flush(mockTrainers);

    service.getAllUsers().subscribe((users :any) => {
      expect(users.length).toBe(2);
    });
    let reqq = httpMock.expectOne('http://localhost:8080/api/user/');
    expect(reqq.request.method).toBe('GET');
    reqq.flush(mockTrainers);

    httpMock.verify();
  });

  it('should add trainer', () => {
    let trainer = {
      'trainerId' : 3,
      'courseId' : 6,
      'name' : 'Rajan',
      'location' : 'Mumbai'
    }
    service.addTrainer(trainer);
    let req = httpMock.expectOne('http://localhost:8080/api/trainer/add');
    expect(req.request.method).toBe('POST');
    httpMock.verify();
  });

  it('should delete a trainer', ()=> {
    let tid = 1;  let cid = 2;
    service.deleteTrainer(tid, cid);
    let req = httpMock.expectOne('http://localhost:8080/api/trainer/delete/' + tid + '/' + cid);
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
