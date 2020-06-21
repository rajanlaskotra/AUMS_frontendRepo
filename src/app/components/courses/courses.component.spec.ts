import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesComponent } from './courses.component';
import { CourseService } from 'src/app/services/courseService/course.service';
import {NavBarComponent} from 'src/app/components/nav-bar/nav-bar.component';
import {AuthService} from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Course } from 'src/app/models/Course';
import { MockCourseService } from '../home/home.component.spec';

const cid =1;
export class MockService extends MockCourseService{
  deleteCourse(cid){

  }
}
describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;
  let service : CourseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesComponent, NavBarComponent ],
      imports :[
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
          provide : AuthService,
          useValue : { signOut: () => {}}
        },
        {
          provide: CourseService,
          useClass : MockService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CourseService);
    fixture.detectChanges();
  });

  it('should create & fetch courses', () => {
    expect(component).toBeTruthy();

    expect(component.CourseList.length).toBe(2);
  });

  it('should delete a course', () => {
    spyOn(service, 'deleteCourse');
    component.deleteCourse(cid);

    expect(service.deleteCourse).toHaveBeenCalled();
  });
});
