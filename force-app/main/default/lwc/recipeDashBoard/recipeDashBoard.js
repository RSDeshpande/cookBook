import getRecipeByIngredient from '@salesforce/apex/ApiCallOutController.getRecipeByIngredient';

import { LightningElement } from 'lwc';


export default class RecipeDashBoard extends LightningElement {
    recipeLists ='';
    callrandom=false;
    recipeBulkInfo=[];

    handleSearchValue(event){
        const key = event.detail;
        this.callrandom=false;
        getRecipeByIngredient({ingredient: key})
        .then((result)=>{
            //console.log(result);
            this.recipeLists = JSON.parse(result);

            //getting list of ids from recipeList to fetch bulk info
            for (const key in this.recipeLists ) {
                console.log(this.recipeLists[key].id);
                this.recipeBulkInfo.push(this.recipeLists[key].id);
             }
        })
        .catch((error)=>{
            console.log(error);
        });

        console.log(this.recipeBulkInfo);
        
    }

    handleRandomSearch(){
        this.recipeLists='';
        this.callrandom = true;
    }
    

}