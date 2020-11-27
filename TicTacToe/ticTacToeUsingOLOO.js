const readline = require('readline-sync');
let Square = {
  UNNSED_SQUARE : " ",
  HUMAN_MARKER : "X",
  COMPUTER_MARKER : "O",
  init(marker = Square.UNNSED_SQUARE){
    this.marker = marker;
    return this;
  },
  toString() {
    return this.marker;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  getMarker() {
    return this.marker;
  },

  isUnused() {
    return this.marker === Square.UNNSED_SQUARE;
  }
};

let Player = {
  init(marker) {
    this.marker = marker;
    return this;
  },
  getMarker() {
    return this.marker;
  }
};

let Board = {
  init() {
    this.squares = {};
    for(let num = 1; num <= 9; num++) {
      this.squares[num] = Object.create(Square).init();
    }
    return this;
  },
  markSquareAt(key, marker) {
    this.squares[key].setMarker(marker);
  },
  unUsedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  },
  isFull() {
    return this.unUsedSquares().length === 0;
  },
  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });
    return markers.length;
  },
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
  },
  displayWithClear() {
    console.clear();
    console.log('');
    console.log('');
    this.display();
  }
}

let TTTGame = {
  POSSIBLE_WINNING_ROWS : [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],                              
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
  ],
  init() {
    this.board = Object.create(Board).init();
    this.human = Object.create(Player).init(Square.HUMAN_MARKER);
    this.computer = Object.create(Player).init(Square.COMPUTER_MARKER);
    return this;
  },
  displayMessage(msg) {
    console.log(msg);
  },
  firstPlayerMoves() {
    let choice;
    while (true) {
      let validChoices = this.board.unUsedSquares();
      choice = readline.question(`Please choose square from ${validChoices.join(', ')} `);
      if (validChoices.includes(choice)) break;
      console.log('Sorry, That is not a valid choice!');
      console.log("");
    }
    this.board.markSquareAt(choice, this.human.getMarker());
  },
  secondPlayerMoves() {
    let validChoices = this.board.unUsedSquares();
    let choice;
    do {
      choice = Math.floor((Math.random() * 9) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  },
  gameOver() {
    return this.board.isFull() || this.someoneWon();
  },

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  },

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  },

  displayResults() {
    if (this.isWinner(this.human)) {
      this.displayMessage('You Won! Congrats!');
    } else if (this.isWinner(this.computer)) {
      this.displayMessage('I won! I won! Take that, human!');
    } else {
      this.displayMessage('It is a tie!');
    }
  },
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
}

let game = Object.create(TTTGame).init();
game.play();