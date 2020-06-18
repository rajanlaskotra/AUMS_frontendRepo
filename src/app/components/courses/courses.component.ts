import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
//import {MatSnackBar} from '@angular/material/snack-bar';

import { Course } from 'src/app/models/Course';
import { CourseService } from 'src/app/services/courseService/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['courseID', 'courseName', 'courseDesc','courseSkill', 'coursePrerequisites','courseLocation','delete','update'];
  CourseList: any;
  dataSource: MatTableDataSource<Course>;
  form = new FormControl();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private courseService: CourseService, private router: Router/*, private snackBar: MatSnackBar*/) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('userId')){
      this.router.navigate([`\login`]);
    }
    this.courseService.getAllCourses().subscribe((response) => {
      console.log(response);
      this.CourseList = response;
      this.dataSource = new MatTableDataSource(this.CourseList);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  deleteCourse(courseId) {
    console.log(courseId);
    if(confirm('Are You Sure to delete the Course?')){
      this.courseService.deleteCourse(courseId);
      alert('Course Deleted Successfully');
      /*this.snackBar.open("Course Deleted", "Success!", {
        duration: 2000,
      });*/
      this.ngOnInit();
    }
  }

}
