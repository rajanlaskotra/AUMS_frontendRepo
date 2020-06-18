import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LoginService } from 'src/app/services/loginService/login.service';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  constructor(public OAuth: AuthService, public router: Router, public loginService: LoginService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('userId')){
      this.router.navigate([`/home`]);
    }
  }

  public async SignIn(provider: string) {
    let platform = GoogleLoginProvider.PROVIDER_ID;

    this.OAuth.signIn(platform).then(users => {
      this.loginService.Savesresponse(users);
      console.log(users);
      sessionStorage.setItem('userEmail', users.email);
      sessionStorage.setItem('userName', users.name);
      sessionStorage.setItem('photo', users.photoUrl);
      this.router.navigate([`/home`]);
    });
  }
}
