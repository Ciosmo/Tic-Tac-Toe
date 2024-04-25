/*
  To remember things components use: useState

*/
import { useState } from "react";



/*
  Functional component. Everything that's in the return statement is the JSX
  JSX - Describes the UI component that it will render.
  <button> is a JSX component
  return = whatever comes after is returned as a value to the caller of the function.

  The params values of these components are known as: 'props'  short for   'properties'. 
  It's a way for passing data from parent to child components in React

  We're using destructuring to extract the 'value' and 'onSquareclick' properties from 'props' object

 */

function Square( {value, onSquareClick} ) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


function Board({xIsNext, squares, onPlay}) {

  /* i = takes the index of the square that must be updated   */
  function handleClick(i){
    if(calculateWinner(squares) || squares[i]){
        return;
    }
    const nextSquares = squares.slice();
    
    /* Instead of using the if condition, I used the ternary operator to write less code
    */
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);

  }


  /* calculates the winner or next player */
  const winner = calculateWinner(squares);
  let status;
  winner ? (status = 'Winner: ' + winner) : (status = "Next player: " + (xIsNext ? "X": "O"))


  return(
    <>
      <div className="status">{status}</div>
      <div className="board-row">        
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
          <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
          <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
          <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
          <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
          <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}


export default function Game () {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {    
    const nextHistory =  [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, moveIdx) => {
    let description = moveIdx === currentMove ? `Estas en el movimiento #${moveIdx}` : `Go to move ${moveIdx}`
    return(
      <li key={moveIdx}>
        {moveIdx !== currentMove ? (
         <button onClick={() => jumpTo(moveIdx)}>{description}</button>
        ) : (
          <div>{description}</div>
        )}
      </li>
    );
  });

  return(
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3 ,4, 5],
    [6, 7, 8],
    [0 ,3 ,6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

  ];
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }

  return null;
}