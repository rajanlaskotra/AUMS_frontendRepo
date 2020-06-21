import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import {AuthService} from 'angularx-social-login';
import{RouterTestingModule} from '@angular/router/testing';
import{MatToolbarModule} from '@angular/material/toolbar';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let OAuth: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      imports : [
        RouterTestingModule,
        MatToolbarModule
      ],
      providers : [
        {
          provide : AuthService,
          useValue : { signOut: () => { return of({}).toPromise(); }} 
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    OAuth = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do logout',() => {
    spyOn(OAuth, 'signOut').and.callThrough();
    component.logout();
    fixture.detectChanges();
    expect(OAuth.signOut).toHaveBeenCalled();
  });
});
