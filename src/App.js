import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    history: [{
      squares: Array(9).fill(null)
    }],
    xIsNext: true,
    stepNumber: 0
  }

  jumpTo = step => {
    console.log(step, 'step jumpTo');
    this.setState({
      stepNumber: step,
      xIsNext: ( step % 2 ) === 0 ? 'O' : 'X',
    });
  }

  handleClick = (e) => {
    const { history } = this.state
    const current = history[history.length - 1];
    let { squares } = current;

    if(calculateWinner(squares) || squares[e]) {
      return;
    }
    squares = {
      ...squares,
      [e] : this.state.xIsNext ? 'X' : "O"
    }

    this.setState({
      history: history.concat([{squares }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    console.log(history, current, winner, 'console, render')

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <ul key={move}>
          <button className="moves" onClick={this.jumpTo.bind(this, move)}>{desc}</button>
        </ul>
      )
    })
    let status;
      if(winner) {
        status = `Winner ${winner}`;
      } else {
        status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
      }
    return (
      <div className="game">
        <div><h1 className="heading">Welcome to Tic-Tac-Toe Game</h1></div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <div>{moves}</div>
        </div>
      </div>
    )
  }
}

export default App;

class Board extends React.Component {

  renderSquare = (i) => {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

const Square = props => {
  return (
      <button
        className="square"
        onClick={props.onClick}
      >
        {props.value || <span>&nbsp;</span> }
      </button>
  )
}

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for ( let i = 0; i < lines.length; i++ ) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


