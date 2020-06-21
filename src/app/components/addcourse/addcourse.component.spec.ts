import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcourseComponent } from './addcourse.component';
import {NavBarComponent} from 'src/app/components/nav-bar/nav-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthService } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { CourseService } from 'src/app/services/courseService/course.service';
import { MockCourseService } from '../home/home.component.spec';

const course = {
  "courseName" : "Testing",
  "courseDesc": "Learn testing",
  "courseSkills": "Junit\, Mockito",
  "coursePrerequisites": "Java",
  "courseLocation": "Mumbai"
};

class MockService extends MockCourseService {
  addCourse(course){
  }
}

describe('AddcourseComponent', () => {
  let component: AddcourseComponent;
  let fixture: ComponentFixture<AddcourseComponent>;
  let service: CourseService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcourseComponent, NavBarComponent],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatCardModule,
        MatInputModule
      ],
      providers : [
        {
          provide : AuthService,
          useValue: { signOut: () => {}}
        },
        {
          provide: CourseService,
          useClass: MockService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcourseComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a course', () => {
    component.addForm.setValue(course);

    spyOn(service, 'addCourse');
    component.addCourse();
    fixture.detectChanges();
    expect(service.addCourse).toHaveBeenCalledWith(course);
    expect(component.addForm.get('courseName').value).toBe('Testing');
  });
});
