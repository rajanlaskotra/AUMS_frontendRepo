import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecourseComponent } from './updatecourse.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CourseService } from 'src/app/services/courseService/course.service';
import { MatButtonModule } from '@angular/material/button';

const course = {
  "courseID" : 5, 
  "courseName" : "Testing",
  "courseDesc": "Learn testing",
  "courseSkills": "Junit\, Mockito",
  "coursePrerequisites": "Java",
  "courseLocation": "Mumbai"
};

describe('UpdatecourseComponent', () => {
  let component: UpdatecourseComponent;
  let fixture: ComponentFixture<UpdatecourseComponent>;
  let service: CourseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecourseComponent ],
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
        MatButtonModule,
        MatInputModule
      ],
      providers : [
        {
          provide : CourseService,
          useValue: { updatecourse: (course) => {}}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecourseComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update a course', () => {

    component.addForm.setValue(course);

    spyOn(service, 'updatecourse');
    component.updateCourse();
    fixture.detectChanges();
    expect(service.updatecourse).toHaveBeenCalledWith(course);
    expect(component.addForm.get('courseID').value).toBe(5);
  });
});
