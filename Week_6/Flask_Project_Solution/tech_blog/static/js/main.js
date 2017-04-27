$(document).ready(function() {
    var $notification = $("#notification");
    var $postList = $("#blog-post-list");
    var lastTimeout;

    function setNotification(isSuccess, message) {
        if (lastTimeout) {
            clearTimeout(lastTimeout);
        }

        $notification.removeClass("success error hidden");
        if (isSuccess) {
            $notification.addClass("success");
            lastTimeout = setTimeout(function() {
                $notification.addClass("hidden");
            }, 5000);
        } else {
            $notification.addClass("error");
        }

        $notification.text(message);
    }

    $postList.on({
        mouseenter: function() {
            $(this).find(".actions").removeClass("hidden");
        },
        mouseleave: function() {
            $(this).find(".actions").addClass("hidden");
        }
    }, ".blog-post");

    $("#add-post").click(function(e) {
        e.preventDefault();

        var post = $("#blog-content").val();
        var data = {"blog_content": post};

        $.ajax({
            url: "/post",
            type: "POST",
            data: data,
            dataType: "json",
            success: function(result) {
                var blog_id = result["id"];
                var htmlString = '<div id="blog-' + blog_id + '" class="blog-post">';
                htmlString += '<div class="actions hidden">';
                htmlString += '<a class="edit"><img src="../static/images/pencil.png" alt="Edit"></a>';
                htmlString += '<a class="delete"><img src="../static/images/trash.png" alt="Delete"></a>';
                htmlString += '</div>';
                htmlString += '<div class="post-content">' + post + '</div>';
                htmlString += '</div>';
                $("#blog-post-list").prepend(htmlString);
                $("#blog-content").val("");
                setNotification(true, "Successfully added a new entry!");
            },
            error: function(status, data) {
                setNotification(false, "You tried to add a bad entry");
            }
        });
    });

    $postList.on("click", ".edit", function(e) {
        var blog_id = $(this).closest(".blog-post").attr('id').split("-")[1];
        var post_content_elm = $(this).parent().siblings(".post-content");
        var post_content = $(post_content_elm).text();
        var htmlString = '<form>';
        htmlString += '<input type="hidden" name="blog-id" value="' + blog_id + '"/>';
        htmlString += '<textarea class="update-content" name="update-content">' + post_content + '</textarea>';
        htmlString += '<input class="save-btn" type="submit" value="Save"/>';
        htmlString += '</form>';
        $(post_content_elm).html(htmlString);
    });

    $postList.on("click", ".save-btn", function(e) {
        e.preventDefault();
        var post_content_elm = $(this).closest(".post-content");
        var new_content = $(this).siblings(".update-content").val();
        var blog_id = $(this).siblings("input[name=blog-id]").val();
        var data = {"blog_content": new_content};

        $.ajax({
            url: "/post/" + blog_id,
            type: "PUT",
            data: data,
            dataType: "json",
            success: function(result) {
                $(post_content_elm).text(new_content);
                setNotification(true, "Successfully updated post");
            },
            error: function(status, data) {
                setNotification(false, "Whoops! Unable to edit the post: " + e.message);
            }
        });
    });

    $postList.on("click", ".delete", function(e) {
        var blog_id = $(this).closest(".blog-post").attr('id').split("-")[1];
        $.ajax({
            url: '/post/' + blog_id,
            type: 'DELETE',
            success: function(result) {
                $("#blog-" + blog_id).remove();
                setNotification(true, "Successfully deleted post");
            },
            error: function(e) {
                setNotification(false, "Whoops! Unable to delete the post: " + e.message);
            }
        });
    });
});