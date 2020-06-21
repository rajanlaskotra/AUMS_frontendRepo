import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersComponent } from './trainers.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TrainerService } from 'src/app/services/TrainerService/trainer.service';
import { of } from 'rxjs';

const tid = 1;
const cid =5;

class MockService {
  getAllTrainers() {
    return of([
      {
        "trainerID" : 1,
        "courseID" : 5,
        "courseName" : "Angular",
        "userName" : "Lokesh",
        "userLocation" : "Mumbai"
      },
      {
        "trainerID" : 2,
        "courseID" : 6,
        "courseName" : "Spring",
        "userName" : "Prafull",
        "userLocation" : "Bangalore"
      }
    ]);
  }

  deleteTrainer(tid, cid) {

  }
}

describe('TrainersComponent', () => {
  let component: TrainersComponent;
  let fixture: ComponentFixture<TrainersComponent>;
  let service: TrainerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainersComponent ],
      imports : [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatTableModule,
        MatFormFieldModule,
        MatPaginatorModule
      ],
      providers : [
        {
          provide: TrainerService,
          useClass: MockService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TrainerService);
    fixture.detectChanges();
  });

  it('should create & fetch trainers', () => {
    expect(component).toBeTruthy();

    expect(component.trainerList.length).toBe(2);
  });

  it('should delete a trainer', ()=> {
    spyOn(service, 'deleteTrainer').and.callThrough();
    component.deleteTrainer(tid, cid);
    fixture.detectChanges();
    expect(service.deleteTrainer).toHaveBeenCalled();
  });
});
