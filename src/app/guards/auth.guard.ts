import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

	   const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
	   if(!loggedInUser){
	   	   	this.router.navigate(['login']);
            location.reload(true);
            return false;
	   }
	   else{
	   	return true;
	   }




  }
}
