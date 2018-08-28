import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserListService } from '../../services/userList.service';
import { ChatService } from '../../services/chat.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-personal-chat',
  templateUrl: './personal-chat.component.html',
  styleUrls: ['./personal-chat.component.css']
})
export class PersonalChatComponent implements OnInit {
	userNames : any = []
  Users
  email
  constructor(private router : Router, 
    private route : ActivatedRoute, 
    private userService : UserService, 
    private chatService: ChatService,
    private UserListService: UserListService,
    private authService : AuthService
    ) { 

 }

  ngOnInit() {
    console.log("init personal-chat >>>>>>>>>>>>>>>>",this.UserListService.Users)
    this.Users = this.UserListService.Users
    let currentUser = this.userService.getLoggedInUser();
    this.email = currentUser.email;
    console.log("current User$$$$$$$$$$$$",  this.email);


 
  }

  logOut()
  {  
   this.userService.logOutApi(this.email).subscribe(data=>
   {
     console.log("response from logOutApi", data);
   })
   localStorage.removeItem('currentUser');
   // location.reload(true);
   this.router.navigate(['login']);

  }

}
