import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let formdata = new FormData;
    formdata.append('name', form.value.name);
    formdata.append('email', form.value.email);
    formdata.append('password', form.value.password);
    this.authService.onSignup(formdata).subscribe(
      (resp) => {
        this.router.navigate(['/recipes']);
      }
    );
  }

}
