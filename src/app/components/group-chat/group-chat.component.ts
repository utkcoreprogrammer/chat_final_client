import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {
	private username : String
  private email : String
  private chatroom;
  private message: String;
  private messageArray: Array <{user: String, message: String}> = [];
  private messageData : any =[];
  private chatHistory : any = [];
  private isTyping = false;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private chatService: ChatService,
    private router: Router) { 
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
    console.log("from group chat", this.username)
  	const currentUser = this.userService.getLoggedInUser();
    console.log("from group chat>currentUser", currentUser.username)
    if (currentUser.username < this.username) {
      this.chatroom = currentUser.username.concat(this.username);
      console.log("chatroom if>>>>", this.chatroom);
    } else {
      this.chatroom = this.username.concat(currentUser.username);
      console.log("chatroom else>>>>", this.chatroom);

    }
    this.chatService.joinRoom({user: this.userService.getLoggedInUser().username, room: this.chatroom});
    this.userService.getChatRoomsChat(this.chatroom).subscribe(messages => {
    console.log("messages>>>", messages);
    this.messageArray = messages;
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
