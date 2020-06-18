import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import {CourseService} from 'src/app/services/courseService/course.service';
import { SocialLoginModule, AuthService } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/models/Course';
import { TrainerService } from 'src/app/services/TrainerService/trainer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user : User;
  userList;
  time;

  courseList: Course[] = [];
  locations = ['Bangalore', 'Chennai', 'Delhi', 'Mumbai', 'Online'];
  count = [0,0,0,0,0];

  public doughnutChartLabels = this.locations;
  public doughnutChartData = [2,2,2,2,2];
  public doughnutChartType = 'doughnut';

  tlocation = ['Bangalore', 'Chennai', 'Delhi', 'Mumbai'];
  tcount = [0,0,0,0];

  public pieChartLabels = this.tlocation;
  public pieChartData = [2,2,2,2];
  public pieChartType = 'pie';

  constructor(public router: Router, public OAuth: AuthService, public courseService: CourseService, public trainerService: TrainerService) { }

  ngOnInit(): void {
    this.user = new User();
    this.time = new Date();
    if(!sessionStorage.getItem('userName')){
      this.router.navigate([`\login`]);
    }
    this.user.id=sessionStorage.getItem('userId');
    this.user.email = sessionStorage.getItem('userEmail');
    this.user.name = sessionStorage.getItem('userName');
    this.user.photo = sessionStorage.getItem('photo');
    this.getAllCourses();
    this.getUsers();
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe((response : Course[])=> {
        this.courseList = response;
        this.getLocationCounts();
        console.log(this.courseList);
    });
  }

  getLocationCounts() {
    for(let course of this.courseList) {
      if(this.locations.includes(course.courseLocation)) {
        let idx = this.locations.indexOf(course.courseLocation);
        this.count[idx] += 1;
      }
    }
    this.doughnutChartData = this.count;
  }
  
  getUsers() {
    this.trainerService.getAllUsers().subscribe((response) => {
      this.userList = response;
      this.getTrainerLocationCount();
    })
  }

  getTrainerLocationCount() {
    for(let user of this.userList) {
      if(this.tlocation.includes(user.userLocation)) {
        let idx = this.tlocation.indexOf(user.userLocation);
        this.tcount[idx] += 1;
      }
    }
    this.pieChartData = this.tcount;
  }

}
