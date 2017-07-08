$(document).ready(function(){
    $("#my-form").submit(function(e) {
        // IE versions 8 and earlier do not support preventDefault
        if (e.preventDefault) {
            e.preventDefault();
        }

        var data = $("#color").val();
        if (data === "") {
            alert("You didn't provide any input!");
        } else {
            console.log({"favoriteColor": data});
        }

        var url = "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%202487889&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
        $.get(url, function(data, status) {
            console.log(data);
            console.log(data["query"]["results"]["channel"]["item"]["condition"]["text"]);
        },
        "json");

        return false;
    });
});