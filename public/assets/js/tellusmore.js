$(document).ready(function () {

    $(document).on("submit", "#tellusmore", function () {
        var userData = {
            firstname: $("#firstname").val().trim(),
            lastname: $("#lastname").val().trim(),
            email: $("#email").val().trim(),
            bio: $("#bio").val().trim(),
        }
        console.log(userData);
        updateUser(userData);
    });

    function updateUser(newData) {
        $.ajax({
            method: "PUT",
            url: "/api/tellusmore",
            data: newData
        }).then(function () {
            window.location.href = '/home';
        })
    }
})