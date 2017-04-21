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
                $("#blog_post_table").prepend('<tr id="blog_' + blog_id + '" class="blog_post"><td>' + post + '</td></tr>');
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
        var post_content_elm = $(this).closest(".post_content");
        var post_content = $(post_content_elm).val();
        var htmlString = '<form>';
        htmlString += '<input type="hidden" name="blog_id" value="' + blog_id + '"/>';
        htmlString += '<textarea name="blog_content" rows="4" cols="50">' + post_content + '</textarea>';
        htmlString += '<input id="edit_post" type="submit" value="Save"/>';
        htmlString += '</form>';
        $(post_content_elm).html(htmlString);
    });

    $("#edit_post").click(function(e) {
        e.preventDefault();

        alert("here");
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