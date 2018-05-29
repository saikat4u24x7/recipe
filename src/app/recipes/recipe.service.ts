import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Response } from '@angular/http';

import { ObjectToFormdataService } from './../shared/objectToFormdata.service';
import { DataSercice } from './../shared/data.service';
import { Recipe } from './recipe.model';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

    private recipe: Recipe[]=[];

    recipeChanged = new Subject<Recipe[]>();


    constructor(private slService: ShoppingListService,
        private dataService: DataSercice,
        private formdataService: ObjectToFormdataService) { }

    getRecipes() {
        return this.dataService.getAllRecipe()
            .subscribe(
            (resp) => {

                let curRe = [];
                for (let reci of resp.message) {

                    let ingre = [];

                    for (let ingred of reci.ingredient) {
                        ingre.push(new Ingredient(ingred.name, ingred.amount));
                    }
                    curRe.push(new Recipe(reci.id,reci.name, reci.description, reci.image, ingre));
                }
                this.recipe = curRe;
                this.recipeChanged.next(this.recipe.slice());
            }
            );

    }

    addIngredientToRecipe(ingredient: Ingredient[]) {
        this.slService.addIngredientToShoppingList(ingredient);
    }

    getRecipeById(id: number) {
       // return this.recipe[id];

        return this.dataService.getRecipeById(id);
    }

    onAddRecipe(recipe: Recipe) {
        this.recipe.push(recipe);
        let d = <FormData>this.formdataService.objectToFormData(recipe, '', '');
        this.dataService.addRecipe(d).subscribe(
            data => {
                this.getRecipes();
            }
        );
    }
    onUpdateRecipe(id: number, recipe: Recipe) {

        let d = <FormData>this.formdataService.objectToFormData(recipe, '', '');

        this.dataService.onUpdateRecipe(id, d).subscribe(
            (resp)=>{
                this.getRecipes();
            }
        );
        
      
    }

    onDeleteRecipe(index: number) {
        this.recipe.splice(index, 1);
        this.recipeChanged.next(this.recipe.slice());
    }

}