import React, { useState } from "react";
import Board from "./Board";
import calculateWinner from "./Winner";

function Game() {

    const [history, setHistory] = useState([
      {
        squares: Array(25).fill(null)
      }
    ]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [locations, setLocations] = useState([]);
    const [checkClickInMoves, setCheckClickInMoves] = useState(Array(25).fill(0));
    const [isAscending, setIsAscending] = useState(true);
  
    function handleClick(i) {
      let historyTemp = history.slice(0, stepNumber + 1);
      let current = historyTemp[historyTemp.length - 1];
      let squares = current.squares.slice();
      let locationsTemp = locations.slice(0, stepNumber);

      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? "X" : "O";

      
      setHistory([...history, {
        squares: squares
      }]);
      
      setStepNumber(history.length);
      setXIsNext(!xIsNext);
      setLocations([...locationsTemp, [i]]);
    }
  
    function jumpTo(step) {
        let checkClickInMoves = Array(25).fill(0);
        checkClickInMoves[step] = 1;

        setStepNumber(step);
        setXIsNext((step % 2) === 0);
        setCheckClickInMoves(checkClickInMoves);
    }

    function locationDisplay(locations, move) {
        let location = '';
        if(move !== 0) {
            let locationValue = locations[move-1];
            let x = locationValue % 5 + 1;
            let y = Math.floor(locationValue / 5) + 1;
            location = `(${x}, ${y})`;
        }

        return location;
    }

    function changeOrder() {      
      setIsAscending(!isAscending);
    }
  
    function render() {
      const current = history[stepNumber];
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {

        const customButton = checkClickInMoves[move] === 1 ? { background: "red" } :  { background: "" };   // Feature 2

        const location = locationDisplay(locations, move);  // Feature 1

        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button style={customButton} onClick={() => jumpTo(move)}>{desc} {location}</button>
          </li>
        );
      });

      if(!isAscending) {
        moves.reverse();
      }
  
      let status;
      if (winner) {
        status = "Winner: " + winner.player;
      } else if (history.length !== current.squares.length + 1) {
        status = "Next player: " + (xIsNext ? "X" : "O");
      } else {
        status = "Draw!!!";    // Feature 6
      }

      let squaresToWin = winner ? winner.SquaresToWin : null
  
      return {
        current: current, 
        moves: moves, 
        status: status, 
        squaresToWin: squaresToWin
      };
    }

    let {current, moves, status, squaresToWin} = render();

    

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => handleClick(i)}
            squaresWin={squaresToWin}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => changeOrder()}>Change Order</button>   
          {/* Feature 4 */}
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

export default Game;