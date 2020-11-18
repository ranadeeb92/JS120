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

class Board {
  constructor() {
    // we need a way to define borad 3x3
    // we need data struchure to store the information that will be on the board
  }
}

class square {
  constructor() {
    // we need a way to keep truck on the square's marker
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
  }
  paly() {
    // orchestrate game play
    this.displayWelcomeMessage();
    while (true) {
      this.displayTheBoard();
      this.firstPlayerMoves();
      if (this.gameOver()) break;
      this.secondPlayerMoves();
      if (this.gameOver()) break;
    }
    this.displayResults();
    this.displayGoodByeMessage();
  }

  displayWelcomeMessage() {} // we can replace it with displayMessage
  displayTheBoard() {}
  firstPlayerMoves() {}
  secondPlayerMoves() {}
  gameOver() {}
  displayResults() {}
  displayGoodByeMessage() {} // we can replace it with displayMessage
}

let game = new TTTGame();
game.play();
