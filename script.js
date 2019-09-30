// in the forest, T = a tree (inpassable), B = bear - starting location , H = honey location, and J = jar location
// C = background to make clear
let forest = [
  "CCCCTTTTTCCCCCCCCCC",
  "CCCCT   TCCCCCCCCCC",
  "CCCCTJ  TCCCCCCCCCC",
  "CCTTT  JTTCCCCCCCCC",
  "CCT  J J TCCCCCCCCC",
  "TTT T TT TCCCTTTTTT",
  "T   T TT TTTTT  HHT",
  "T J  J          HHT",
  "TTTTT TTT TBTT  HHT",
  "CCCCT     TTTTTTTTT",
  "CCCCTTTTTTTCCCCCCCC"
];

let bearLocationArray; //a bear-tracker!
let jarCounter = 1;  // used simply to make an id for jars so that they can interact with honey squares properly


//=============================================================================================
// defining and prototyping ForestSquareImage
//==========================================================================================

function ForestSquareImage(row, column, forestLetter, imageUrl) {
  this.img = document.createElement("img");
  // this.img.location = [row , column];
  this.img.forestLetter = forestLetter;
  if (this.img.forestLetter === "H") {
    this.img.forestletter = " "; //treat honey as open space.
  }
  if (this.img.forestLetter === "B") {
    bearLocationArray = [row, column]; //initial setting of bearLocationArray - only done once.
    this.img.id = "bear";
  }

  if (this.img.forestLetter === "J") {
    this.img.id = "jar" + jarCounter; //in CSS, i need to set jar opacity to 1 to override the honey settings
    jarCounter++;
  }
  this.img.src = imageUrl;
  this.img.className = "forestSquareImage " + imageUrl.slice(4, -4);
  targetDiv = document.getElementById("div" + row + "_" + column);
  targetDiv.appendChild(this.img);
}

ForestSquareImage.prototype = {
  constructor: ForestSquareImage,
  moveSelf
};

//=====================================================================================================
//These functions are properties of the object ForestSquareImage
//=================================================================================================



function moveSelf(oldLocation, newLocation) {
  //input format is ([oldRow, oldColumn] , [newRow, newColumn])

  newDivLocation = document.getElementById(
    "div" + newLocation[0] + "_" + newLocation[1]
  );
  oldDivLocation = document.getElementById(
    "div" + oldLocation[0] + "_" + oldLocation[1]
  );

  pictureThatIsMoving = oldDivLocation.removeChild(oldDivLocation.firstChild);
  whatWeTookOutOfNewLocation = newDivLocation.removeChild(
    newDivLocation.firstChild
  );

  newDivLocation.appendChild(pictureThatIsMoving);
  oldDivLocation.appendChild(whatWeTookOutOfNewLocation);
}

//=======================================================================
// Create The Initial Forest
//======================================================================

function drawForest() {
  document.getElementById("thisIsTheForest").innerHTML = "";
  for (let forestRow = 0; forestRow < forest.length; forestRow++) {
    drawForestRow(forestRow);
  }
}

//append a div onto the thisIsTheForest div that will hold a row of forest.
function drawForestRow(row) {
  forestRowDiv = document.createElement("div");
  forestRowDiv.className = "row";
  forestRowDiv.id = "row" + row;
  destination = document.getElementById("thisIsTheForest");
  destination.appendChild(forestRowDiv);
  drawForestColumns(row);
}

function makeForestSquareDiv(initialLetter, row, column) {
  forestSquareDiv = document.createElement("div");
  forestSquareDiv.initialLetter = initialLetter;
  forestSquareDiv.className = "forestSquareDiv " + initialLetter;
  forestSquareDiv.id = "div" + row + "_" + column;
  forestSquareDiv.location = [row, column];
  destination = document.getElementById("row" + row);
  destination.appendChild(forestSquareDiv);
}

function drawForestColumns(row) {
  for (
    let forestColumn = 0;
    forestColumn < forest[row].length;
    forestColumn++
  ) {
    initialLetter = findInitialLetter(row, forestColumn);
    //creates the outside div of the individual column div
    makeForestSquareDiv(initialLetter, row, forestColumn);

    //creates the inside of the individual column div
    imageUrl = determineImageToDraw(initialLetter);
    const forestSquareImage = new ForestSquareImage(
      row,
      forestColumn,
      initialLetter,
      imageUrl
    );
  }
}

function findInitialLetter(row, column) {
  forestRowString = forest[row].slice(); //return shallow copies of the row and item
  forestLetter = forestRowString[column].slice();
  return forestLetter;
}

//=========================================================================
// Dealing with the Jars
//=========================================================================


function toggleJarPicture(locationOfJar) {
  jarLocationDiv = getTheDivForThisLocation(locationOfJar)
  if (jarLocationDiv.initialLetter === "H") {
    jarLocationDiv.firstChild.src = "img/fulljar.png"
    jarLocationDiv.firstChild.className = "forestSquareImage fullJar"
    
  } else {
    jarLocationDiv.firstChild.src = "img/emptyjar.png"
    jarLocationDiv.firstChild.className = "forestSquareImage emptyJar"
  }
}

