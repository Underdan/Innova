import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private AppUrl: string;
  private APIUrl: string;

  constructor(private Http: HttpClient ) { 
    this.AppUrl= environment.apiUrl
    this.APIUrl= 'api/user'
  }

  signIn(user: User): Observable<any>{
    return this.Http.post(`${this.AppUrl}${this.APIUrl}/register/`, user)
  }
  logIn(user: User): Observable<string>{
    return this.Http.post<string>(`${this.AppUrl}${this.APIUrl}/login/`, user)
  }

}
