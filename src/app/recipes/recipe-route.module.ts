import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';
import { AuthGuard } from './../shared/auth-guard.service';

const recipeRoute: Routes = [
    {
        path: '', component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent, pathMatch: 'full', canActivate: [AuthGuard] },
            { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
            { path: ':id', component: RecipeDetailComponent, canActivate: [AuthGuard] },
            { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoute)
    ],
    exports:[RouterModule],
    providers:[AuthGuard]
})
export class RecipeRouteModule { }