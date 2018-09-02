import { Injectable } from '@angular/core';
@Injectable({  providedIn: 'root'})
export class UserListService {  
public static Users: any   
constructor() {}  
public get Users() : any {    
	return UserListService.Users  
}  
public set Users(v : any) {    
	UserListService.Users = v;  
}}