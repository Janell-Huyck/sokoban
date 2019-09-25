let bearLocation = []; // where on the map the player's bear is.  expressed as [row, column]
let oldBearLocation = []; //used when moving bear
let startLocation = []; // [row, column])
let finishLocation = []; // [row, column])

let treeImage = "img/tree.png";
let bearImage = "img/bear.png";
let cabinImage = "img/cabin.png";
let blankImage = "img/blank.jpg";

// in the maze, W = a wall (tree), S = starting location, F = finish location, and B = bear location (starts at S)
//original maze:
let maze = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W W W",
  "W W W WWW WWWWW W W W",
  "W W W   W     W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW"
];

// function startOver(){
//     // bearLocation = []; 
//     // oldBearLocation = [];
//     // startLocation = []; 
//     // finishLocation = []; 
//     clearTheOldMaze()
//     redrawMaze()
//     bearLocation = startLocation.slice(0);
//     oldBearLocation = bearLocation.slice(0);

// }

//draw the row divs in the HTML so that we can later draw the images at them
function createHTMLRows() {
    for (let newRow = 0; newRow < maze.length; newRow++) {
        var newDiv = document.createElement("div");
        newDiv.id = "row" + newRow;
        newDiv.className = "mazeRow";
        var destination = document.getElementById("thisIsTheMaze");
        destination.appendChild(newDiv);
    }
}


function clearTheOldMaze() {
  for (let rowToClear = 0; rowToClear < maze.length; rowToClear++) {
    document.getElementById("row" + rowToClear).innerHTML = "";
  }
}


function redrawMaze() {
  clearTheOldMaze();
  //for every row
  for (let mazeRow = 0; mazeRow < maze.length; mazeRow++) {
    //for every column in that row
    for (
      let mazeColumnItem = 0;
      mazeColumnItem < maze[mazeRow].length;
      mazeColumnItem++
    ) {
      //draw the appropriate picture on the screen for each character.
      if (maze[mazeRow][mazeColumnItem] === "W") {
        drawMazeItem(treeImage, mazeRow);
      
    } else if (maze[mazeRow][mazeColumnItem] === "S") {
        drawMazeItem(bearImage, mazeRow);
        startLocation = [mazeRow, mazeColumnItem];
        maze[mazeRow] = maze[mazeRow].replace("S", "B"); //changes the S to a B so that I should be able to move it.
      
    } else if (maze[mazeRow][mazeColumnItem] === "F") {
        drawMazeItem(cabinImage, mazeRow);
        finishLocation = [mazeRow, mazeColumnItem];
      
    } else if (maze[mazeRow][mazeColumnItem] === "B") {
        drawMazeItem(bearImage, mazeRow);
      
    } else {
        drawMazeItem(blankImage, mazeRow);
      }
    }
  }
}


function drawMazeItem(imageToDraw, mazeRow) {
  //make an image element  
  var img = document.createElement("IMG");
  //put the assigned image in that element
  img.src = imageToDraw;
  //create class name of "mazeItem" and the title of the image
  var imageName = imageToDraw.slice(4, -4);
  img.className = "mazeItem " + imageName;
  //append image to the correct row
  var destination = document.getElementById("row" + mazeRow);
  destination.appendChild(img);
}


function moveBear(e) {
  //hold where the bear WAS as an array that does not reference its source array 
  oldBearLocation = bearLocation.slice(0);
  
  //look around the bear and determine what's next to him in all 4 directions
  var spaceUp = maze[bearLocation[0] - 1][bearLocation[1]];
  var spaceDown = maze[bearLocation[0] + 1][bearLocation[1]];
  var spaceRight = maze[bearLocation[0]][bearLocation[1] + 1];
  var spaceLeft = maze[bearLocation[0]][bearLocation[1] - 1];
  
  checkForWin(spaceUp)
  checkForWin(spaceDown)
  checkForWin(spaceLeft)
  checkForWin(spaceRight)
  
  //respond to directional keys
  if (e.key === "ArrowUp" || e.key === "W" || e.key === "w") {  //use arrow keys or WASD
    if (spaceUp == "W" || spaceUp == undefined) {  //make sure the target destination is open and legal
      return;
    }
    //move the B in the maze array one row up by slicing and concatenating the rows
    var bearColumnIndex = maze[oldBearLocation[0]].indexOf("B");
    
    maze[oldBearLocation[0]] =              //puts a " " where the bear used to be
      maze[oldBearLocation[0]].slice(0, bearColumnIndex) +
      " " +
      maze[oldBearLocation[0]].slice(bearColumnIndex + 1);

    maze[oldBearLocation[0] - 1] =          //puts a "B" where the bear used to be
      maze[oldBearLocation[0] - 1].slice(0, bearColumnIndex) +
      "B" +
      maze[oldBearLocation[0] - 1].slice(bearColumnIndex + 1);
    
    bearLocation[0]--;                       //update bear location
    redrawMaze();
    return;

  } else if (e.key === "ArrowDown" || e.key === "S" || e.key === "s") {
    if (spaceDown == "W" || spaceDown == undefined) {
      return;
    }
    var bearColumnIndex = maze[oldBearLocation[0]].indexOf("B");
    
    maze[oldBearLocation[0]] =
      maze[oldBearLocation[0]].slice(0, bearColumnIndex) +
      " " +
      maze[oldBearLocation[0]].slice(bearColumnIndex + 1);
    
    maze[oldBearLocation[0] + 1] =
      maze[oldBearLocation[0] + 1].slice(0, bearColumnIndex) +
      "B" +
      maze[oldBearLocation[0] + 1].slice(bearColumnIndex + 1);
    
    bearLocation[0]++;
    redrawMaze();
    return;

  } else if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
    if (spaceLeft == "W" || spaceLeft == undefined) {
      return;
    }
    maze[bearLocation[0]] = maze[bearLocation[0]].replace(" B", "B ");
    bearLocation[1]--;
    redrawMaze();
    return;

  } else if (e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
    if (spaceRight == "W" || spaceRight == undefined) {
      return;
    }
    maze[bearLocation[0]] = maze[bearLocation[0]].replace("B ", " B");
    bearLocation[1] = bearLocation[1] + 1;
    redrawMaze();
    return;
  }
}


function checkForWin(target) {
    if (target !== "F") {return}
    document.getElementById("youWon").style.display="flex"
}

createHTMLRows();
redrawMaze();
bearLocation = startLocation.slice(0);
oldBearLocation = bearLocation.slice(0);
document.addEventListener("keydown", moveBear);
document.getElementById("startOver").addEventListener("click", startOver)
