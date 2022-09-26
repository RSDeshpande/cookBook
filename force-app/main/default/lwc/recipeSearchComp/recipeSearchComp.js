import { LightningElement, api } from 'lwc';

export default class RecipeSearchComp extends LightningElement {

    searchKey;
    handleChange(event)
    {
        this.searchKey = event.target.value;
    }
    handleSearch(event){
        
        const searchEvt = new CustomEvent(
            'search',
            {
                detail : this.searchKey
            }
        );

        this.dispatchEvent(searchEvt);
    }

    handleRandomSearch(){
        const randomSearch = new CustomEvent('random');
        this.dispatchEvent(randomSearch);
    }
}