import { Ingredient } from './../../shared/ingredient.model';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from './../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipeItem: Recipe;

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        if(this.editMode==true){
        this.recipeService.getRecipeById(this.id).subscribe(
          (resp) => {
            let ingre = [];
            for (let ingred of resp.message.ingredient) {
              ingre.push(new Ingredient(ingred.name, ingred.amount));
            }
            this.recipeItem = new Recipe(resp.message.id, resp.message.name, resp.message.description, resp.message.image, ingre);
            this.initForm();
          }
        );
      }else{
        this.initForm();
      }

      }
    );

  }

  initForm() {

    let name = '';
    let description = '';
    let imagePath = '';
    let ingredients = new FormArray([]);

    if (this.editMode) {
      let recipe = this.recipeItem;
      this.id = recipe.id;

      name = recipe.name;
      description = recipe.description;
      imagePath = recipe.imagePath;

      if (recipe['ingredients']) {
        for (let recipeitem of recipe.ingredients) {
          ingredients.push(
            new FormGroup({
              'name': new FormControl(recipeitem.name, Validators.required),
              'amount': new FormControl(recipeitem.amount, [, Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'ingredients': ingredients
    });


  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', Validators.required),
        'amount': new FormControl('', [, Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }

  onSubmitForm() {
    if (this.editMode) {
      this.recipeService.onUpdateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.onAddRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onClearForm() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
