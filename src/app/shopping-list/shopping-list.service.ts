import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingridentChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 2),
        new Ingredient('Mango', 1)
      ]; 

     getIngredients(){
         return this.ingredients.slice();
     } 

     getIngredient(index:number){
        return this.ingredients[index];
     } 

     addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingridentChanged.next(this.ingredients.slice());
     }

     addIngredients(ingredients: Ingredient[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingridentChanged.next(this.ingredients.slice());
     }

     updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingridentChanged.next(this.ingredients.slice());
     }

     deleteIngredient(index: number){
        this.ingredients.splice(index, 1);
        this.ingridentChanged.next(this.ingredients.slice());
     }
}