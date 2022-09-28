import getRecipeById from '@salesforce/apex/ApiCallOutController.getRecipeById';
import getRandomRecipie from '@salesforce/apex/ApiCallOutController.getRandomRecipie';
import { LightningElement, api } from 'lwc';
import fetchBulkInfo from '@salesforce/apex/ApiCallOutController.fetchBulkInfo';

export default class RecipeList extends LightningElement {

    @api recipe=[];
    @api bulkInfo=[];
    @api callRandom = false;
    searchTemplate=false;
    idString='';
    bulkInfoString;
    random=[];
    selectedRandomRecipe;
    recipeId;
    title;
    summary;
    searchSummary;
    price;
    time;
    sourceURL;
    image;

    connectedCallback(){
        if(this.callRandom==true){
            this.searchTemplate=false;
            this.fetchRandomRecipe();
        }
        else{
            this.searchTemplate=true;
            this.idString = this.bulkInfo.toString();
            console.log(this.idString);
            this.getBulkInfo();
            
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
            this.image = this.selectedRandomRecipe.image;

        })
        .catch((error)=>{
            console.log(error);
        })
    }

    getBulkInfo(){
        fetchBulkInfo({ids: this.idString})
        .then((result)=>{
            
            this.bulkInfoString = JSON.parse(result);
            console.log(this.bulkInfoString);
            
        })
        .catch((error)=>{
            console.log(error);
        });
    }

}