import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
    declarations:[
        SigninComponent,
        SignupComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ],
    exports:[
        AuthRoutingModule
    ]
})
export class AuthModule{}