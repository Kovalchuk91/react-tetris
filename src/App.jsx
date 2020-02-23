import React from "react";

import "./App.css";
import { arrayRandom } from "./lib/helpers";
import Board from "./components/Board";
import Square from "./lib/figures/Square";
import Line from "./lib/figures/Line";
import T from "./lib/figures/T";
import L from "./lib/figures/L";
import L2 from "./lib/figures/L2";
import Z from "./lib/figures/Z";
import Z2 from "./lib/figures/Z2";
import Next from "./components/Next";
import Info from "./components/Info";
import Controls from "./components/Controls";

const allFigures = [Line, Square, T, L, L2, Z, Z2];
const allColors = [
  "#f2c202",
  "#F16B54",
  "#55BB80",
  "#504DA0",
  "#F6904D",
  "#22C0F2"
];

class App extends React.Component {
  state = {
    isRunning: false,
    level: 1,
    score: 0,
    timer: null,
    filledCells: [],
    figure: Square,
    color: null,
    nextFigure: null,
    nextColor: null,
    rotate: 0,
    x: 0,
    y: 0
  };

  componentDidMount() {
    document.onkeydown = e => {
      e = e || window.event;

      if (e.keyCode === 38) {
        this.rotate();
      } else if (e.keyCode === 40) {
        this.moveDown();
      } else if (e.keyCode === 37) {
        this.moveLeft();
      } else if (e.keyCode === 39) {
        this.moveRight();
      }
    };

    const nextFigure = arrayRandom(allFigures);
    const nextColor = arrayRandom(allColors);
    this.setState({ nextFigure, nextColor }, () => this.startLevel(1));
  }

  startLevel = level => {
    alert(`Level ${level}`);
    this.setState({ level });

    clearInterval(this.state.timer);

    this.newFigure();

    const timer = setInterval(this.moveDown, 800 / level);
    this.setState({ timer });
  };

  newFigure = () => {
    const nextFigure = arrayRandom(allFigures);
    const figure = this.state.nextFigure;

    const nextColor = arrayRandom(allColors);
    const color = this.state.nextColor;

    const rotate = Math.floor(Math.random() * 3);
    const x = Math.abs(
      Math.floor(Math.random() * 11 - figure.getWidth(rotate))
    );

    this.setState(
      { figure, nextFigure, color, nextColor, x, y: 0, rotate },
      this.checkIfGameOver
    );
  };

  checkIfGameOver = () => {
    if (this.figureShouldFreeze()) {
      this.setState({ isRunning: false });
      clearInterval(this.state.timer);

      if (window.confirm('Game over! Restart?')) {
        window.location.reload();
      } else {
        window.close();
      }
    }
  };

  moveDown = () => {
    const { y } = this.state;

    this.setState({ y: y + 1 }, () => {
      if (this.figureShouldFreeze()) {
        this.freezeFigure();
        this.newFigure();
      }
    });
  };

  moveLeft = () => {
    const { x, y, rotate, figure } = this.state;

    // Don't move if figure is leftmost
    if (x === 0) {
      return;
    }

    const newX = x - 1;
    const newFigureCells = figure.getAllCells(newX, y, rotate);
    const leftCellsAreFree = !newFigureCells.some(([figureX, figureY]) => this.cellIsFilled(figureY, figureX));

    if (leftCellsAreFree) {
      this.setState({ x: x - 1 });
    }
  };

  moveRight = () => {
    const { x, y, rotate, figure } = this.state;

    // Don't move if rightmost
    if (x === 11 - figure.getWidth(rotate)) {
      return;
    }

    const newX = x + 1;
    const newFigureCells = figure.getAllCells(newX, y, rotate);
    const rightCellsAreFree = !newFigureCells.some(([figureX, figureY]) => this.cellIsFilled(figureY, figureX));

    if (rightCellsAreFree) {
      this.setState({ x: x + 1 });
    }
  };

