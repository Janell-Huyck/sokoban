let bearLocation = []  // where on the map the player's bear is.  expressed as row index, column(string) index
let startLocation = []  //row, column
let finishLocation = [] //row, column

let treeImage = "img/tree.png"

let bearImage ="img/bear.png"

let cabinImage = "img/cabin.png"

let blankImage = "img/blank.jpg"





// in the maze, W = a wall (tree), S = starting location, F = finish location, and B = bear location (starts at S)
//original maze:
const maze = [  
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
    "WWWWWWWWWWWWWWWWWWWWW",
];

//draw the row divs in the HTML so that we can later draw the images at them
function createHTMLRows() {
    console.log("attempting to write HTML Rows")
    for (let newRow = 0; newRow < maze.length ; newRow++) {
        var newDiv = document.createElement('div')
        newDiv.id = ("row" + newRow)
        newDiv.className = "mazeRow"
        var destination = document.getElementById("thisIsTheMaze")
        destination.appendChild(newDiv)
    }
}

function drawMaze() {
    console.log("starting drawMaze function")
    for (let mazeRow = 0; mazeRow < maze.length; mazeRow++) {
        console.log("starting drawMazeRow function")
        drawMazeRow(mazeRow)
        console.log("completed drawMazeRow(" + mazeRow + ")")
    }
    if (bearLocation === []) {
        bearLocation = startLocation
        
        determineStartingMove()
    }
}

function determineStartingMove() {

}

function drawMazeRow(mazeRow) {
    for (let mazeColumnItem = 0; mazeColumnItem < maze[mazeRow].length; mazeColumnItem++) {
        console.log("mazeColumnItem count is " + mazeColumnItem)
        if (maze[mazeRow][mazeColumnItem] === "W") {
            drawMazeItem(treeImage, mazeRow)
        } else if (maze[mazeRow][mazeColumnItem] === "S") {
            drawMazeItem(bearImage, mazeRow)                  //TO DO - figure out what and how to draw the start
            startLocation = [mazeRow, maze[mazeRow][mazeColumnItem]]
            console.log("start Location is " + startLocation)
        } else if (maze[mazeRow][mazeColumnItem] === "F") {
            drawMazeItem(cabinImage, mazeRow)
            finishLocation = [mazeRow, maze[mazeRow][mazeColumnItem]]
        } else if (maze[mazeRow][mazeColumnItem] === "B") {
            drawMazeItem(bearImage, mazeRow)
            bearLocation = [mazeRow, maze[mazeRow][mazeColumnItem]]
        } else {
            drawMazeItem(blankImage, mazeRow)
        }
    }
}

// function drawTree() {

// }

// function drawStart() {

// }

// function drawFinish() {

// }

// function drawBear() {

// }

function image(thisImg) {
    var img = document.createElement("IMG");
    img.src = "images/"+thisImg;
    document.getElementById('imageDiv').appendChild(img);
}

function drawMazeItem(imageToDraw, mazeRow) {
    console.log("attempting to draw a " + imageToDraw)
    destination = document.getElementById("row" + mazeRow)
        var img = document.createElement("IMG")
        img.src = imageToDraw
    img.className = "mazeItem"
    destination.appendChild(img)

}

function moveBear() {

}

createHTMLRows()
drawMaze()
document.addEventListener("keydown", moveBear);

//after winning, set a timer before popping up YOU WON screen.  set YOU WON to display:flex
//draw the maze on the screen
//find S on the map and set the playerLocation to that