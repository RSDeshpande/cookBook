import getRecipeByIngredient from '@salesforce/apex/ApiCallOutController.getRecipeByIngredient';

import { LightningElement } from 'lwc';


export default class RecipeDashBoard extends LightningElement {
    recipeLists ='';
    callrandom=false;

    handleSearchValue(event){
        const key = event.detail;
        this.callrandom=false;
        getRecipeByIngredient({ingredient: key})
        .then((result)=>{
            console.log(result);
            this.recipeLists = JSON.parse(result);
            console.log(this.recipeLists);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    handleRandomSearch(){
        this.recipeLists='';
        this.callrandom = true;
    }
    

}