  rotate = () => {
    const { rotate, figure, x, y } = this.state;

    const newRotate = rotate === 3 ? 0 : rotate + 1;
    const prevWidth = figure.getWidth(rotate);
    const newWidth = figure.getWidth(newRotate);
    const isStickedToRight = x + prevWidth === 11;
    let newX = x;
    let newY = y;

    // Prevent figure to be out of border
    if (isStickedToRight && prevWidth < newWidth) {
      newX = x - (newWidth - prevWidth);
    }

    // Move half up
    if (prevWidth > newWidth) {
      newY = y - Math.ceil((prevWidth - newWidth) / 2);
    }

    this.setState({ rotate: newRotate, x: newX, y: newY });
  };

  figureShouldFreeze = () => {
    const {figure, x, y, rotate} = this.state;
    const figureCells = figure.getAllCells(x, y, rotate);

    // Figure is at the bottom
    // eslint-disable-next-line no-unused-vars
    const isInBottom = figureCells.some(([_, figureY]) => figureY === 21);
    if (isInBottom) return true;

    // Figure touches freezed cells
    const { filledCells } = this.state;
    return figureCells.some(([figureX, figureY]) =>
      filledCells.some(([x, y]) => x === figureX && y === figureY + 1)
    );
  };

  freezeFigure = () => {
    const { filledCells, x, y, rotate, color } = this.state;
    const figureCells = this.state.figure.getAllCells(x, y, rotate).map(cell => {
      cell.push(color);
      return cell;
    });

    this.setState({ filledCells: [...filledCells, ...figureCells] }, this.removeFilledRows);
  };

  removeFilledRows = () => {
    const { filledCells } = this.state;
    let removedRows = 0;
    let newFilledCells = filledCells;
    const filledRows = [];

    // Go through each row and check if it is filled
    for (let row = 0; row <= 22; row += 1) {
      const rowsIsFilled = newFilledCells.filter(([x, y]) => y === row).length === 11;

      if (rowsIsFilled) {
        filledRows.push(row);

        // Go through rows and remove
        newFilledCells = newFilledCells.filter(([x, y]) => y !== row);

        // Go through all previous rows and move them down
        newFilledCells = newFilledCells.map(([x, y, color]) => {
          return y < row ? [x, y + 1, color] : [x, y, color];
        });

        removedRows += 1;
      }
    }

    this.setState({ filledCells: newFilledCells });
    this.addScores(removedRows);
  };

  addScores = removedRows => {
    const { level, score } = this.state;

    let scored = 0;
    switch (removedRows) {
      case 1:
        scored += 50 * (level + 1);
        break;
      case 2:
        scored += 150 * (level + 1);
        break;
      case 3:
        scored += 350 * (level + 1);
        break;
      case 4:
        scored += 1000 * (level + 1);
        break;
      default:
        return;
    }

    const newScore = score + scored;
    this.setState({ score: newScore });

    if (Math.ceil(newScore / 1000) > level) {
      this.startLevel(level + 1);
    }
  };

  cellIsFilled = (row, cell) => this.state.filledCells.some(([x, y]) => x === cell && y === row);

  cellColor = (row, cell) => {
    const { filledCells, x, y, rotate, color, figure } = this.state;

    const figureCells = figure.getAllCells(x, y, rotate);
    const cellInFigure = figureCells.find(([x, y]) => x === cell && row === y);
    if (cellInFigure) return color;

    const cellInFilled = filledCells.find(([x, y]) => x === cell && row === y);
    if (cellInFilled) return cellInFilled[2];

    return null;
  };

  render() {
    const { level, score, nextFigure, nextColor } = this.state;

    return (
      <div className="App">
        <div className="App-main">
          <div className="App-board">
            <Board cellColor={this.cellColor} />
          </div>
          <div className="App-info">
            <Info title="Level" info={level} />
            <Info title="Score" info={score} />
            {nextColor && <Next figure={nextFigure} color={nextColor} />}
          </div>
        </div>
        <div className="App-controls">
          <Controls
            up={this.rotate}
            left={this.moveLeft}
            right={this.moveRight}
            down={this.moveDown}
          />
        </div>
      </div>
    );
  }
}

export default App;
