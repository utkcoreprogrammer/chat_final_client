import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()

export class UserService {
  private baseUrl:string = environment.apiUrl;
  userNames : object;

  constructor(private http: HttpClient, private router : Router) { }



  register(user: any) {
    console.log("inside user service" , user);
    return this.http.post<any>(`${this.baseUrl}/user/register`, user);        
  }

  getAllUsers(){
  	console.log("inside getAllUsers");
    return this.http.get<any>(`${this.baseUrl}/user/getAllUsers`)
  }  

  getAllGroups(){
    console.log("inside getAllUsers");
    return this.http.get<any>(`${this.baseUrl}/user/getAllGroups`)
  } 
   
  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user != null ? true : false;
  }

  logOutApi(email : any) { 
  console.log("inside logout api$$$$$$$$$", email);       
  return this.http.post<any>(`${this.baseUrl}/user/logOut`, {email : email});       
  }

  createGroupApi(group : any) { 
  console.log("inside logout api$$$$$$$$$", group);       
  return this.http.post<any>(`${this.baseUrl}/user/group`, group);       
  }




  getChatHistory(room : any ){
  return this.http.get<any>(`${this.baseUrl}/chatroom/${room}`);        

  }
}

