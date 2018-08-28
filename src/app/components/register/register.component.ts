import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm : FormGroup
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService : ToastService){ }

  ngOnInit() {
  	this.signupForm = this.formBuilder.group({
  		username: ['',Validators.required],
        email: ['', [Validators.required,Validators.email,Validators.pattern(/^([a-zA-Z0-9_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,6})$/)]],
       	password: ['',Validators.required]

  	});
  }
 createUser = function() {
   

        if(this.signupForm.valid) {
            console.log("this.signupForm", this.signupForm.value);
            this.userService.register(this.signupForm.value)
                .subscribe(
                    data => {
                      console.log("inside create user", this.signupForm.value);
                        this.toastrService.showSuccess('User successfully added');
                        this.signupForm.reset()
                    },
                    error => {
                        this.toastrService.showError(error.error);
                    });            
        }
        else {
            this.validateAllFormFields(this.signupForm);
        }
      }
      

 validateAllFormFields(formGroup: FormGroup) {         
        Object.keys(formGroup.controls).forEach(field => {  
            const control = formGroup.get(field);             
            if (control instanceof FormControl) {             
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        
                this.validateAllFormFields(control);           
            }
        });
    }
}
