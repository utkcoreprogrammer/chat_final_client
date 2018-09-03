import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common'
import { ChatService } from '../../../services/chat.service';
import { UserService } from '../../../services/user.service';
import { UserListService } from '../../../services/user-list.service';
import { ChatHistoryService } from '../../../services/chatHistory.service';





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
    private router: Router, 
    private chatService : ChatService, 
    private userService : UserService, 
    private userListService : UserListService, 
    private location : Location, 
    private chatHistoryService  :ChatHistoryService) { 


    this.chatService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
      
    });
   
    //       this.chatService.getChatHistory().subscribe(messages => {
    //     let keys = Object.keys(messages);
    //     for(var key of keys){
    //       this.chatHistory.push(messages[key]);
    //     }  
    //     console.log("messages&&&&&&&&&&&&&&", messages);    
    // this.chatService.newMessageReceived().subscribe(data => {
    //     console.log("data received", data);
    //     this.chatHistory.push(data);
    //     this.isTyping = false;
    //     });

  
        
    //   });
    }

  ngOnInit() {

     
 this.userService.getAllUsers().subscribe(users =>
      {
        let that = this;
      this.username = this.route.snapshot.queryParamMap.get('name');
      console.log("index found$$$$$$$$$$$", this.username);
      const currentUser = this.userService.getLoggedInUser();
      if (currentUser.username < this.username) {
        this.chatroom = currentUser.username.concat(this.username);
      } else {
        this.chatroom = this.username.concat(currentUser.username);
        
      }
      console.log("this.chatroom>>>", this.chatroom)
      this.chatService.joinRoom({user: this.userService.getLoggedInUser().username, room: this.chatroom});     
    this.userService.getChatHistory(this.chatroom).subscribe(chats =>{

      console.log("chat>>>>>>", chats)
       that.chatHistoryService.Chats = chats
        let keys = Object.keys(chats);
        for(var key of keys){
          this.chatHistory.push(chats[key]);
        }
       this.messageData = this.chatHistory.map(({messages}) => messages)
       // this.messageData = this.chatHistory.messages
       console.log("chatHistory#@@$$@$$$", this.messageData)
    })
      });
       

     
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


