import "./App.css";
import { useState } from "react";

const winConditions = (count: number[]) => {
  const conditionList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let item = 0; item < conditionList.length; item++) {
    const [a, b, c] = conditionList[item];
    if (count[a] && count[a] === count[b] && count[a] === count[c]) {
      return count[a];
    }
  }
  return null;
};

const tablebody = () => {
  let [count, setCount] = useState(Array().fill(null));
  let [nextPlayer, setNextPlayer] = useState(true);
  const handleClick = (index: number) => {
    if (count[index] || winConditions(count)) return;
    const newcount = count.slice();
    newcount[index] = nextPlayer ? "x" : "o";
    setCount(newcount);
    console.log(count.length);
    setNextPlayer(!nextPlayer);
  };

  const Restart = () => {
    window.location.reload();
    return;
  };

  let tie = () => {
    let x = 0;
    for (let s = 0; s < 9; s++) {
      if (count[s] != null) {
        x++;
      }
    }
    if (x === 9) return true;
    return false;
  };

  const winner = winConditions(count);
  let msg = winner
    ? `"${winner}" won the match. Please Restart..`
    : count.length == 0
    ? `Start with "x"`
    : tie()
    ? "No one won the match!! Please Restart..."
    : `Next player is "${nextPlayer ? "x" : "o"}"`;

  const tabledata = (index: number) => {
    return <td onClick={() => handleClick(index)}>{count[index]}</td>;
  };

  return (
    <>
      <div className="message">{msg}</div>
      <table className="board" border={1}>
        <tbody>
          <tr>
            {tabledata(0)}
            {tabledata(1)}
            {tabledata(2)}
          </tr>
          <tr>
            {tabledata(3)}
            {tabledata(4)}
            {tabledata(5)}
          </tr>
          <tr>
            {tabledata(6)}
            {tabledata(7)}
            {tabledata(8)}
          </tr>
        </tbody>
      </table>
      <div className="btn">
        <button
          onClick={() => {
            Restart();
          }}
        >
          <b>Restart Game</b>
        </button>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <div className="board-container">
        <div>
          <h1>Tic-Tac-Toe</h1>
        </div>
        {tablebody()}
      </div>
    </>
  );
}

export default App;
