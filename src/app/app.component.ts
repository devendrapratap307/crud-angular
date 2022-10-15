import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-frontend';

  constructor(private employeeService: EmployeeService, private router:Router){
    localStorage.removeItem("token");
    router.navigateByUrl("/login");
  }

  
  checkToken(){
    return localStorage.getItem("token");
  }

  signout(){
    localStorage.removeItem("token");
  }

}


