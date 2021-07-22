//JAC
function talkTo() {
    var element = document.getElementById("avatar-hero");
    navigator.vibrate(200);

    if(!element.classList.contains("stance-fight"))
    {
        element.classList.add("stance-fight");
    }
    else
    {
        element.classList.remove("stance-fight");
    }
}