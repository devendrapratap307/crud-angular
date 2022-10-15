import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from '../employee.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User | undefined | any;

  token ?:string;

  errorList: any[] | undefined;

  constructor(private employeeService:EmployeeService, private toast: NgToastService, 
    private router: Router) {this.user=new User(); }

  ngOnInit(): void {
    
  }

getToken(){
  this.employeeService.getToken(this.user).subscribe(res=>{
    this.token=res.data.token;
    console.log("generated token : "+res.data.token);
    this.saveToken(res.data.token);
    this.popupSuccessMessage(res);
  },
  er=>{
    this.popupErrorMessage(er);
  }
  );
}

saveToken(currentToken: string){
  if(currentToken)
  localStorage.setItem("token",currentToken);
}




popupSuccessMessage(resp: any){
  if (resp.statusCode == 200) {
    this.toast.success({ detail: "Success message", summary: resp.message, duration: 5000 });
    this.router.navigate(['/employees']);          // for redirect
  }
  else if (resp.statusCode == 400) {
    this.toast.warning({ detail: "Warning message", summary: "error...", duration: 20000 });
    this.errorList = resp.errors;
  }
  else{
    this.toast.error({ detail: "Error message", summary: "Something went wrong...", duration: 10000 });
  }

}

popupErrorMessage(er: any){
  this.toast.error({ detail: "Error message", summary: "Something went wrong...", duration: 10000 });
}


}
