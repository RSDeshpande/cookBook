import getRecipeById from '@salesforce/apex/ApiCallOutController.getRecipeById';
import getRandomRecipie from '@salesforce/apex/ApiCallOutController.getRandomRecipie';
import { LightningElement, api } from 'lwc';

export default class RecipeList extends LightningElement {

    @api recipe=[];
    @api callRandom = false;
    searchTemplate=false;
    random=[];
    selectedRandomRecipe;
    recipeId;
    title;
    summary;
    price;
    time;
    sourceURL;


    connectedCallback(){
        if(this.callRandom==true){
            this.searchTemplate=false;
            this.fetchRandomRecipe();
        }
        else{
            this.searchTemplate=true;
        }
    }

    fetchRandomRecipe(){
        getRandomRecipie()
        .then((result)=>{
            console.log(result);
            this.random = JSON.parse(result).recipes;
            this.recipeId=this.random[0].id;
            console.log(this.random[0].id);
            this.fetchRecipeById();
        })
    }

    fetchRecipeById(){
        getRecipeById({recipeId: this.recipeId})
        .then((result)=>{
            console.log(result);
            
            this.selectedRandomRecipe = JSON.parse(result);
            this.title = this.selectedRandomRecipe.title;
            this.summary= this.selectedRandomRecipe.summary;
            this.template.querySelector('slot').innerHTML= this.summary;
            this.sourceURL = this.selectedRandomRecipe.sourceUrl;
            this.price = this.selectedRandomRecipe.price;
            this.time = this.selectedRandomRecipe.time;
        })
        .catch((error)=>{
            console.log(error);
        })
    }
}