var isLogicPaused = false;
var currentMap;

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

function displayText(string) // DISPLAYS A NEW TEXT ENTRY IN THE MAIN STORY WINDOW
{
    var mainStoryArea = document.getElementById("mainArea");

    var node = document.createElement("P");
    node.innerHTML = string;
    mainStoryArea.appendChild(node);

    scrollStoryArea();
}

function loadJSON(callback) {   // COPYPASTE STUFF, TRY IF IT WORKS THEN DISSECT.

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'map1.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function initializeMap(loadedObject)
{
    currentMap = loadedObject;
    displayText(currentMap.description + "<br><br>" + "You're on map number <span style='color:red'>" + currentMap.mapID + "</span>");
    console.log(currentMap);
}

// ====================================================================================================
// Button Event Listeners
// ====================================================================================================

// BUTTONS
function btnInitializeMap() // Map loading test. This will run when the player changes the map.
{
    if(isLogicPaused) return;

    // Vibrate and play the animation
    navigator.vibrate(200);
    playAnimation("anim-run");

    loadJSON(function(response) {
          var loadedObject = JSON.parse(response); // Parse JSON string into object
          initializeMap(loadedObject); // Initialize the map object using the newly loaded data
    });
}
function btnLook() //
{
    if(isLogicPaused) return;
    displayText('You look around.')

    // Read map description from a JSON

    navigator.vibrate(200);
    playAnimation("anim-look");

    scrollStoryArea();
}
function btnAttack() // Test Button
{
    if(isLogicPaused) return;
    displayText('You attack the <span style="color:red">enemy.</span>')

    navigator.vibrate(200);
    playAnimation("anim-attack");

    scrollStoryArea();
}
function btnRun() // Test Button
{
    if(isLogicPaused) return;

    displayText("You move to the next map.")

    navigator.vibrate(200);
    playAnimation("anim-run");

    scrollStoryArea();
}
function btnChest() // Test Button
{
    if(isLogicPaused) return;

    displayText("You open the chest.")

    navigator.vibrate(200);
    playAnimation("anim-chest");

    scrollStoryArea();
}

