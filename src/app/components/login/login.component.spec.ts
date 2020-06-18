import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { LoginService } from 'src/app/services/loginService/login.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { RouterTestingModule } from '@angular/router/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { of } from 'rxjs';
import { HomeComponent } from '../home/home.component';

export class MockAuthService {
  signIn() {
    return of(
      {
        email : "rajanlaskotra78@gmail.com",
        id : "108025185300120370481",
        idToken : "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ5MjcxMGE3ZmNkYjE1Mzk2MGNlMDFmNzYwNTIwYTMyYzg0NTVkZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjQzMDQ2MzY3OTg3LTVjc2s1bmhoNjFsdnRxOGI0MnFzYW43Nm5lYzIxbmhkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjQzMDQ2MzY3OTg3LTVjc2s1bmhoNjFsdnRxOGI0MnFzYW43Nm5lYzIxbmhkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4MDI1MTg1MzAwMTIwMzcwNDgxIiwiZW1haWwiOiJyYWphbmxhc2tvdHJhNzhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJnOEdtd0FCQ3l5aHpxUG12YWtLYWFnIiwibmFtZSI6IlJhamFuIExhc2tvdHJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqZHhWWFZoYUhhOEpjb3VaX1kxTW1ycWFCMGpxTUlILW1NLVVzQT1zOTYtYyIsImdpdmVuX25hbWUiOiJSYWphbiIsImZhbWlseV9uYW1lIjoiTGFza290cmEiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU5MTk0ODI5MSwiZXhwIjoxNTkxOTUxODkxLCJqdGkiOiIxNGI5NTcwZDM0NDYwNDQ2NWZiMDNiZjdjNDc3NzVjZTMyZGMzM2U4In0.KN65BBSPtolPueNwk-jfg4XTnfnuLxKibijFSFNcs29rxtMOwReGMRTqSXw3ORf7xPcc0gZVM0HvILVzudGM-32suwSV1bBh56WRwNvr1RxDsR7wjTdGLRe8YExR7n36QM97n9JgFxlhl3QtQZn19C0KzHOPF66RK633exfypPc6cZjg05Wz34r1dQNIfBv4RRusvv0HN6M-bmvtD327HLA0J5ddJK3bYtcV5uuyJLCSt9kmlxPf6bPi0zVVPgqRDGodImOdqP-eogokx6k3ehHfFuPYkX2qbtz4MnBRyWsA-5ZnTDIkj8EznWPRWTrdc_ezjt0jBlVyU7y4fbwL7Q",
        photoUrl : "https://lh3.googleusercontent.com/a-/AOh14GjdxVXVhaHa8JcouZ_Y1MmrqaB0jqMIH-mM-UsA=s96-c",
        provider : "GOOGLE",
        name : "Rajan Laskotra"
      }
    ).toPromise();
  }
}

export class MockLoginService {
  Savesresponse(){
    return of(
      {
        "UserID" : 1,
        "userName" : "Rajan Laskotra",
        "email" : "rajanlaskotra78@gmail.com",
        "userLocation" : "Mumbai"
      }
    );
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let OAuth: AuthService;
  let loginService: LoginService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, HomeComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule
      ],
      providers : [
        {
          provide: AuthService,
          useClass: MockAuthService
        },
        {
          provide: LoginService,
          useClass: MockLoginService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.get(LoginService);
    OAuth = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do google login', () => {
    spyOn(OAuth, 'signIn').and.callThrough();
    component.SignIn('google');
    fixture.detectChanges();
    expect(OAuth.signIn).toHaveBeenCalled();
  });
});