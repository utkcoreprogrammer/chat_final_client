import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalChatComponent } from './components/personal-chat/personal-chat.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GroupChatComponent } from './components/group-chat/group-chat.component';
import { UserService } from './services/user.service';
import { UserListService } from './services/userList.service';
import { ToastService } from './services/toast.service';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonalChatComponent,
    LoginComponent,
    RegisterComponent,
    GroupChatComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [UserService,
  ToastService,
  AuthService,
  ChatService,
  UserListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
