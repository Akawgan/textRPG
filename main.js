//JAC
function talkTo() {
    var element = document.getElementById("avatar-hero");

    if(!element.classList.contains("stance-fight"))
    {
        element.classList.add("stance-fight");
    }
    else
    {
        element.classList.remove("stance-fight");
    }




    
    
}