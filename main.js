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
    inventory: []
};

const currentLocation =
{
    description: "Blah blah something",
    interactables: []
};

function scrollStoryArea(elementHeight)
{
    var mainStoryArea = document.getElementById("mainArea");

    
    mainStoryArea.scrollTop = mainStoryArea.scrollHeight - elementHeight - 40;
}

// INITIALIZE THE GAME
window.onload = function(e){ 
    generateInventoryWindow();
}

// ADD ITEM
function addItem(ID)
{

    let inventoryWindow = document.getElementById("inventoryWindow");

    if(player.inventory.includes(ID)) // If player already has item of this ID, alter the existing element
    {
        let amountOwned = 1;
        for(itemIndex in player.inventory)
        {
            if(player.inventory[itemIndex] == ID)
            {
                amountOwned++;
            }
        }

        let itemElement = document.getElementById(ID);

        if (ID == ITEM_SWORD) itemElement.innerHTML = "⚔️ Sword x" + amountOwned;
        else if (ID == ITEM_KEY0001) itemElement.innerHTML = "🔑 Wooden key x" + amountOwned;

        console.log("Already has" + ID);
    }
    else // Create a new item <p> element
    {
        let node = document.createElement("P");
        node.classList.add("itemTile")
        node.classList.add("nonSelectable")
        node.id = ID;

        if (ID == ITEM_SWORD) node.innerHTML = "⚔️ Sword";
        else if (ID == ITEM_KEY0001) node.innerHTML = "🔑 Wooden key";
        else node.innerHTML = "Unknown item";

        inventoryWindow.appendChild(node);

        console.log("Adding" + ID);
    }

    
    node = null;

    player.inventory.push(ID); // Add item ID to player inventory
}

function disableButtons()
{
    var arrInput = document.getElementsByTagName("input");
    for(i in arrInput)
    {
        arrInput[i].disabled = true;
    }
}

function enableButtons()
{
    var arrInput = document.getElementsByTagName("input");
    for(i in arrInput)
    {
        arrInput[i].disabled = false;
    }
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
    setTimeout(() => {  element.classList.remove(anim); isLogicPaused = false; enableButtons() }, 990);
}

function displayText(string) // DISPLAYS A NEW TEXT ENTRY IN THE MAIN STORY WINDOW
{
    var mainStoryArea = document.getElementById("mainArea");

    var node = document.createElement("P");
    node.innerHTML = string;
    mainStoryArea.appendChild(node);

    console.log("New node height: " + mainStoryArea.lastChild.clientHeight);

    scrollStoryArea(mainStoryArea.lastChild.clientHeight);
    
}

function loadJSON(filename, callback) {   // COPYPASTE STUFF, TRY IF IT WORKS THEN DISSECT.

    var file = filename + ".json";
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
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

    displayText("<hr>" + currentMap.description + "<br>" + "<br><br>" + "You're on map number <span style='color:red'>" + currentMap.mapID + "</span>");

    
    

    console.log(currentMap);
}

function lookAround(loadedObject)
{
    currentMap = loadedObject;
    let interactables = "";

    for(i=0;i<currentMap.contents.length;i++)
    {
        if(i>0) interactables += ", "

        var node = "<span style='color:green'>" + currentMap.contents[i] + "</span>";
        interactables += node;
    }

    displayText("Items in the room: " + interactables);
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

    disableButtons();
}
function btnLook() //
{
    if(isLogicPaused) return;
    
    var targetMapID = 1;
    var file = "map" + targetMapID;
    loadJSON(file, function(response) {
          var loadedObject = JSON.parse(response); // Parse JSON string into object
          lookAround(loadedObject); // Look for items around the map
    });

    addItem(ITEM_SWORD);
    addItem(ITEM_KEY0001);

    // Read map description from a JSON

    navigator.vibrate(200);
    playAnimation("anim-look");

    disableButtons();
}
function btnAttack() // Test Button
{
    if(isLogicPaused) return;
    displayText('You attack the <span style="color:red">enemy.</span>')

    navigator.vibrate(200);
    playAnimation("anim-attack");

    disableButtons();
}
function btnRun() // Test Button
{
    if(isLogicPaused) return;

    displayText("You move to the next map.")

    navigator.vibrate(200);
    playAnimation("anim-run");

    
}
function btnChest() // Test Button
{
    if(isLogicPaused) return;

    displayText("You open the chest.")

    navigator.vibrate(200);
    playAnimation("anim-chest");

    
}

