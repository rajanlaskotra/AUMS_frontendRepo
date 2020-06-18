import { TestBed/*, async, inject*/ } from '@angular/core/testing';

import { LoginService } from './login.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers : [
        LoginService
      ]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get userID', /*async(inject([HttpTestingController, LoginService],
    (httpClient: HttpTestingController, postService: LoginService)*/() => {

    const user = [
      {
        "userID" : 1,
        "userName" : "Rajan Laskotra",
        "email" : "rajanlaskotra78@gmail.com",
        "userLocation" : "Mumbai"
      }
    ];
    const social = {
      email : "rajanlaskotra78@gmail.com",
      id : "108025185300120370481",
      idToken : "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ5MjcxMGE3ZmNkYjE1Mzk2MGNlMDFmNzYwNTIwYTMyYzg0NTVkZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjQzMDQ2MzY3OTg3LTVjc2s1bmhoNjFsdnRxOGI0MnFzYW43Nm5lYzIxbmhkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjQzMDQ2MzY3OTg3LTVjc2s1bmhoNjFsdnRxOGI0MnFzYW43Nm5lYzIxbmhkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4MDI1MTg1MzAwMTIwMzcwNDgxIiwiZW1haWwiOiJyYWphbmxhc2tvdHJhNzhAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJnOEdtd0FCQ3l5aHpxUG12YWtLYWFnIiwibmFtZSI6IlJhamFuIExhc2tvdHJhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqZHhWWFZoYUhhOEpjb3VaX1kxTW1ycWFCMGpxTUlILW1NLVVzQT1zOTYtYyIsImdpdmVuX25hbWUiOiJSYWphbiIsImZhbWlseV9uYW1lIjoiTGFza290cmEiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU5MTk0ODI5MSwiZXhwIjoxNTkxOTUxODkxLCJqdGkiOiIxNGI5NTcwZDM0NDYwNDQ2NWZiMDNiZjdjNDc3NzVjZTMyZGMzM2U4In0.KN65BBSPtolPueNwk-jfg4XTnfnuLxKibijFSFNcs29rxtMOwReGMRTqSXw3ORf7xPcc0gZVM0HvILVzudGM-32suwSV1bBh56WRwNvr1RxDsR7wjTdGLRe8YExR7n36QM97n9JgFxlhl3QtQZn19C0KzHOPF66RK633exfypPc6cZjg05Wz34r1dQNIfBv4RRusvv0HN6M-bmvtD327HLA0J5ddJK3bYtcV5uuyJLCSt9kmlxPf6bPi0zVVPgqRDGodImOdqP-eogokx6k3ehHfFuPYkX2qbtz4MnBRyWsA-5ZnTDIkj8EznWPRWTrdc_ezjt0jBlVyU7y4fbwL7Q",
      photoUrl : "https://lh3.googleusercontent.com/a-/AOh14GjdxVXVhaHa8JcouZ_Y1MmrqaB0jqMIH-mM-UsA=s96-c",
      provider : "GOOGLE",
      name : "Rajan Laskotra"
    };
    service.Savesresponse(social);

    let req = httpMock.expectOne('http://localhost:8080/api/user/rajanlaskotra78@gmail.com');
    expect(req.request.method).toBe("GET");
    expect(req.request.responseType).toEqual('json');
    req.flush(user);
    expect(service.user[0].userID).toBe(1);
    httpMock.verify();   
  });
});
