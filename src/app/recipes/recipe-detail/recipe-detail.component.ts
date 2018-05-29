import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RecipeService } from './../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from './../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.recipeService.getRecipeById(this.id).subscribe(
          (resp) => {
            console.log(resp);

            let ingre = [];

            for (let ingred of resp.message.ingredient) {
              ingre.push(new Ingredient(ingred.name, ingred.amount));
            }
            this.recipe=new Recipe(resp.message.id,resp.message.name, resp.message.description, resp.message.image, ingre);

          }
        );
      }
    )
  }

  addToShoppingList(ingredient: Ingredient[]) {

    this.recipeService.addIngredientToRecipe(ingredient);

  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.onDeleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
