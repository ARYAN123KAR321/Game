import React from "react";
import ReactDOM from "react-dom";

class Square extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        clicked: false
      };
    }
  
    handleClick = () => {
      this.props.onClick();
      // Set the square as clicked
      this.setState({ clicked: true });
      // After 1 second, remove the clicked state
      setTimeout(() => {
        this.setState({ clicked: false });
      }, 100);
    }
  
    render() {
      return (
        <button
          className={`square ${this.state.clicked ? 'clicked' : ''}`}
          onClick={this.handleClick}
        >
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      return (
        <div className="board">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
        winner: null,
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (this.state.winner || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      const winner = calculateWinner(squares);
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        xIsNext: !this.state.xIsNext,
        stepNumber: history.length,
        winner: winner,
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
        winner: null,
      });
    }
  
    resetGame() {
      this.setState({
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
        winner: null,
      });
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
  
      const moves = history.map((step, move) => (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>Reset Game</button>
        </li>
      ));
  
      let status;
      if (this.state.winner) {
        status = <div className="win-message">{this.state.winner === 'X' ? 'A wins' : 'B wins'}</div>;
      } else if (this.state.stepNumber === 9) {
        status = <div className="tie-message">The game is a tie!</div>;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'A' : 'B');
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div className="status">{status}</div>
            <button className="reset-button" onClick={() => this.resetGame()}>Reset Game</button>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  