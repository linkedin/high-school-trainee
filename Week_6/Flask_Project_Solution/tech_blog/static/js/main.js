$(document).ready(function() {
    $("#add_post").click(function(e) {
        e.preventDefault();

        var post = $("#blog_content").val();
        var data = {"blog_content": post};

        $.ajax({
            url: "/post",
            type: "POST",
            data: data,
            dataType: "json",
            success: function(status, data) {
                $("#post_content").prepend("<tr><td>" + post + "</td></tr>");
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