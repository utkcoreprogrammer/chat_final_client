import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
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
  isOnline : boolean;
  constructor(private router : Router, 
    private route : ActivatedRoute, 
    private userService : UserService, 
    private chatService: ChatService) { 

 }

  ngOnInit() {
  	this.userService.getAllUsers().subscribe(users =>
  	{
      console.log("users>>>>>>>", users);
  		this.userNames = users.map(({username}) => username)
      console.log("usernames", this.userNames);
  		this.Users= users
  		//.json();
  	})
    const currentUser = this.userService.getLoggedInUser();
    this.isOnline = currentUser.isOnline;

 
  }

}
