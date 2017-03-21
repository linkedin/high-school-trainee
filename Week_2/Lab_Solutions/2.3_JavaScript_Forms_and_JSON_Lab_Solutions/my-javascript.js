window.onload = function() {
    function processForm(e) {
        if (e.preventDefault) e.preventDefault();
        var data = document.getElementById("color").value;
        if(data == "") {
            alert("You didn't provide any input!");
        } else {
            console.log({"favoriteColor": data});
        }
        return false;
    }

    var form = document.getElementById('my-form');
    form.addEventListener("submit", processForm);
}