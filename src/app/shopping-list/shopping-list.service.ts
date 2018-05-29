import {Subject} from 'rxjs/Subject';
import { Ingredient } from './../shared/ingredient.model';


export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];
    
    ingredientAdded = new Subject<Ingredient[]>();
    ingredientSelected= new Subject<number>();

    getIngredient() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.ingredients.slice());
    }

    addIngredientToShoppingList(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientAdded.next(this.ingredients.slice());
    }

    onIngredientSelected(index:number){
        this.ingredientSelected.next(index);
    }

    getIngredientById(index:number){
        return this.ingredients[index];
    }

    updateIngredient(index:number, ingredient:Ingredient){
        this.ingredients[index]=ingredient;
        this.ingredientAdded.next(this.ingredients.slice());
    }

    onDeleteIngredient(index:number){
        this.ingredients.splice(index, 1);
        this.ingredientAdded.next(this.ingredients.slice());
    }
}