public class ApiCallOutController {
    private static final string URL = 'https://api.spoonacular.com/recipes/';
    private static final string API_KEY= '3bf20730f2304bfaa028d72bea8b3d8b';

    @AuraEnabled
    public static String getRandomRecipie()
    {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(URL+'random?apiKey='+API_KEY);
        req.setMethod('GET');
        
        HttpResponse res = http.send(req);
        if(res.getStatusCode()==200){
            return res.getBody();
		}
        return '';
    }
    
    @AuraEnabled
    public static String getRecipeById(string recipeId)
    {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(URL+recipeId+'/information?apiKey='+API_KEY);
        req.setMethod('GET');
        
        HttpResponse res = http.send(req);
        if(res.getStatusCode()==200){
            return res.getBody();
		}
        return '';
    }
    
    @AuraEnabled
    public static String getRecipeByIngredient(string ingredient)
    {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint(URL+'findByIngredients?ingredients='+ingredient+'&number=5&apiKey='+API_KEY);
        req.setMethod('GET');
        
        HttpResponse res = http.send(req);
        if(res.getStatusCode()==200){
            return res.getBody();
		}
        return '';
    }
}