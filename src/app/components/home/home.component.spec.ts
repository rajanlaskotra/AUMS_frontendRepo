import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService, SocialUser } from 'angularx-social-login';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

import {CourseService} from 'src/app/services/courseService/course.service';
import { of } from 'rxjs';
import { TrainerService } from 'src/app/services/TrainerService/trainer.service';

export class MockCourseService{
  getAllCourses(){
    return of([{
      "courseId" : 1,
      "courseName" : "Angular",
      "courseSkills" : "TypeScript",
      "courseLocation" : "Mumbai"
      },
      {
      "courseId" : 2,
      "courseName" : "Spring",
      "courseSkills" : "Java",
      "courseLocation" : "Bangalore"
      }
    ]);
  }
}

export class MockTrainerService {
  getAllUsers(){
    return of([
      {
        "userId" : 1,
        "userName" : "Lokesh",
        "userLocation" : "Mumbai",
      },
      {
        "userId" : 2,
        "userName" : "Prafull",
        "userLocation" : "Chennai",
      }
    ]);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, NavBarComponent ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatToolbarModule,
        FlexLayoutModule,
        ChartsModule,
      ],
      providers: [
        {
          provide : AuthService,
          useValue : { navigate: () => {}} 
        },
        {
          provide : CourseService,
          useClass : MockCourseService
        },
        {
          provide : TrainerService,
          useClass : MockTrainerService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create & fetch all data', () => {
    expect(component).toBeTruthy();

    expect(component.courseList.length).toBe(2);
    expect(component.userList.length).toBe(2);
  });

});
