import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import {MatSnackBar} from '@angular/material/snack-bar';

import {TrainerService} from 'src/app/services/TrainerService/trainer.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-addtrainer',
  templateUrl: './addtrainer.component.html',
  styleUrls: ['./addtrainer.component.css']
})
export class AddtrainerComponent implements OnInit {

  userList;

  addForm = new FormGroup({
    trainerID: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]\d*$/)]),
    courseID: new FormControl('', [Validators.required,Validators.pattern(/^[0-9]\d*$/)]),
  });

  constructor(private router: Router, private trainerService: TrainerService/*, private snackBar: MatSnackBar*/) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('userName')){
      this.router.navigate([`\login`]);
    }
    this.getUsers()
  }

  addTrainer() {
    this.trainerService.addTrainer(this.addForm.value);
    alert('Trainer Added Successfully');
    /*this.snackBar.open("Trainer Added. ", " Success!", {
      duration: 6000,
    });*/
    this.router.navigate([`/trainers`]);
  }

  getUsers() {
    this.trainerService.getAllUsers().subscribe((response) => {
      this.userList = response;
    })
  }
}
