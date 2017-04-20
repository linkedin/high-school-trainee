$(document).ready(function() {
    $("#add_cookie_btn").click(function(e) {
        e.preventDefault();

        var cookie_name = $("#cookie_name").val();
        var cookie_rating = $("#cookie_rating").val();
        var data = {"name": cookie_name, "rating": cookie_rating};

        $.ajax({
            url: "/cookie",
            type: "POST",
            data: data,
            dataType: "json",
            success: function(status, data) {
                $("#message").css("color", "green");
                $("#message").text("Successfully added a new cookie!");
            },
            error: function(status, data) {
                $("#message").css("color", "red");
                $("#message").text("You tried to add a bad cookie")
            }
        });
    });
});