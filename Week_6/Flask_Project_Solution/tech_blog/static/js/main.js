$(document).ready(function() {
    $(".blog_post").hover(
        function() {
            $(this).find(".actions").css("display", "block");
        },
        function() {
            $(this).find(".actions").css("display", "none");
        }
    );

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