function checkForWin(){
  allTheFullJars = document.querySelectorAll(".fullJar")
  if (allTheFullJars.length === 6){
    showPlayerHasWon()
  }
}

function showPlayerHasWon(){
  document.getElementById("youWon").style.display = "inline-block"
}

function moveJar(jarLocation, direction) {
  jarNeighborArray = returnNextCoordinates (jarLocation, direction)
  jarNeighborContents = returnWhatIsInThisLocation(jarNeighborArray)
  if (jarNeighborContents === " " || jarNeighborContents === "H") {
    moveSelf(jarLocation, jarNeighborArray)  //move the jar and then...
    toggleJarPicture(jarNeighborArray) // switch to full or empty jar and then...
    moveSelf(bearLocationArray, whereBearWantsToMove) //move the bear where the jar was
    bearLocationArray = whereBearWantsToMove.slice()  //update bearLocationArray after moving bear
    checkForWin()
  } else return
}

//===============================================================
// Utility functions used several places
//==============================================================
function determineImageToDraw(letter) {
  if (letter === " ") {
    return "img/forestFloor.png";
  } else if (letter === "T") {
    return "img/tree.png";
  } else if (letter === "B") {
    return "img/bear.png";
  } else if (letter === "H") {
    return "img/forestFloor.png"; //honey will be drawn with background image on the html div
  } else if (letter === "J") {
    return "img/emptyjar.png";
  } else if (letter === "C") {
    return "img/blank.png";
  }
}

function returnNextCoordinates(startingArray, direction) {
  if (direction === "up") {
    return [parseInt(startingArray.slice(0,1),10)-1, parseInt(startingArray.slice(1),10) ]
  } else if (direction === "down") {
    return [parseInt(startingArray.slice(0,1),10)+1, parseInt(startingArray.slice(1),10) ]
  } else if (direction === "left") {
    return [parseInt(startingArray.slice(0,1),10), parseInt(startingArray.slice(1),10) -1 ]
  } else if (direction === "right") {
    return [parseInt(startingArray.slice(0,1),10), parseInt(startingArray.slice(1),10) +1 ]
  } else console.log ("error in returnNextCoordinates function")
}

function returnWhatIsInThisLocation(location) {
  thisLocationDiv = getTheDivForThisLocation(location)
  whatIsInThisLocation = thisLocationDiv.firstChild.forestLetter
  return whatIsInThisLocation
}

function getTheDivForThisLocation(location){
  theDiv = document.getElementById("div" + location[0] + "_" + location[1] )
  return theDiv
}

//====================================================================================
// Moving the Bear
//====================================================================================

function moveBear(e) {
  keyPressed = determineWhatKeyIsPressed(e);
  if (keyPressed === "") { return } //guard against anything but up/down/right/left
  direction = keyPressed  
  whereBearWantsToMove = returnNextCoordinates (bearLocationArray , direction)
  whatIsWhereBearWantsToMove = returnWhatIsInThisLocation(whereBearWantsToMove)
  if (whatIsWhereBearWantsToMove === "J") {
    moveJar(whereBearWantsToMove, direction)
  } else if (whatIsWhereBearWantsToMove === " " || whatIsWhereBearWantsToMove === "H") {
    moveSelf(bearLocationArray, whereBearWantsToMove)
    bearLocationArray = whereBearWantsToMove.slice()
  }
}

//============================================================================
// Things that interact with the keyboard/mouse
//===========================================================================

function determineWhatKeyIsPressed(e) {
  console.log(e.key);
  return e.key === "ArrowUp" || e.key === "w" || e.key === "W"
  ? "up"
  : e.key === "ArrowDown" || e.key === "s" || e.key === "S"
  ? "down"
  : e.key === "ArrowRight" || e.key === "d" || e.key === "D"
  ? "right"
  : e.key === "ArrowLeft" || e.key === "a" || e.key === "A"
  ? "left"
  : "";
}

function startOver() {
  window.location.reload();
}


//reloads the page when "startOver" button is clicked
document.getElementById("startOver").addEventListener("click", startOver);

//show instructions when "instructionsButton" is clicked
document.getElementById("instructionsButton").addEventListener("click", e => {
  document.getElementById("instructionsToHide").style.display = "inline-block";
  document.getElementById("instructionsButton").style.display = "none";
});

//hide instructions when "hideInstructions" button is clicked
document.getElementById("hideInstructions").addEventListener("click", () => {
  document.getElementById("instructionsToHide").style.display = "none";
  document.getElementById("instructionsButton").style.display = "inline-block";
});

document.addEventListener("keydown", moveBear);

//===========================================================================
// And of course we need something to start it all off when the page loads!
//=============================================================================
drawForest();
