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
    element.classList.add(anim);

    // Pause logic for 1s, after that unpause logic and finish current animation
    isLogicPaused = true;
    setTimeout(() => {  element.classList.remove(anim); isLogicPaused = false; }, 990);
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

// BUTTONS
function btnAttack() // Test Button
{
    if(isLogicPaused) return;

    navigator.vibrate(200);
    playAnimation("anim-attack");

    scrollStoryArea();
}
function btnRun() // Test Button
{
    if(isLogicPaused) return;

    navigator.vibrate(200);
    playAnimation("anim-run");

    scrollStoryArea();
}
function btnChest() // Test Button
{
    if(isLogicPaused) return;

    navigator.vibrate(200);
    playAnimation("anim-chest");

    scrollStoryArea();
}
function btnLook() // Test Button
{
    if(isLogicPaused) return;

    // Read map description from a JSON

    navigator.vibrate(200);
    playAnimation("anim-look");

    scrollStoryArea();
}

