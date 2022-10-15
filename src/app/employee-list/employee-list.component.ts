import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employeeList ?: any;
  employee?:Employee;
  
  


  constructor(private employeeService:EmployeeService, private toast:NgToastService, private router:Router) { }

  ngOnInit(): void {

  
    this.getAllEmployees();
  }

  getAllEmployees(){
    this.employeeService.getAllEmployee().subscribe(data=>{
      this.employeeList = data;
    },
    er=>{
      this.toast.error({detail:"Error...", summary:er.message,duration:5000});
    });
    // if(!this.employeeList){
    //   this.router.navigate(['login']); 
    // }
  }

  deleteEmp(id: number){
    this.employeeService.deleteEmployee(id).subscribe(resp=>{
      console.log(resp);
      this.getAllEmployees();
      if(resp.statusCode==500 && resp.message===("Employee deleted at id :"+id)){
        this.toast.warning({detail:"Deleted...", summary:resp.message,duration:5000});
      }
      
    }, er=>{
      this.toast.error({detail:"Error...", summary:er.message,duration:5000});
    });
  }



}
