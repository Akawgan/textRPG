var currentMap = 0;
var isLogicPaused = false;

//On press [Interact With]
function talkTo() {
    if(isLogicPaused) return;

    var element = document.getElementById("avatar-hero");
    navigator.vibrate(200);

    // Reset animation frames
    element.style.animation = 'none';
    element.offsetHeight; /* trigger reflow */
    element.style.animation = null; 
    // "play" a slash animation [by adding a class to the hero avatar]
    element.classList.add("stance-fight");

        
        

    // Pause logic for 1s, after that unpause logic and finish current animation
    isLogicPaused = true;
    setTimeout(() => {  element.classList.remove("stance-fight"); isLogicPaused = false; }, 1000);

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

    // Change map
    currentMap = 1;
}

