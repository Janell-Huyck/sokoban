let bearLocation = []; // where on the map the player's bear is.  expressed as [row, column]
let oldBearLocation = []; //used when moving bear
let newBearLocation = [];
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


function determineStartingMove() {
  //don't let player move out of bounds on their first turn
}

function clearTheOldMaze() {
    for (let rowToClear = 0; rowToClear < maze.length; rowToClear++) {
        document.getElementById("row" + rowToClear).innerHTML = ""
    }
}

function drawMazeAndUpdateBearLocation() {
    clearTheOldMaze()
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
        } 
        else if (maze[mazeRow][mazeColumnItem] === "S") {
            drawMazeItem(bearImage, mazeRow);
            startLocation = [mazeRow, mazeColumnItem];
            maze[mazeRow] = maze[mazeRow].replace("S", "B")  //changes the S to a B so that I should be able to move it.
        } 
        else if (maze[mazeRow][mazeColumnItem] === "F") {
            drawMazeItem(cabinImage, mazeRow);
            finishLocation = [mazeRow, maze[mazeRow][mazeColumnItem]];
        } 
        else if (maze[mazeRow][mazeColumnItem] === "B") {
            bearLocation = [mazeRow, mazeColumnItem];
            console.log("the bear is now at " + bearLocation);
            drawMazeItem(bearImage, mazeRow);
        } 
        else {
            drawMazeItem(blankImage, mazeRow);
        }
    }
}
}


function drawMazeItem(imageToDraw, mazeRow) {
    var imageName = imageToDraw.slice(4, -4)
    var img = document.createElement("IMG");
    var destination = document.getElementById("row" + mazeRow);
    img.src = imageToDraw;
    img.className = "mazeItem " + imageName;
    destination.appendChild(img);
}


function moveBear(e) {
    oldBearLocation = bearLocation.slice(0) 
    console.log("bear location before movement (key registered) is " + bearLocation)
    var spaceUp = maze[bearLocation[0]-1][bearLocation[1]]
    var spaceDown = maze[bearLocation[0]+1][bearLocation[1]]
    var spaceRight = maze[bearLocation[0]][bearLocation[1]+1]
    var spaceLeft = maze[bearLocation[0]][bearLocation[1]-1]
    
    if (e.key === "ArrowUp" || e.key === "W" || e.key === "w") {
        if (spaceUp == "W" || spaceUp == undefined) {return}      
        bearLocation[0]-- 
        moveBearInMazeArray()
        drawMazeAndUpdateBearLocation()
        console.log("we move the bear up 1 row.  bear location is now: " + bearLocation)
                
    } else if (e.key === "ArrowDown" || e.key === "S" || e.key === "s") {
        if (spaceDown == "W" || spaceDown == undefined) {return}
        bearLocation[0]++ 
        moveBearInMazeArray()       
        drawMazeAndUpdateBearLocation()
        console.log("we move the bear down 1 row.  bear location is now: " + bearLocation)
      
    } else if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
        if (spaceLeft == "W" || spaceLeft == undefined) {return}
        bearLocation[1]-- 
        moveBearInMazeArray()
        drawMazeAndUpdateBearLocation()
        console.log("we move the bear left 1 row.  bear location is now: " + bearLocation)
        
    } else if (e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
        if (spaceRight == "W" || spaceRight == undefined) {return}
        maze[bearLocation[0]] =  maze[bearLocation[0]].replace("B ", " B") 
        bearLocation[1] = bearLocation[1] + 1
        moveBearInMazeArray()   
        drawMazeAndUpdateBearLocation()
        console.log("we move the bear right 1 row.  bear location is now: " + bearLocation)
    }

}


function moveBearInMazeArray() {
    console.log("old bear location was " + oldBearLocation);
    console.log("and the new bear location is" + bearLocation)
    console.log("the old location showed a "+ maze[oldBearLocation[0]][oldBearLocation[1]] )
    console.log("while the new location used to show a " + maze[bearLocation[0]][bearLocation[1]])
    maze[oldBearLocation[0]][oldBearLocation[1]] = " " 
    newColumnLocation = oldBearLocation[1]
    console.log(typeof newColumnLocation)

    maze[bearLocation[0]][bearLocation[1]] = "B"
}


createHTMLRows();
drawMazeAndUpdateBearLocation();
bearLocation = startLocation.slice(0); 
oldBearLocation = bearLocation.slice(0);
document.addEventListener("keydown", moveBear);

//after winning, set a timer before popping up YOU WON screen.  set YOU WON to display:flex
//draw the maze on the screen
//find S on the map and set the playerLocation to that
