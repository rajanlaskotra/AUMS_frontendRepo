import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/courseService/course.service';
//import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.css']
})
export class AddcourseComponent implements OnInit {

  addForm = new FormGroup({
    courseName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    courseDesc: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9\' ]*')]),
    courseSkills: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z, ]*')]),
    coursePrerequisites: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z, ]*')]),
    courseLocation: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
  });

  constructor(private router: Router, private courseService: CourseService/*, private snackBar: MatSnackBar*/) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('userId')){
      this.router.navigate([`\login`]);
    }
  }

  addCourse() {
    this.courseService.addCourse(this.addForm.value);
    alert('Course Added Successfully');
    /*this.snackBar.open("Course Added. ", " Success!", {
      duration: 2000,
    });*/
    this.router.navigate([`/courses`]);
  }

}
