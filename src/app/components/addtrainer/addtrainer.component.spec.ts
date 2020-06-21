import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtrainerComponent } from './addtrainer.component';
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
import { TrainerService } from 'src/app/services/TrainerService/trainer.service';
import { MockTrainerService } from '../home/home.component.spec';

const trainer = {
  "trainerID" : 1,
  "courseID" : 6
}

class MockService extends MockTrainerService{
  addTrainer(trainer){

  }
}

describe('AddtrainerComponent', () => {
  let component: AddtrainerComponent;
  let fixture: ComponentFixture<AddtrainerComponent>;
  let service: TrainerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtrainerComponent, NavBarComponent ],
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
          provide: TrainerService,
          useClass: MockService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtrainerComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TrainerService);
    fixture.detectChanges();
  });

  it('should create & fetch available trainers', () => {
    expect(component).toBeTruthy();

    expect(component.userList.length).toBe(2);
  });

  it('should add a trainer',() => {

    spyOn(service, 'addTrainer');
    component.addTrainer();
    fixture.detectChanges();
    expect(service.addTrainer).toHaveBeenCalled();
  })

});
