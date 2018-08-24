import { Observable } from "rxjs/Rx";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
	private baseUrl:string = environment.apiUrl;


  constructor(private http  : HttpClient) { }

  login(credentials  :any) 
  {
  	console.log("inside login service", credentials);
     return this.http.post<any>(`${this.baseUrl}/user/auth`, credentials);
     // {
     // 	if (res && res.accessToken)
     // 	{	
     // 		console.log("res.user>>>",res.user);
     // 		res.user.accessToken = res.accessToken;
     //        localStorage.setItem('currentUser', JSON.stringify(res.user));


     // 	}
     // 	return res.user;
     // });

  }

}
