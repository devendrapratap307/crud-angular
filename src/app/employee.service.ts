import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from './api-response';
import { Employee } from './employee';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})


export class EmployeeService {

  getAllUrl = "http://localhost:8080/emp/getAll";
  getByIdUrl = "http://localhost:8080/emp/get/";
  addBaseUrl = "http://localhost:8080/emp/add";
  updateUrl = "http://localhost:8080/emp/update";
  deleteUrl = "http://localhost:8080/emp/delete/";
  searchUrl = "http://localhost:8080/emp/search/";
  tokenUrl = "http://localhost:8080/token";
  addUserUrl = "http://localhost:8080/addUser";

updatedToken(){
  const headerObject = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    .set("Access-Control-Allow-Origin", "*");
    console.log(localStorage.getItem("token"));
    return headerObject;
}




  constructor(private httpClient: HttpClient) { }

  getToken(user: User): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.tokenUrl, user );
  }

  getAllEmployee(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.getAllUrl, { headers: this.updatedToken()});
  }

  getEmployeeById(id: number): Observable<ApiResponse> {
    
    return this.httpClient.get<ApiResponse>(this.getByIdUrl + id, { headers: this.updatedToken() });
  }

  saveEmployee(employee: Employee): Observable<ApiResponse> {

    return this.httpClient.post<ApiResponse>(this.addBaseUrl, employee, { headers: this.updatedToken() });
  }
// 
  updateEmployee(employee: Employee): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(this.updateUrl, employee, { headers: this.updatedToken()});
  }

  deleteEmployee(id: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(this.deleteUrl + id, { headers: this.updatedToken() });
  }

  searchEmployee(para: string): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.searchUrl + para, { headers: this.updatedToken() });
  }

  signupUser(user: User): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.addUserUrl, user);
  }

  signOut(){
    localStorage.removeItem("token");
  }



}
