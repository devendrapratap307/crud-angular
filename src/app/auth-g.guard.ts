import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { identity, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGGuard implements CanActivate {

  constructor(private router:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(localStorage.getItem("token")){
      return true;
    }
    return this.router.createUrlTree(['']);  
  }  
}
