import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { UserListService } from '../services/userList.service';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class ChatService {
	private baseUrl:string = environment.apiUrl;
	private socket = io.connect('http://localhost:9090');
  private username : string;


  constructor(private http:  HttpClient, private userService : UserService,private UserListService : UserListService, private route : ActivatedRoute, private router : Router) { 
      let that = this;
      console.log("socket>>>>>" ,this.socket);
      this.userService.getAllUsers().subscribe(users =>{
      // console.log("data from user service $$$$$$$",users);
      that.UserListService.Users = users
      console.log("DAta loaded for firsst time in User List service >>>>>>>>>",that.UserListService.Users)
      this.socket.on("logged_in_user",(onlineUser)=>{
      // console.log("data from chat service $$$$$$$",onlineUser);
      let index = that.UserListService.Users.findIndex(x=>{return x.email == onlineUser.email})
      // console.log("found index <>>>>>>>>>>>>",index)
      that.UserListService.Users[index] = onlineUser
      // console.log("DAta updated #### in User List service >>>>>>>>>",that.UserListService.Users)
      })
       
      this.socket.on("log_Out_User", (offlineUser) =>
      {
      // console.log("offline user event fired!@!@!#@", offlineUser);
      let index = that.UserListService.Users.findIndex(x=>{return x.email == offlineUser.email})
      // console.log("found index offline<><><><><> ",index)
      that.UserListService.Users[index] = offlineUser
      // console.log("DAta updated offline in User List service >>>>>>>>>",that.UserListService.Users)
      })

      })
      
   

  }

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
         this.socket.disconnect();
      };
    });
    return observable;
  }
  receivedTyping() {
    const observable = new Observable<{ data : String, isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        console.log("data from typing !#@#@#@#@##", data);
        observer.next(data);
        
      });
      return () => {
       this.socket.disconnect();

      };
      
    });
    
    return observable;
  }
  typing(data) {
    this.socket.emit('typing', data);
  }
 
}












