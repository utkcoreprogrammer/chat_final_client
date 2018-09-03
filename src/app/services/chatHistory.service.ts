import { Injectable } from '@angular/core';
@Injectable({  providedIn: 'root'})
export class ChatHistoryService {  
public static Chats: any   
constructor() {}  
public get Chats() : any {    
	return ChatHistoryService.Chats  
}  
public set Chats(v : any) {    
	ChatHistoryService.Chats = v;  
}}