import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ChatService {
	private baseUrl:string = environment.apiUrl;
	private socket = io.connect('http://localhost:9090'); 
    // userNames : any = [];
    constructor(private http:  HttpClient) { }
        // this.socket.on('connect',()=>{
        //     console.log("Client connected.......")
        // })
        // this.socket.on('LOGGED_IN_USER',(new_user)=>{
        //     console.log("LOGGED_IN_USER :: Message Received .........", new_user)
        //     let newUsername = new_user.username
        //     console.log("new_user", newUsername);
        // })
    
   
  
      
 


    

    // public send(message : any)
    // {
    // this.socket.emit('message', message)
    // }
    // public getUsers()
    // {
    //     return this.http.get<any>(`${this.baseUrl}/user/getAllUsers`);
    // }
    joinRoom(data) {
    console.log("data from join room",data);
    this.socket.emit('join', data);
  }
    sendMessage(data) {
     console.log("message>>>>", data);
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {

      };
    });
    return observable;
  }
  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
        
      });
      return () => {
       
      };
      
    });
    
    return observable;
  }
    typing(data) {
    this.socket.emit('typing', data);
  }
  getChatHistory()
  {
    const observable = new Observable<{user : String, message : String}>(observer => {
      this.socket.on('getMessages', (messages) => {
        console.log("type of messages" , typeof(messages));
        observer.next(messages);
      });
      return () => {

      };
      
    })
    return observable;
  } 
    




}




