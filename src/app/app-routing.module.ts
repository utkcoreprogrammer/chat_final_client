import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalChatComponent } from './components/personal-chat/personal-chat.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  { 
        path: 'single_chat', 
        component: PersonalChatComponent
  },
   { 
        path: 'register', 
        component: RegisterComponent
  },
  { 
        path: 'login', 
        component: LoginComponent
  },
  { 
        path: 'group_chat', 
        component: GroupChatComponent
  },  
  {   
        path: 'home', 
        component: HomeComponent
  }

    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
