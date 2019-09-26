// let bearLocation = []; // where on the map the player's bear is.  expressed as [row, column]
// let oldBearLocation = []; //used when moving bear
// let startLocation = []; // [row, column])
// let finishLocation = []; // [row, column])

let treeImage = "img/tree.png";
let bearImage = "img/bear.png";
let blankImage = "img/blank.jpg";
let fulljarImage = "img/fulljar.png"
let emptyjarImage = "img/emptyjar.png"
let honeyImage = "img/honey.png"


// in the maze, T = a tree (inpassable), B = bear - starting location , H = honey location, and J = jar location
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


function drawForest() {
  document.getElementById("thisIsTheForest").innerHTML=""
  for (let forestRow = 0; forestRow < forest.length; forestRow++) {
    drawForestRow(forestRow)
  }
}

//append a div onto the thisIsTheForest div that will hold a row of forest.
function drawForestRow(row) {
  forestRowDiv = document.createElement('div');
  forestRowDiv.className = "row";
  forestRowDiv.id = "row" + row;
  destination = document.getElementById("thisIsTheForest");
  destination.appendChild(forestRowDiv);
  drawForestColumns(row)
}


function drawForestColumns(row) {
  for (let forestColumn = 0; forestColumn < forest[row].length; forestColumn++){
    squareDiv = document.createElement('div');
    squareDiv.id = "row" + row + "square" + forestColumn;
    squareDiv.style.backgroundImage = determineImageToDraw(row, forestColumn);
    squareDiv.className = "square " + squareDiv.style.backgroundImage.slice(9, -6);
    squareDiv.row = row;
    squareDiv.column = forestColumn;

    // squareDiv.topNeighbor = determineTopNeighbor(row, forestColumn);
    // squareDiv.rightNeighbor = determineRightNeighbor(row, forestColumn);
    // squareDiv.leftNeighbor = determineLeftNeighbor(row, forestColumn);
    // squareDiv.bottomNeighbor = determineBottomNeighbor(row, forestColumn);
    squareDiv.location = [row , forestColumn];
    // squareDiv.weight = determineSquareWeight(row, forestColumn);
    // squareDiv.hasJar = determineJarStatus(row, forestColumn);
    // squareDiv.hasTree = determineTreeStatus(row, forestColumn);
    // squareDiv.hasBear = determineBearStatus(row, forestColumn);
    // squareDiv.hasHoney = determineHoneyStatus(row, forestColumn);
    destination = document.getElementById("row" + row);
    destination.appendChild(squareDiv)
    // drawSquare(squareDiv);
  }
}

function drawSquare(currentSquare){
  currentSquare.style.backgroundImage="url(currentSquare.image)";
}

function fetchLetterFromGrid(row,column){
  gridLetter = forest[row][column]
  return gridLetter
}

function determineImageToDraw(row,column){
  gridLetter = fetchLetterFromGrid(row,column)
  if (gridLetter === " "){
    return "url('img/blank.png')"
  } else if (gridLetter === "T") {
    return "url('img/tree.png')"
  } else if (gridLetter === "B") {
    return "url('img/bear.png')"
  } else if (gridLetter === "H") {
    return "url('img/honey.png')"
  } else if (gridLetter === "J"){
    return "url('img/emptyjar.png')"
  } else if (gridLetter === "C") {
    return ""
  }
}

function determineTopNeighbor(row,column){

}

function determineRightNeighbor(row,column){

}

function determineLeftNeighbor(row,column) {

}

function determineBottomNeighbor(row,column) {

}

function determineSquareWeight(row,column) {

}



drawForest();

// //draw the row divs in the HTML so that we can later draw the images at them
// function createHTMLRows() {
//   for (let newRow = 0; newRow < maze.length; newRow++) {
//     var newDiv = document.createElement("div");
//     newDiv.id = "row" + newRow;
//         newDiv.className = "mazeRow";
//         var destination = document.getElementById("thisIsTheMaze");
//         destination.appendChild(newDiv);
//       }
// }


// function clearTheOldMaze() {
//   for (let rowToClear = 0; rowToClear < maze.length; rowToClear++) {
//     document.getElementById("row" + rowToClear).innerHTML = "";
//   }
// }


// function redrawMaze() {
//   clearTheOldMaze();
//   //for every row
//   for (let mazeRow = 0; mazeRow < maze.length; mazeRow++) {
//     //for every column in that row
//     for (
//       let mazeColumnItem = 0;
//       mazeColumnItem < maze[mazeRow].length;
//       mazeColumnItem++
//       ) {
//         //draw the appropriate picture on the screen for each character.
//         if (maze[mazeRow][mazeColumnItem] === "W") {
//           drawMazeItem(treeImage, mazeRow);
      
