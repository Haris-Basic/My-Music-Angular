import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: NgForm;
  invalidLogin: boolean;

  constructor(private builder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login(form: NgForm) {
    const credential = {
      'username': form.value.username,
      'password': form.value.password
    }
    this.http.post('https://localhost:44319/api/auth/login', credential).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(['songs']);
    }, err => {
      console.log(err);
    });
    this.invalidLogin = true;
  }
}
