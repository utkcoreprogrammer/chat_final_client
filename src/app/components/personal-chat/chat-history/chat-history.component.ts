// import { Component, OnInit, Input } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { Location} from '@angular/common'
// import { ChatService } from '../../../services/chat.service';
// import { UserService } from '../../../services/user.service';
// import { UserListService } from '../../../services/user-list.service';
// import { ChatHistoryService } from '../../../services/chatHistory.service';





// @Component({
//   selector: 'app-chat-history',
//   templateUrl: './chat-history.component.html',
//   styleUrls: ['./chat-history.component.css']
// })
// export class ChatHistoryComponent implements OnInit {
//   // @Input() username: string;
//   private username : string
//   private email
//   private chatroom;
//   private message
//   private messageArray: Array <{user: String, message: String}> = [];
//   private messageData
//   private chatHistory : any = [];
//   private isTyping = false;
 
  

//   constructor(private route: ActivatedRoute,
//     private router: Router, 
//     private chatService : ChatService, 
//     private userService : UserService, 
//     private userListService : UserListService, 
//     private chatHistoryService  :ChatHistoryService) { 

//        this.route.params.subscribe(params => {
//        this.username = params['name'];  
//        }); 
//   console.log("chat history singleton>>>>>.",this.chatHistoryService.Chats);

//     // this.chatService.receivedTyping().subscribe(bool => {
//     //   this.isTyping = bool.isTyping;
      
//     // });

   
//     //       this.chatService.getChatHistory().subscribe(messages => {
//     //     let keys = Object.keys(messages);
//     //     for(var key of keys){
//     //       this.chatHistory.push(messages[key]);
//     //     }  
//     //     console.log("messages&&&&&&&&&&&&&&", messages);    
//     // this.chatService.newMessageReceived().subscribe(data => {
//     //     console.log("data received", data);
//     //     this.chatHistory.push(data);
//     //     this.isTyping = false;
//     //     });

  
        
//     //   });
//     }

//   ngOnInit() {




//        // this.getChatData();

     
//   }  





//      sendMessage() {
//       this.chatService.sendMessage({room: this.chatroom, user: this.userService.getLoggedInUser().username, message: this.message});
//       this.message = '';
//       this.isTyping = false;
//     }
//       typing() {
//       this.chatService.typing({room: this.chatroom, user: this.userService.getLoggedInUser().username});
//     }
//   }


