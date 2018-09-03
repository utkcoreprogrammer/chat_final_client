import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserListService } from '../../services/userList.service';
import { ChatService } from '../../services/chat.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.css']
})
export class PersonalChatComponent implements OnInit {
  links: Array<{ name: string, path: string }> = [];
	userNames : any = []
  Users : any = []
  email
  name
  currentUserName
  constructor(private router : Router, 
    private route : ActivatedRoute, 
    private userService : UserService, 
    private chatService: ChatService,
    private UserListService: UserListService,
    private authService : AuthService
    ) { 
   

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
      console.log("Users from personal chat@@@@@@@@@", this.Users);
      })
  }

  // chatHistory(user : any){
  //   console.log("hitting chatHistory @@@@@@", user);
  //   // this.router.navigate(['single_chat/chat_history', user.username])    
  // }

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
