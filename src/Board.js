import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
// chanceLightStartsOn - determines if initial board cells are TRUE or FALSE
function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let row = 0; row < nrows; row++) {
      let row = []
      for (let col = 0; col < ncols; col++) {
        //*****TRUE or FALSE: */
        //**** is the random number less than 'chanceLightStartsOn'? */
        row.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(row)
    }
    console.log(initialBoard)
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // Win if every cell is false
    return board.every(row => row.every(cell => !cell))
  }

  if (hasWon()) {
    return (
      <div>
        `You won!`
      </div>
    )
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        console.log(x)
        console.log(y)
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          // change 
          // true cells -> false and
          // false cells -> true
          boardCopy[y][x] = !boardCopy[y][x];
          console.log(boardCopy[y][x])
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      // take oldBoard and make a copy of it (map)
      const boardCopy = oldBoard.map(row => [...row])
      console.log(x)
      console.log(y)

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy)
      // TODO: return the copy
      console.log(boardCopy)
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board
  let tableBoard = []

  for (let y = 0; y < nrows; y++) {
    let row = []
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`
      // let each row for the number of columns have a Cell
      row.push(
        <Cell
          key={coord}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      )
    }
    // push the row (incased in <tr> tags to the table)
    tableBoard.push(<tr key={y}>{row}</tr>)
  }

  // TODO
  return (
    <table>
      <tbody>
        {tableBoard}
      </tbody>
    </table>
  )
}

export default Board;
