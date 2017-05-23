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
            success: function(data, status) {
                console.log(data);
            }
        });
    });
});