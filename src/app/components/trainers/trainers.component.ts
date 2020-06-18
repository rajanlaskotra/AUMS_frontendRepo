import { Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {Trainer} from 'src/app/models/Trainer';
import { TrainerService } from 'src/app/services/TrainerService/trainer.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  displayedColumns: string[] = ['trainerID', 'courseID', 'courseName', 'name', 'email', 'location', 'feedback', 'delete'];
  trainerList: any;
  dataSource: MatTableDataSource<Trainer>;
  form = new FormControl();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private trainerService: TrainerService, private router: Router) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('userId')){
      this.router.navigate([`\login`]);
    }
    this.trainerService.getAllTrainers().subscribe((response) => {
      console.log(response);
      this.trainerList = response;
      this.dataSource = new MatTableDataSource(this.trainerList);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  deleteTrainer(trainerId, courseID) {
    console.log(trainerId, courseID);
    if(confirm('Are You Sure to remove this trainer?')){
      this.trainerService.deleteTrainer(trainerId, courseID);
      alert('trainer Deleted Successfully');
      this.ngOnInit();
    }
  }

}

