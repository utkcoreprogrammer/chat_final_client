import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { UserListService } from '../services/userList.service';


@Injectable()
export class ChatService {
	private baseUrl:string = environment.apiUrl;
	private socket = io.connect('http://localhost:9090');
  private username : string;


  constructor(private http:  HttpClient, private userService : UserService,private UserListService : UserListService) { 
      let that = this;
      this.userService.getAllUsers().subscribe(users =>{
      console.log("data from user service $$$$$$$",users);
      that.UserListService.Users = users
      console.log("DAta loaded for firsst time in User List service >>>>>>>>>",that.UserListService.Users)
      this.socket.on("logged_in_user",(onlineUser)=>{
      console.log("data from chat service $$$$$$$",onlineUser);
      let index = that.UserListService.Users.findIndex(x=>{return x.email == onlineUser.email})
      console.log("found index <>>>>>>>>>>>>",index)
      that.UserListService.Users[index] = onlineUser
      console.log("DAta updated #### in User List service >>>>>>>>>",that.UserListService.Users)
      })
       
      this.socket.on("log_Out_User", (offlineUser) =>
      {
      console.log("offline user event fired!@!@!#@", offlineUser);
      let index = that.UserListService.Users.findIndex(x=>{return x.email == offlineUser.email})
      console.log("found index offline<><><><><> ",index)
      that.UserListService.Users[index] = offlineUser
      console.log("DAta updated offline in User List service >>>>>>>>>",that.UserListService.Users)
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

  // isOnline()
  // {
  //     const observable = new Observable<{username : String, email : String, isOnline : Boolean}>(observer => {
  //     this.socket.on('logged_in_user', (user) => {
  //       console.log("user from chat service is online $$$$$$$", user);
  //       observer.next(user);
  //     });
  //     return () => {

  //     };

  //   })
  //   return observable;
  // }











