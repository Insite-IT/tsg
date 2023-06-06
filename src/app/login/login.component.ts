import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { User } from '../User.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) {
  }
  userinfo: User = new User();

  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  continueToLogin() {
    if (this.loginform.valid) {

      /**
       * Get the response from the json server
       */
      this.service.GetUserbyCode(this.loginform.value.id || '').subscribe(loginData => {

        /**
         * 
         */
        this.userinfo = loginData;

        /**
         * This if checks if the password entered is matches the one on the database
         */
        if (this.userinfo.password === this.loginform.value.password){

          /**
           * Checks if user is active
           */
          if (this.userinfo.isactive) {

            /**
             * Storing the user login session
             */
            sessionStorage.setItem('username',this.userinfo.id);
            sessionStorage.setItem('role',this.userinfo.role);

            /**
             * Takes you to the landing page after logging in.
             */
            this.router.navigate(['']);
          } else {
            this.toastr.error('Please contact Admin', 'InActive User');
          }
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
