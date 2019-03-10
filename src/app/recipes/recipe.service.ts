import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe(
            'A test', 
        'Simple Test', 
        'https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto,w_600,h_750,c_fit,fl_strip_profile/https://s3.amazonaws.com/pixtruder/original_images/17c6ec7292ce74c4f38c71ee4816925c46ffd4bf',
        [
            new Ingredient('Meat', 1),
            new Ingredient('Fries', 7),
        ]
        ),
        new Recipe(
            'A test', 
            'Simple Test', 
            'https://images.media-allrecipes.com/images/56589.png',
            [
                new Ingredient('Bread', 1),
                new Ingredient('Bun', 5),
            ]
            )
      ];
    
    constructor(private slService: ShoppingListService){

    }

    setRecipies(recipe: Recipe[]){
        this.recipes = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    } 

    getRecipe(index:number){
        return this.recipes[index];
    } 
    
    addIngToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index]= newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}