$(document).ready(function () {
    document.addEventListener("keydown", function (event) {
        if (event.altKey && (event.keyCode === 88)) {
            $("#form-modal").modal('toggle');
            event.preventDefault();
        }
    });

    $(".toggle-modal").on('click', () => {
        $("#form-modal").modal('toggle');
    })
})