//         } else if (maze[mazeRow][mazeColumnItem] === "S") {
//           drawMazeItem(bearImage, mazeRow);
//           startLocation = [mazeRow, mazeColumnItem];
//         maze[mazeRow] = maze[mazeRow].replace("S", "B"); //changes the S to a B so that I should be able to move it.
        
//     } else if (maze[mazeRow][mazeColumnItem] === "F") {
//       drawMazeItem(cabinImage, mazeRow);
//       finishLocation = [mazeRow, mazeColumnItem];
      
//     } else if (maze[mazeRow][mazeColumnItem] === "B") {
//       drawMazeItem(bearImage, mazeRow);
      
//     } else {
//       drawMazeItem(blankImage, mazeRow);
//     }
//   }
// }
// }


// function drawMazeItem(imageToDraw, mazeRow) {
//   //make an image element  
//   var img = document.createElement("IMG");
//   //put the assigned image in that element
//   img.src = imageToDraw;
//   //create class name of "mazeItem" and the title of the image
//   var imageName = imageToDraw.slice(4, -4);
//   img.className = "mazeItem " + imageName;
//   //append image to the correct row
//   var destination = document.getElementById("row" + mazeRow);
//   destination.appendChild(img);
// }


// function moveBear(e) {
//   //hold where the bear WAS as an array that does not reference its source array 
//   oldBearLocation = bearLocation.slice(0);
  
//   //look around the bear and determine what's next to him in all 4 directions
//   var spaceUp = maze[bearLocation[0] - 1][bearLocation[1]];
//   var spaceDown = maze[bearLocation[0] + 1][bearLocation[1]];
//   var spaceRight = maze[bearLocation[0]][bearLocation[1] + 1];
//   var spaceLeft = maze[bearLocation[0]][bearLocation[1] - 1];
  
//   checkForWin(spaceUp)
//   checkForWin(spaceDown)
//   checkForWin(spaceLeft)
//   checkForWin(spaceRight)
  
//   //respond to directional keys
//   if (e.key === "ArrowUp" || e.key === "W" || e.key === "w") {  //use arrow keys or WASD
//     if (spaceUp == "W" || spaceUp == undefined) {  //make sure the target destination is open and legal
//       return;
//     }
//     //move the B in the maze array one row up by slicing and concatenating the rows
//     var bearColumnIndex = maze[oldBearLocation[0]].indexOf("B");
    
//     maze[oldBearLocation[0]] =              //puts a " " where the bear used to be
//     maze[oldBearLocation[0]].slice(0, bearColumnIndex) +
//     " " +
//     maze[oldBearLocation[0]].slice(bearColumnIndex + 1);
    
//     maze[oldBearLocation[0] - 1] =          //puts a "B" where the bear used to be
//     maze[oldBearLocation[0] - 1].slice(0, bearColumnIndex) +
//     "B" +
//     maze[oldBearLocation[0] - 1].slice(bearColumnIndex + 1);
    
//     bearLocation[0]--;                       //update bear location
//     redrawMaze();
//     return;
    
//   } else if (e.key === "ArrowDown" || e.key === "S" || e.key === "s") {
//     if (spaceDown == "W" || spaceDown == undefined) {
//       return;
//     }
//     var bearColumnIndex = maze[oldBearLocation[0]].indexOf("B");
    
//     maze[oldBearLocation[0]] =
//     maze[oldBearLocation[0]].slice(0, bearColumnIndex) +
//     " " +
//     maze[oldBearLocation[0]].slice(bearColumnIndex + 1);
    
//     maze[oldBearLocation[0] + 1] =
//     maze[oldBearLocation[0] + 1].slice(0, bearColumnIndex) +
//     "B" +
//     maze[oldBearLocation[0] + 1].slice(bearColumnIndex + 1);
    
//     bearLocation[0]++;
//     redrawMaze();
//     return;
    
//   } else if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
//     if (spaceLeft == "W" || spaceLeft == undefined) {
//       return;
//     }
//     maze[bearLocation[0]] = maze[bearLocation[0]].replace(" B", "B ");
//     bearLocation[1]--;
//     redrawMaze();
//     return;
    
//   } else if (e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
//     if (spaceRight == "W" || spaceRight == undefined) {
//       return;
//     }
//     maze[bearLocation[0]] = maze[bearLocation[0]].replace("B ", " B");
//     bearLocation[1] = bearLocation[1] + 1;
//     redrawMaze();
//     return;
//   }
// }


// function checkForWin(target) {
//   if (target !== "F") {return}
//   document.getElementById("youWon").style.display="flex"
// }

// function startOver(){
//   window.location.reload()
// }

// createHTMLRows();
// redrawMaze();
// bearLocation = startLocation.slice(0);
// oldBearLocation = bearLocation.slice(0);
// document.addEventListener("keydown", moveBear);
// document.getElementById("startOver").addEventListener("click", startOver)
