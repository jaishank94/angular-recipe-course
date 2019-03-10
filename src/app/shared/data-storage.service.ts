import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService){}

    storeRecipe(){
        const token = this.authService.getToken();
        return this.http.put('https://angularcourse-8cd96.firebaseio.com/recipes.json?auth='+token,this.recipeService.getRecipes());
    }

    getRecipes(){
        const token = this.authService.getToken();

        this.http.get('https://angularcourse-8cd96.firebaseio.com/recipes.json?auth='+token)
            .subscribe(
                (response: Response) =>{
                    // console.log(response);
                    let recipes: any = response;
                    for(let recipe of recipes){
                        if(!recipe['ingredients']){
                            recipe['ingredients']=[];
                        }
                    }
                    this.recipeService.setRecipies(recipes);
                }
            );
    }
}