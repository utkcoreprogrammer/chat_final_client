import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserListService } from '../../services/userList.service';
import { ChatService } from '../../services/chat.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ChatHistoryService } from '../../services/chatHistory.service';


@Component({
  selector: 'app-personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.css']
})
export class PersonalChatComponent implements OnInit {
	userNames : any = []
  Users : any = []
  Groups : any = []
  private username
  private groupId
  private messageData : any = []
  private chatData : any = []
  private isTyping = false; 
  private message
  private group = { groupName: '',
                    groupMembers: ['']
                  }
  email
  name
  chatroom
  currentUserName
  constructor(private router : Router, 
    private route : ActivatedRoute, 
    private userService : UserService, 
    private chatService: ChatService,
    private UserListService: UserListService,
    private authService : AuthService,
    private ChatHistoryService  :ChatHistoryService) { 
      this.chatService.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
      })
     this.chatService.newMessageReceived().subscribe(data => {
      console.log("data received", data);
      this.isTyping = false;
      this.messageData.push(data);
      console.log("message data updated>>", this.messageData);
      })
   

 }

  ngOnInit() {


    this.userService.getAllUsers().subscribe(users =>{

      let that = this;
      that.UserListService.Users = users
      let currentUser = this.userService.getLoggedInUser();
      this.email = currentUser.email;
      this.currentUserName = currentUser.username;
      let index= that.UserListService.Users.findIndex(x=>
      {
        return x.email == this.email
      })
  
      console.log("index of logged in user>>>>>>>>>",  index);
      that.UserListService.Users.splice(index,1);
      this.Users = that.UserListService.Users;
      // console.log("Users from personal chat@@@@@@@@@", this.Users);
    })
    this.userService.getAllGroups().subscribe(groups =>{
      this.Groups = groups
      console.log("getAllGroups", groups);
    })
  }

  chatHistory(user : any){
    // console.log("hitting chatHistory @@@@@@", user);
      this.username = user.username
      console.log("index found$$$$$$$$$$$", this.username);      
      const currentUser = this.userService.getLoggedInUser();
      if (currentUser.username < this.username) {
        this.chatroom = currentUser.username.concat(this.username);
      } else {
        this.chatroom = this.username.concat(currentUser.username);        
      }
      // console.log("this.chatroom>>>", this.chatroom)
      this.chatService.joinRoom({user: this.userService.getLoggedInUser().username, room: this.chatroom});    
      this.userService.getChatHistory(this.chatroom).subscribe(chats =>{
      console.log("chats from api>>>>>>", chats)
      this.ChatHistoryService.Chats = chats[0].messages  
      console.log("chats from api>>>>>>",this.ChatHistoryService.Chats)
      this.messageData = this.ChatHistoryService.Chats
      console.log("message data", this.messageData);
      })
      this.messageData = [];
 
  }
  groupChatHistory(group : any){
    // console.log("hitting chatHistory @@@@@@", user);
      // this.groupId = group._id
      console.log("hitting group$$$$$$$$$$$", group);      
      const currentUser = this.userService.getLoggedInUser();
      this.chatroom = group._id
      console.log("this.chatroom>>>", this.chatroom)
      this.chatService.joinRoom({user: this.userService.getLoggedInUser().username, room: this.chatroom});    
      this.userService.getChatHistory(this.chatroom).subscribe(chats =>{
      console.log("chats from api>>>>>>", chats)
      this.ChatHistoryService.Chats = chats[0].messages  
      console.log("chats from api>>>>>>",this.ChatHistoryService.Chats)
      this.messageData = this.ChatHistoryService.Chats
      console.log("message data", this.messageData);
      })
      this.messageData = [];
 
  }  


  sendMessage() {
      this.chatService.sendMessage({room: this.chatroom, user: this.userService.getLoggedInUser().username, message: this.message});
      this.message = '';
      this.isTyping = false;
  }

  typing() {
      this.chatService.typing({room: this.chatroom, user: this.userService.getLoggedInUser().username});
  }

  createGroup(group  :any){
    console.log("hitting createGroup" , this.group);
    this.userService.createGroupApi(this.group).subscribe(data=>
    {  
      console.log("data from createGroupApi>>>", data);
      if(data.group_already_exists){
        console.log("data from createGroupApi>>>", data.group_already_exists);
        alert("Group Already Exists");

        }
      else{  
      alert("Group Successfully Created");
      location.reload(true);  
      }
    })
  }

  logOut()
  {  
   this.userService.logOutApi(this.email).subscribe(data=>
   {
     console.log("response from logOutApi", data);
   })
   localStorage.removeItem('currentUser');
   location.reload(true);
   this.router.navigate(['login']);
  }
}
