import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Address } from '../address-dto';
// import { ApiResponse } from '../api-response';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Project } from '../project';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee | undefined;

  projects: Project[] = [
    { name: 'Java', code: 1 },
    { name: 'Angular', code: 2 },
    { name: 'Python', code: 3 },
    { name: 'MySQL', code: 4 },
  ];

  errorList: any[] | undefined;

  constructor(private employeeService: EmployeeService, private router: Router,
    private toast: NgToastService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(respo => {
      const eId = respo.get('id');
      if (eId && +eId) {
        this.getEmployeeDetailById(+eId);
      } else {
        this.employee = new Employee();
        this.employee.address = new Address();
      }
    });
  }

  addEmployee() {
    if (this.employee?.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(resp => {
        this.popupSuccessMessage(resp);
      },
        er => {
          this.popupErrorMessage(er);

        });
    }
    else if (this.employee) {
      this.employeeService.saveEmployee(this.employee).subscribe(response => {
        this.popupSuccessMessage(response);
      },
        er => {
          this.popupErrorMessage(er);
        });
    }
  }


  getEmployeeDetailById(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(res => {
      this.employee = res.data;
    });
  }

  popupSuccessMessage(resp: any){
    if (resp.statusCode == 200) {
      this.toast.success({ detail: "Success message", summary: "Data submitted successfully...", duration: 5000 });
      this.router.navigate(['/employees']);          // for redirect
    }
    else if (resp.statusCode == 400) {
      this.toast.warning({ detail: "Warning message", summary: "error...", duration: 20000 });
      this.errorList = resp.errors;
    }

  }

  popupErrorMessage(er: any){
    this.toast.error({ detail: "Error message", summary: er.message, duration: 10000 });
  }



}

