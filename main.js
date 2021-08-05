var isLogicPaused = false;

const player =
{
    name: "DummyName",
    health: 100,
    maxHealth: 100,
    currentMap: 1,
    inventory: []
};

const currentLocation =
{
    description: "Blah blah something",
    interactables: []
};

function scrollStoryArea()
{
    var mainStoryArea = document.getElementById("mainArea");

    
    mainStoryArea.scrollTop = mainStoryArea.scrollHeight;
}

function playAnimation(anim, target)
{
    var element = document.getElementById("avatar-hero");

    // Reset animation frames
    element.style.animation = 'none';
    element.offsetHeight; /* trigger reflow */
    element.style.animation = null; 

    // "play" a slash animation [by adding a class to the hero avatar]
    element.classList.add("stance-fight");

    // Pause logic for 1s, after that unpause logic and finish current animation
    isLogicPaused = true;
    setTimeout(() => {  element.classList.remove("stance-fight"); isLogicPaused = false; }, 1000);
}


// ====================================================================================================
// Button Event Listeners
// ====================================================================================================
function talkTo() // Test Button
{
    if(isLogicPaused) return;

    navigator.vibrate(200);
    playAnimation(1);

    // Test loading map text from JS
    var mapDescription = data[player.currentMap].mapText;

    // Scroll the main window down
    var mainStoryArea = document.getElementById("mainArea");

    var node = document.createElement("P");
    var textnode = document.createTextNode(mapDescription + " " + player.name);
    node.appendChild(textnode);
    mainStoryArea.appendChild(node);

    scrollStoryArea();
}

