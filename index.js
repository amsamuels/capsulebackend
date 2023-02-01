let gridSize = 5;
let grid = createGrid(gridSize);
const input = [
  [1, 2],
  [2, 2],
  [3, 2],
];

input.forEach(([x, y]) => {
  grid[x][y] = 'X';
});

// createGrid creates a 2D array with the specified size
function createGrid(size) {
  // Initialize the grid array
  let grid = [];
  // Loop through the rows
  for (let i = 0; i < size; i++) {
    // Initialize the current row
    grid[i] = [];
    // Loop through the columns
    for (let j = 0; j < size; j++) {
      // Add the current cell to the row
      grid[i][j] = '';
    }
  }
  return grid;
}

// function to create headers for grid
function createHeaders(size) {
  // initialize result string
  let result = '  ';
  // loop through size of grid
  for (let i = 0; i < size; i++) {
    // add i to result string with spaces in between
    result += i + ' ';
  }
  return result;
}

// function to print grid
function printGrid(grid) {
  // create colums for grid
  const colums = createHeaders(grid.length);
  // loop through each row in grid
  for (let i = 0; i < grid.length; i++) {
    let row = i + ' ';
    //  if (!grid[i].includes('X')) continue;
    // loop through each cell in the current row
    for (let cell of grid[i]) {
      // add cell value to the row string with spaces in between
      row += cell + '  ';
    }
  }
}

// function to count live neighbors
function countLiveNeighbors(grid, x, y) {
  // initialize live neighbors count
  let liveNeighbors = 0;
  // loop through each row in grid
  const r = grid.length;
  // loop through each column in grid
  const c = grid[0].length;
  // loop through each cell in the current row
  for (let i = -1; i <= 1; i++) {
    // loop through each cell in the current column
    for (let j = -1; j <= 1; j++) {
      // if the current cell is the same as the cell we are checking, continue
      if (i === 0 && j === 0) continue;
      // get the row and column of the current cell
      const row = x + i;
      const col = y + j;
      // if the current cell is out of bounds, continue
      if (
        row >= 0 &&
        row < r &&
        col >= 0 &&
        col < c &&
        // if the current cell contain 'X', increment the live neighbors count
        grid[row][col] === 'X'
      ) {
        liveNeighbors++;
      }
    }
  }
  return liveNeighbors;
}

// function to create next generation
const nextGeneration = (grid) => {
  // get the number of rows and columns in the grid
  const r = grid.length;
  const c = grid[0].length;
  // create a new array to hold the next generation coordinates
  const aliveCells = [];
  const result = createGrid(grid.length);
  // loop through each row in the grid
  for (let i = 0; i < r; i++) {
    // loop through each cell in the current row
    for (let j = 0; j < c; j++) {
      // get the number of live neighbors for the current cell
      const getLiveNeighbors = countLiveNeighbors(grid, i, j);
      // if the current cell is alive
      if (grid[i][j] === 'X') {
        // if the current cell has less than 2 or more than 3 live neighbors, the cell dies
        if (getLiveNeighbors == 2 || getLiveNeighbors == 3) {
          result[i][j] = 'X';
          aliveCells.push([i, j]);
        } else {
          // if the current cell has 2 or 3 live neighbors, the cell lives on to the next generation
          result[i][j] = '';
        }
      } else if (grid[i][j] == '' && getLiveNeighbors == 3) {
        result[i][j] = 'X';
        aliveCells.push([i, j]);
      }
    }
  }
  return aliveCells;
};

console.log(printGrid(grid));
console.log(nextGeneration(grid));

// in the terminal run the following command to run the code.
// node index.js

// this progarm is't able to handle large number of cells as it is not optimized.
// i am struggling to optimize it. i have been doing some reading on it but i am not able to figure it out.
// i would appreciate if i could get some feedback on how i can optimize the program to handle large numbers.
// writing and optermizing algorimts is still a new concept to me and i am still learning throuh solving leetcode problems.
