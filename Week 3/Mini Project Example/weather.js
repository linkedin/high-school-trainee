$(document).ready(function(){
    $("#my-form").submit(function(e) {
        if (e.preventDefault) e.preventDefault();

        //grab the selected item and turn it into a var
        var location = $('select option:selected').val();
        //remove spaces in the name
        location = location.replace(" ", "");
        //turn the selected location into what the API needs
        location = location.replace(",", "%2C%20");
       
       //these are the APIs, kept the original just in case
        var original = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202487889&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        var api = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22[[cities%2C%20state]]%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys"

        //replace the convereted city and state into API
        api = api.replace("[[cities%2C%20state]]", location);

        $.get(api, function(data, status) {
            console.log(data);
            //show which city the user selected
            $("#description").html(data["query"]["results"]["channel"]["description"]);
            //show the condition of the city
            $("#condition").html(data["query"]["results"]["channel"]["item"]["condition"]["text"]);
            //show the temp of the city
            $("#temp").html(data["query"]["results"]["channel"]["item"]["condition"]["temp"]);
        },
        "json");

        return false;
    });
});