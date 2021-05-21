$(document).ready(function () {
    $(document).on("keydown", function (event) {
        if (event.altKey && (event.keyCode === 88)) {
            var classes = $("#form-modal")[0].classList
            if (classes) {
                if (classes.contains("show")) {
                    $(".btn-close").click();
                } else {
                    $("#trigger-button").click();
                }
            }
            event.preventDefault();
        }
    });
})