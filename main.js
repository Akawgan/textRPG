var currentMap = 0;

//JAC
function talkTo() {
    var element = document.getElementById("avatar-hero");
    navigator.vibrate(200);

    if(!element.classList.contains("stance-fight"))
    {
        currentMap = 0;
        element.classList.add("stance-fight");
    }
    else
    {
        currentMap = 1;
        element.classList.remove("stance-fight");
        data[0].mapText = "This is now a new description of first room! It should reset on page refresh."
    }

    // Test loading map text from JS
    var mapDescription = data[currentMap].mapText;

    // Scroll the main window down
    var mainStoryArea = document.getElementById("mainArea");

    var node = document.createElement("P");
    var textnode = document.createTextNode(mapDescription);
    node.appendChild(textnode);
    mainStoryArea.appendChild(node);

    mainStoryArea.add
    mainStoryArea.scrollTop = mainStoryArea.scrollHeight;
}

