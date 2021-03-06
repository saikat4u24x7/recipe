import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];

  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredient();

    this.subscription = this.slService.ingredientAdded.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );

  }

  onSelectSl(index:number){
    this.slService.onIngredientSelected(index);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
