var isLogicPaused = false;
var currentMap;

// ITEMS
const ITEM_SWORD = 1;
const ITEM_KEY0001 = 2;

const player =
{
    name: "DummyName",
    health: 100,
    maxHealth: 100,
    currentMap: 1,
    inventory: [ITEM_SWORD, ITEM_KEY0001, ITEM_KEY0001, ITEM_SWORD]
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

// INITIALIZE THE GAME
window.onload = function(e){ 
    generateInventoryWindow();
}

// ADD ITEM
function addItem(ID)
{
    player.inventory.push(ID); // Add item ID to player inventory

    let inventoryWindow = document.getElementById("inventoryWindow");

    let node = document.createElement("P");
    node.classList.add("itemTile")
    node.classList.add("nonSelectable")

    // Check which item we're adding, and add the correct label text
    if (ID == ITEM_SWORD) node.innerHTML = "⚔️ Sword";
    else if (ID == ITEM_KEY0001) node.innerHTML = "🔑 A key";

    inventoryWindow.appendChild(node);
    node = null;

}

// GENERATE ITEM WINDOW
function generateInventoryWindow()
{
    for(let itemIndex in player.inventory)
    {
        addItem(player.inventory[itemIndex]);
    }

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

function loadJSON(filename, callback) {   // COPYPASTE STUFF, TRY IF IT WORKS THEN DISSECT.

    var file = filename + ".json";
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', "map1.json", true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function initializeMap(loadedObject)
{
    currentMap = loadedObject;
    let interactables = "";

    for(i=0;i<currentMap.contents.length;i++)
    {
        if(i>0) interactables += ", "

        var node = "<span style='color:green'>" + currentMap.contents[i] + "</span>";
        interactables += node;
    }

    displayText(currentMap.description + "<br><br>Interactables: " + interactables + "<hr>" + "<br><br>" + "You're on map number <span style='color:red'>" + currentMap.mapID + "</span>");

    
    

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

    var targetMapID = 1;
    var file = "map" + targetMapID;
    loadJSON(file, function(response) {
          var loadedObject = JSON.parse(response); // Parse JSON string into object
          initializeMap(loadedObject); // Initialize the map object using the newly loaded data
    });
}
function btnLook() //
{
    if(isLogicPaused) return;
    displayText('You found a sword.')
    addItem(ITEM_SWORD);

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

