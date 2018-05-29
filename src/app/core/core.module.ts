import { NgModule } from '@angular/core';
import { AuthGuard } from './../shared/auth-guard.service';
import { AuthService } from './../shared/auth.service';
import { ObjectToFormdataService } from './../shared/objectToFormdata.service';
import { DataSercice } from './../shared/data.service';
import { RecipeService } from './../recipes/recipe.service';
import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { AppRoutingModule } from './../app-routing.module';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        HeaderComponent,
        AppRoutingModule
    ],
    providers: [
        ShoppingListService, RecipeService, DataSercice, ObjectToFormdataService, AuthService, AuthGuard
    ]
})
export class CoreModule { }