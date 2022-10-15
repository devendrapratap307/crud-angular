import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AuthGGuard } from './auth-g.guard';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'employees',canActivate:[AuthGGuard], component:EmployeeListComponent},
  
  {path:'add-employee',canActivate:[AuthGGuard], component:AddEmployeeComponent},
  {path:'edit-employee/:id',canActivate:[AuthGGuard], component:AddEmployeeComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
