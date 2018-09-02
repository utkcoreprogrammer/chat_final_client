import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common'
import { ChatService } from '../../../services/chat.service';
import { UserService } from '../../../services/user.service';
import { UserListService } from '../../../services/user-list.service';
import { promise } from 'protractor';




@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {
  private username : String
  private email : String
  private chatroom;
  private message: String;
  private messageArray: Array <{user: String, message: String}> = [];
  private messageData : any =[];
  private chatHistory : any = [];
  private isTyping = false;
 
  

  constructor(private route: ActivatedRoute,
    private router: Router, private chatService : ChatService, private userService : UserService, private userListService : UserListService, private location : Location) { 
      this.chatService.getChatHistory().subscribe(messages => {
        let keys = Object.keys(messages);
        for(var key of keys){
          this.chatHistory.push(messages[key]);
        }      
    this.chatService.newMessageReceived().subscribe(data => {
        console.log("data received", data);
        this.chatHistory.push(data);
        this.isTyping = false;
        console.log("message data updated", this.messageData);
        });
        console.log("chat history" , this.chatHistory);
        console.log("chat history" , this.messageData);
        console.log("messages" , messages);
  
  
        
      });

    this.chatService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
      
    });
    }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users =>
      {
      this.username = this.route.snapshot.queryParamMap.get('name');
      this.email = this.route.snapshot.queryParamMap.get('email');  
      const currentUser = this.userService.getLoggedInUser();
      console.log("current user >>>>>>>>>", currentUser);
      console.log("route >>>>>>>>>", this.route.params);
      console.log("from group chat>isOnline", users)
      if (currentUser.username < this.username) {
        this.chatroom = currentUser.username.concat(this.username);
      } else {
        this.chatroom = this.username.concat(currentUser.username);
  
      }
      this.chatService.joinRoom({user: this.userService.getLoggedInUser().username, room: this.chatroom});     
      });
     
        console.log("Data subscribe>>>>>>>>>>>>>>>", this.location.path);
       

     
    }
     sendMessage() {
      this.chatService.sendMessage({room: this.chatroom, user: this.userService.getLoggedInUser().username, message: this.message});
      this.message = '';
      this.isTyping = false;
    }
      typing() {
      this.chatService.typing({room: this.chatroom, user: this.userService.getLoggedInUser().username});
    }
  }


