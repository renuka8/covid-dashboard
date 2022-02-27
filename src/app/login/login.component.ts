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
      this.error = 'Password can not be blank'
    } else if (this.username != 'admin' && this.password != 'admin') {
      this.error = 'Please enter valid username and pwd'
    } else if (this.username === 'admin' && this.password === 'admin') {
      this.error = '';
      this.router.navigate(['/dashboard'])
    }
  }
}
