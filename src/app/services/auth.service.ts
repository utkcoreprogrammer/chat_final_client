import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';



@Injectable()
export class AuthService {
	private baseUrl:string = environment.apiUrl;


  constructor(private http  : HttpClient, private router: Router, private userService : UserService) { }

  login(credentials  :any) 
  {
  	console.log("inside login service", credentials);
    return this.http.post<any>(`${this.baseUrl}/user/auth`, credentials);
  }





}
