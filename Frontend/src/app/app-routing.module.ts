import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { AuthGuard } from './utils/guard.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'logIn', component: LoginComponent},
  {path: 'signIn', component: SignInComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},

  {path: 'maintenance',component:MaintenanceComponent},
  {path: 'errorPage', component:ErrorPageComponent },
  {path: '**', redirectTo:'/errorPage', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
