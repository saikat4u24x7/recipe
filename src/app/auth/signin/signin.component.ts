import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  errorMessage:string;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let formdata = new FormData;
    formdata.append('email', form.value.email);
    formdata.append('password', form.value.password);
    this.authService.onSignin(formdata).subscribe(
      (resp) => {
        if (resp.type == "success") {
          this.router.navigate(['/recipes']);
        } else {
          this.errorMessage = resp.message;
        }
        
      }
    );
  }

}
