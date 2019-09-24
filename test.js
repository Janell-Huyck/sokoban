/* tests to run:

location of player is outside board boundaries
location of player is within a wall
location of player is at finish and no message comes up
player doesn't move on arrow keypress
player isn't moved to start on press of "reset"
cannot determine player location
no maze found

*/

//cannot determine player location - location is underined
console.assert(bearLocation !== undefined, "We have lost the bear!  His location is 'undefined'!");

// console.assert(bearLocation === [], "The bear needs a home!  His location is []...");  
//that test only looks at location at the start of the program, before the maze is even run!  Not helpful!