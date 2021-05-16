document.addEventListener("keydown", function(event) {
    if (event.altKey && (event.keyCode===88))
    {
        $("#formWrapper").toggle();
        event.preventDefault();
    }
});