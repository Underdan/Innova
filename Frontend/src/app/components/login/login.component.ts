// File: Frontend/src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private _userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  logIn() {
    if (this.email === '' || this.password === '') {
      this.toastr.error("Todos los campos son obligatorios", "Error");
      return;
    }

    const user: User = {
      email: this.email,
      password: this.password,
    };

    this.loading = true;

    this._userService.logIn(user).subscribe({
      next: (response: any) => {
        const { token, user } = response;

        localStorage.setItem('myToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.loading = false;
        this.toastr.success('Bienvenido');
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        if (e.error.msg) {
          this.toastr.warning(e.error.msg);
        } else {
          this.toastr.error('Existe un error en el servidor', 'Error');
        }
      },
      complete: () => console.info('complete')
    });
  }
}