import {
  Component,
  OnInit,OnDestroy,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') inForm: NgForm;

  editMode = false;
  id: number;
  editItem: Ingredient;
  subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.ingredientSelected.subscribe(
      (index: number) => {
        this.id = index;
        this.editMode = true;
        this.editItem = this.slService.getIngredientById(index);
        this.inForm.setValue(
          {
            name: this.editItem.name,
            amount: this.editItem.amount
          }
        );
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.id, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }

    this.onClear();
  }

  onDelete(){
    this.slService.onDeleteIngredient(this.id);
  }

  onClear(){
    this.editMode=false;
    this.inForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
