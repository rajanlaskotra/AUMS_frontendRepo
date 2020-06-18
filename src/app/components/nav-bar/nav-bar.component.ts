import { Component, OnInit } from '@angular/core';
import { AuthServiceConfig, AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public OAuth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    if(confirm("Want to logout?")){
      sessionStorage.clear();
      this.OAuth.signOut().then(user =>{
        this.router.navigate([`/login`]);
        });
    }
  }

}
