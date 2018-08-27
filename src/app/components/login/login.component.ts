import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm : FormGroup
	constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private toastrService : ToastService, 
    private chatService : ChatService,
    private router : Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
  	this.loginForm = this.formBuilder.group({
  		email: [''],
      password : ['']

  	});
  }
 loginHandler = function() {

     if (this.loginForm.valid) {
     
        console.log("this.loginForm", this.loginForm.value);
        
      this.authService.login(this.loginForm.value).subscribe(data => {
      let user = data;
      console.log("data>>>>>>" ,data);
      if (user.isPresent) {
        if ( user.correctPassword) {
          console.log("data.user from login component !!!!!!!!!", data.user);
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          this.router.navigate(['home']);
        } 
    
      }
    });
            
           
                          
       
      }  

}
}



//     this.authService.login(this.loginForm.value)
   
        //        .subscribe(
        //             data => {
        //               console.log("inside create user", this.loginForm.value);
        //                 this.toastrService.showSuccess('User successfully logged in');
        //                 this.loginForm.reset();
        //                 if(data.accessToken)
        //                 {
        //                 console.log("res.user>>>",data);
        //                 var currentUser= data.currentUser;
        //                 // console.log("res.username>>>",username);
        //                 localStorage.setItem('currentUser', JSON.stringify(currentUser));
        //                 }
        //                 this.router.navigate(['home']);
                        

        //             },
        //             error => {
        //                 this.toastrService.showError(error.error);
        //             });  
        // }