import { Observable } from 'rxjs';
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
  private currentUser
  private single_chat : boolean = false;
  private group_chat : boolean = false;  
  private groupId
  private messageData : any = []
  private chatData : any = []
  private isTyping :boolean = false; 
  private isGroupTyping : boolean = false; 
  private message
  private groupName
  private groupMembers
  private group = { 
                    groupName: '',
                    groupMembers: ['']
                  }
  email
  name
  chatroom
  currentUserName
  private user : any = [];
  private typingUser : any = [];

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

      this.chatService.receivedGroupTyping().subscribe(bool => {
      console.log("bool<<<<<<<", bool);
      this.isGroupTyping = bool.isTyping;
       let index  = this.user.includes(bool.user); 
       console.log('index1>>>>>>>>>', index)
       if(!index){
       this.user.push(bool.user);
       }
       else{
        console.log("inside else");
       }
      })
      this.chatService.newMessageReceived().subscribe(data => {
        this.isTyping = false;
        console.log("data from new message received" , data.user);
        let value  = this.user.includes(data.user); 
        if(value){
         this.user.splice(this.user.indexOf(data.user), 1); 
        }
          if(this.user.length == 0){
            this.isGroupTyping = false;         
          }
       this.messageData.push(data);
       console.log("message data updated>>", this.messageData);
       })


  
   

 }

  ngOnInit() {


    this.userService.getAllUsers().subscribe(users =>{

      let that = this;
      that.UserListService.Users = users
      this.currentUser = this.userService.getLoggedInUser();
      console.log("current user ngonit", this.currentUser)
      this.email = this.currentUser.email;
      this.currentUserName = this.currentUser.username;
      let index= that.UserListService.Users.findIndex(x=>
      {
        return x.email == this.email
      })
  
      console.log("index of logged in user>>>>>>>>>",  index);
      that.UserListService.Users.splice(index,1);
      this.Users = that.UserListService.Users;
      // console.log("Users from personal chat@@@@@@@@@", this.Users);
    })

    this.userService.getAllGroups(this.userService.getLoggedInUser().username).subscribe(groups =>{
      this.Groups = groups
      console.log("getAllGroups", groups);
    })
  }

  singlechatHistory(user : any){
    // console.log("hitting chatHistory @@@@@@", user);
    console.log("current user single chat", this.currentUser)
      this.single_chat = true;
      this.group_chat = false;
      this.groupName = '';
      this.groupMembers = [];
      this.username = user.username
      console.log("index found$$$$$$$$$$$", this.username);      
      if (this.currentUser.username < this.username) {
        this.chatroom = this.currentUser.username.concat(this.username);
      } else {
        this.chatroom = this.username.concat(this.currentUser.username);        
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
  groupChatHistory(item : any){
 
      this.group_chat = true;
      this.single_chat = false;
      let index = item.groupMembers.indexOf(this.currentUser.username);
      item.groupMembers.splice(index,1);
      this.groupName = item.groupName;
      this.groupMembers = item.groupMembers;
      // console.log("hitting group$$$$$$$$$$$", group);      
      // const currentUser = this.userService.getLoggedInUser();
      this.chatroom = item._id
      console.log("this.chatroom>>>", this.chatroom)
      this.chatService.joinRoom({user: this.userService.getLoggedInUser().username, room: this.chatroom});    
      this.userService.getChatHistory(this.chatroom).subscribe(chats =>{
      console.log("chats from api>>>>>>", chats)
      this.ChatHistoryService.Chats = chats[0].messages  
      console.log("this.ChatHistoryService.Chats",this.ChatHistoryService.Chats)
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

  groupTyping() {
      this.chatService.groupTyping({room: this.chatroom, user: this.userService.getLoggedInUser().username});
  }


  createGroup(group  :any){
    // const currentUser = this.userService.getLoggedInUser();
    console.log("current user create group", this.currentUser)
    this.group.groupMembers.push(this.currentUser.username);
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
