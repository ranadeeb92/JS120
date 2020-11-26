const readline = require("readline-sync");
class Player {
  constructor(marker) {
    this.marker = marker;
    // mabey we need to define marker to keep truck of this player symbol
  }
  getMarker() {
    return this.marker;
  }
  play() {
    // we need a way for each player to play the game
  }
}
class Square {
  // class constant
  static UNUSED_SQUARE = " ";
  static HUMAN_SQUARE = "X";
  static COPMUTER_SQUARE = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    // we need a way to keep truck on the square's marker
    this.marker = marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }

  setMarker(marker) {
    this.marker = marker;
  }
  getMarker() {
    return this.marker;
  }
  toString() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_SQUARE);
  }
}
class Computer extends Player {
  constructor() {
    super(Square.COPMUTER_SQUARE);
  }
}

class Board {
  constructor() {
    // we need a way to define borad 3x3
    // we need data struchure to store the information that will be on the board
    this.squares = {};
    for (let squareNum = 1; squareNum <= 9; squareNum++) {
      this.squares[squareNum] = new Square();
    }
  }
  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }

  displayWithClear() {
    console.clear();
    console.log('');
    console.log('');
    this.display();          
  }
}

class TTTGame {
  constructor() {
    // need a board and teo player
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  static POSSIBLE_WINNING_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],                              
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
  ]
  play() {
    // Spike
    // orchestrate game play
    this.displayMessage("Welcome to our Tica Tac Toe Game!"); // for now we can pass the message manually
    this.board.display();
    while (true) {
      this.firstPlayerMoves();
      if (this.gameOver()) break;
      this.secondPlayerMoves();
      if (this.gameOver()) break;
      this.board.displayWithClear();
    }
    this.board.displayWithClear();
    this.displayResults();
    this.displayMessage("Thank you for playing Tic Tac Toe! GoodBye!");
  }

  displayMessage(msg) {
    console.log(msg);
  }
  firstPlayerMoves() {
    let choice;
    while (true) {
      let validChoices = this.board.unusedSquares();
      choice = readline.question(`Please choose square from ${validChoices.join(', ')} `);
      //let integerValue = parseInt(choice, 10);
      if (validChoices.includes(choice)) break;
      console.log('Sorry, That is not a valid choice!');
      console.log("");
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }
  secondPlayerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;
    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }

  displayResults() {
    if (this.isWinner(this.human)) {
      this.displayMessage('You Won! Congrats!');
    } else if (this.isWinner(this.computer)) {
      this.displayMessage('I won! I won! Take that, human!');
    } else {
      this.displayMessage('It is a tie!');
    }
  }
}

let game = new TTTGame();
game.play();
