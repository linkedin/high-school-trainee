$(document).ready(function() {
    $("#add_cookie_btn").click(function(e) {
        if (e.preventDefault) e.preventDefault();

        var cookie_name = $("#cookie_name").val();
        var cookie_rating = $("#cookie_rating").val();
        var data = {"name": cookie_name, "rating": cookie_rating};

        $.ajax({
            url: "/cookie",
            type: "POST",
            data: data,
            dataType: "json",
            success: function(status, data) {
                alert(data);
            }
        });
    });
});