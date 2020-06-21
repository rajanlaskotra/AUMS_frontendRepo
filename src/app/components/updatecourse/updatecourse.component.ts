import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/courseService/course.service';

@Component({
  selector: 'app-updatecourse',
  templateUrl: './updatecourse.component.html',
  styleUrls: ['./updatecourse.component.css']
})
export class UpdatecourseComponent implements OnInit {

  addForm = new FormGroup({
    courseID: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]\d*$/),Validators.minLength(1),Validators.maxLength(3)]),
    courseName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    courseDesc: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    courseSkills: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z, ]*')]),
    coursePrerequisites: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z, ]*')]),
    courseLocation: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
  });

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('userId')){
      this.router.navigate([`\login`]);
    }
  }

  updateCourse() {
    this.courseService.updatecourse(this.addForm.value);
    alert('Course Updated Successfully');
    this.router.navigate([`/courses`]);
  }

}
