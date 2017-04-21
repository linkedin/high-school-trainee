$(document).ready(function() {
    $(".blog_post").hover(
        function() {
            $(this).find(".actions").removeClass("hidden");
        },
        function() {
            $(this).find(".actions").addClass("hidden");
        }
    );

    $("#add_post").click(function(e) {
        e.preventDefault();

        var post = $("#blog_content").val();
        var data = {"blog_content": post};

        $.ajax({
            url: "/post",
            type: "POST",
            data: data,
            dataType: "json",
            success: function(result) {
                var blog_id = result["id"];
                $("#post_content").prepend('<tr id="blog_' + blog_id + '" class="blog_post"><td>' + post + '</td></tr>');
                $("#notification").css("color", "green");
                $("#notification").text("Successfully added a new entry!");
            },
            error: function(status, data) {
                $("#notification").css("color", "red");
                $("#notification").text("You tried to add a bad entry");
            }
        });
    });

    $(".edit").click(function(e) {
        var blog_id = $(this).closest(".blog_post").attr('id').split("_")[1];
        // TODO
    });

    $(".delete").click(function(e) {
        var blog_id = $(this).closest(".blog_post").attr('id').split("_")[1];

        $.ajax({
            url: '/post/' + blog_id,
            type: 'DELETE',
            success: function(result) {
                $("#blog_" + blog_id).remove();
                $("#notification").html("Successfully deleted post")
                setTimeout(function() {
                    $("#notification").html("");
                }, 5000);
            },
            error: function(e) {
                $("#notification").html("Whoops! Unable to delete the post: " + e.message)
                setTimeout(function() {
                    $("#notification").html("");
                }, 5000);
            }
        });
    });
});