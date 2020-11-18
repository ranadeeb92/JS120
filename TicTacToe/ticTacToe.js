class Player {
  constructor() {
    // mabey we need to define marker to keep truck of this player symbol
  }
  mark() {
    // need a way to access the borad
    // and mark a square with tis player marker
  }
  play() {
    // we need a way for each player to play the game
  }
}

class Human extends Player {
  constructor() {}
}
class Computer extends Player {
  constructor() {}
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
  toString() {
    return this.marker;
  }
}

class Board {
  constructor() {
    // we need a way to define borad 3x3
    // we need data struchure to store the information that will be on the board
    this.squares = {
      1: new Square(), // the value is the marker associated with each square
      2: new Square(),
      3: new Square(),
      4: new Square(),
      5: new Square(),
      6: new Square(),
      7: new Square(),
      8: new Square(),
      9: new Square(),
    };
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

class marker {
  constructor() {
    //it is something that represent the player symbol "piece" on the board
  }
}

class TTTGame {
  constructor() {
    // need a board and teo player
    this.board = new Board();
  }
  play() {
    // Spike
    // orchestrate game play
    this.displayMessage("Welcome to our Tica Tac Toe Game!"); // for now we can pass the message manually
    while (true) {
      this.board.display();
      this.firstPlayerMoves();
      if (this.gameOver()) break;
      this.secondPlayerMoves();
      if (this.gameOver()) break;
      break; // execute loop once for now
    }
    this.displayResults();
    this.displayMessage("Thank you for playing Tic Tac Toe! GoodBye!");
  }

  // displayWelcomeMessage() {} // we can replace it with displayMessage
  // displayGoodByeMessage() {} // we can replace it with displayMessage

  displayMessage(msg) {
    console.log(msg);
  }
  firstPlayerMoves() {}
  secondPlayerMoves() {}
  gameOver() {}
  displayResults() {}
}

let game = new TTTGame();
game.play();
