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
    // Scroll the main window down
    var mainStoryArea = document.getElementById("mainArea");

    var node = document.createElement("P");
    var textnode = document.createTextNode("Newest Line now!");
    node.appendChild(textnode);
    mainStoryArea.appendChild(node);

    mainStoryArea.add
    mainStoryArea.scrollTop = mainStoryArea.scrollHeight;
}

