import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  error: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  loginSubmit() {
    if (!this.username) {
      this.error = 'User name can not be blank'
    } else if (!this.password) {
      this.error = 'password can not be blank'
    } else if (this.username != 'admin' && this.password != 'admin') {
      this.error = 'please enter valid username and pwd'
    } else if (this.username === 'admin' && this.password === 'admin') {
      this.error = '';
      this.router.navigate(['/dashboard'])
    }
  }
}
