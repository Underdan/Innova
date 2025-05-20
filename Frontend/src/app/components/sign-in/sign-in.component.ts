import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
 
  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  credential: string = '';

  loading: boolean = false;

  ngOnInit(): void {
    // Lógica que quieres ejecutar al inicializar el componente
    //console.log('SignInComponent inicializado');
  }

  constructor(
    private toast: ToastrService,
    private _userService: UserService,
    private router: Router  
  ){}

  addUser(){
    if (this.name == '' || this.lastname == '' || this.email=='' || this.password == '' || this.repeatPassword == '' || this.credential == '') {
      this.toast.error("Todos los campos son obligatorios", "Error");
      return
    }

    if (this.password != this.repeatPassword) {
      this.toast.warning('Las claves son diferentes, verifica que sean iguales', "Warning")
      return
    }

    //crear el objeto

    const user: User = {
      
      name: this.name,
      lastname: this.lastname,
      email:this.email,
      password: this.password,
      credential: this.credential

    }
    

    this.loading= true
    

    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading= false
        this.toast.success(`${this.name} ${this.lastname } creado exitosamente`)
        this.router.navigate(['/logIn'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading= true
        if (e.error.msg) {
          this.loading= false
          console.log(e.error.msg);
          this.toast.warning(e.error.msg)
        }else{
          this.toast.error('Existe un error en el servidor', 'Error')
        }
      },
      complete: () => console.info('complete')
   
    })


    // this._userService.signIn(user).subscribe(data => {
    //   this.loading= false
    //   this.toast.success(`${this.name} ${this.lastname } creado exitosamente`)
    //   this.router.navigate(['/logIn'])
    // }, (event: HttpErrorResponse) =>{
    //  this.loading= true
    //  if (event.error.msg) {
    //    this.loading= false
    //   console.log(event.error.msg);
    //    this.toast.warning(event.error.msg)
    //  }else{
    //   this.toast.error('Existe un error en el servidor', 'Error')
    //  }
     
      
    // });
    
      
    }

    
}


