document.addEventListener("keydown", function(event) {
    if (event.altKey && (event.keyCode===88))
    {
        $("#form-modal").modal('toggle');
        event.preventDefault();
    }
});

$("button:contains(Edit Auto Fill Inputs)").on('click', () => {
    $("#form-modal").modal('toggle');
})