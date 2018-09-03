import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonalChatComponent } from './components/personal-chat/personal-chat.component';
import { ChatHistoryComponent } from './components/personal-chat/chat-history/chat-history.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { GroupChatComponent } from './components/group-chat/group-chat.component';
import { UserService } from './services/user.service';
import { UserListService } from './services/userList.service';
import { ChatHistoryService } from './services/chatHistory.service';
import { ToastService } from './services/toast.service';
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { ChangeHeaderService } from './services/change-header.service';
import { AuthGuard } from './guards/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    PersonalChatComponent,
    ChatHistoryComponent,
    LoginComponent,
    RegisterComponent,
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
  UserListService,
  AuthGuard,
  ChangeHeaderService,
  ChatHistoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
