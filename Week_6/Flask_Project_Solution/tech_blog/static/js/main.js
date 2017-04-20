$(document).ready(function() {
    $("#add_post").click(function(e) {
        if (e.preventDefault) e.preventDefault();

        var post = $("#blog_content").val();
        console.log(post);
        var data = {"blog_content": post};
        console.log("I DID SOMETHING");

        $.ajax({
            url: "/add",
            type: "POST",
            data: data,
            dataType: "json",
            success: function(status, data) {
                $("#new_content").insert("<tr><td>" + post + "</td></tr>");
                $("#message").css("color", "green");
                $("#message").text("Successfully added a new entry!");
            },
            error: function(status, data) {
                $("#message").css("color", "red");
                $("#message").text("You tried to add a bad entry");
            }
        });
    });
});