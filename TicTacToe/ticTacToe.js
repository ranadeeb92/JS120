const readline = require("readline-sync");
class Player {
  constructor(marker) {
    this.marker = marker;
    // mabey we need to define marker to keep truck of this player symbol
  }
  getMarker(){
    return this.marker;
  }
  play() {
    // we need a way for each player to play the game
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

class Square {
  // class constant
  static UNUSED_SQUARE = " ";
  static HUMAN_SQUARE = "X";
  static COPMUTER_SQUARE = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    // we need a way to keep truck on the square's marker
    this.marker = marker;
  }

  setMarker(marker){
    this.marker = marker;
  }
  toString() {
    return this.marker;
  }
}

class Board {
  constructor() {
    // we need a way to define borad 3x3
    // we need data struchure to store the information that will be on the board
    this.squares = {};
    for(let squareNum = 1; squareNum <= 9; squareNum++){
      this.squares[squareNum] = new Square();
    }
  }
  
  markSquareAt(key, marker){
    this.squares[key].setMarker(marker);
  }

  display() {
    console.log("");
    console.log("      |      |");
    console.log(
      `   ${this.squares["1"]}  |   ${this.squares["2"]}  |   ${this.squares["3"]}   `
    );
    console.log("      |      |");
    console.log("------+------+------");
    console.log("      |      |");
    console.log(
      `   ${this.squares["4"]}  |   ${this.squares["5"]}  |   ${this.squares["6"]}   `
    );
    console.log("      |      |");
    console.log("------+------+------");
    console.log("      |      |");
    console.log(
      `   ${this.squares["7"]}  |   ${this.squares["8"]}  |   ${this.squares["9"]}   `
    );
    console.log("      |      |");
    console.log("");
  }
}

class row {
  constructor() {
    // we need a way to define a row of three square
  }
}

// class marker {
//   constructor() {
//     //it is something that represent the player symbol "piece" on the board
//   }
// }

class TTTGame {
  constructor() {
    // need a board and teo player
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }
  play() {
    // Spike
    // orchestrate game play
    this.displayMessage("Welcome to our Tica Tac Toe Game!"); // for now we can pass the message manually
    while (true) {
      this.board.display();
      this.firstPlayerMoves();
      this.board.display();
      if (this.gameOver()) break;
      this.secondPlayerMoves();
      this.board.display();
      if (this.gameOver()) break;
      //break; // execute loop once for now
    }
    this.displayResults();
    this.displayMessage("Thank you for playing Tic Tac Toe! GoodBye!");
  }

  // displayWelcomeMessage() {} // we can replace it with displayMessage
  // displayGoodByeMessage() {} // we can replace it with displayMessage

  displayMessage(msg) {
    console.log(msg);
  }
  firstPlayerMoves() {
    let choice;
    while(true){
      choice = readline.question('Please choose square from 1 to 9  ');
      let integerValue = parseInt(choice, 10);
      if(integerValue >= 1 && integerValue <= 9) break;
      console.log('Sorry, That is not a valid choice!');
      console.log("");
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  }
  secondPlayerMoves() {
    let randomChoice = Math.floor((Math.random() * 9) + 1);
    this.board.markSquareAt(randomChoice, this.computer.getMarker());
  }
  gameOver() {}
  displayResults() {}
}

let game = new TTTGame();
game.play();
