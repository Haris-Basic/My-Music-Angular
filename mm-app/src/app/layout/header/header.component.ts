import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private jwtHelper : JwtHelperService, private router: Router) { }

  ngOnInit(): void {
  }

  isAuthenticated(){
    const token: string = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    } else {
      return false;
    }
  }

  logOut(){
    localStorage.removeItem("jwt");
    this.router.navigate(['login']);
  }

}
