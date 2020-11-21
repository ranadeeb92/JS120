const readline = require('readline-sync');

function Square(marker) {
  this.marker = marker || Square.UNUSED_SQUARE;
}
Square.UNUSED_SQUARE = " ";
Square.HUMAN_SQUARE = "X";
Square.COMPUTER_SQUARE = "O";

Square.prototype.setMarker = function(marker) {
  this.marker = marker;
}
Square.prototype.getMarker = function() {
  return this.marker;
}
Square.prototype.isUnused = function() {
  return this.marker === Square.UNUSED_SQUARE;
}
Square.prototype.toString = function() {
  return this.marker;
}

function Player(marker) {
  this.marker = marker;
}
Player.prototype.getMarker= function() {
  return this.marker;
}

function Human() {
  Player.call(this, Square.HUMAN_SQUARE);
}
Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;

function Computer() {
  Player.call(this, Square.COMPUTER_SQUARE);
}
Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;

function Board() {
  this.squares = {};
  for (let num = 1; num <= 9; num++) {
    this.squares[num] = new Square()
  }
}

Board.prototype.markSquareAt = function(key, marker) {
  this.squares[key].setMarker(marker);
}
Board.prototype.unUsedSquares = function() {
  let keys = Object.keys(this.squares);
  return keys.filter(key => this.squares[key].isUnused());
}
Board.prototype.isFull = function() {
  return this.unUsedSquares().length === 0;
}
Board.prototype.countMarkersFor = function(player, keys) {
  let markers = keys.filter(key => {
    return this.squares[key].getMarker() === player.getMarker();
  });
  return markers.length;
}
Board.prototype.display = function() {
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
Board.prototype.displayWithClear = function() {
  console.clear();
  console.log('');
  console.log('');
  this.display();
}

function TTTGame() {
  this.board = new Board();
  this.human = new Human();
  this.computer = new Computer();
}
TTTGame.POSSIBLE_WINNING_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],                              
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7']
];
TTTGame.prototype.displayMessage = function(msg) {
  console.log(msg);
}
TTTGame.prototype.firstPlayerMoves = function() {
  let choice;
  while (true) {
    let validChoices = this.board.unUsedSquares();
    choice = readline.question(`Please choose square from ${validChoices.join(', ')} `);
    if (validChoices.includes(choice)) break;
    console.log('Sorry, That is not a valid choice!');
    console.log("");
  }
  this.board.markSquareAt(choice, this.human.getMarker());
}
TTTGame.prototype.secondPlayerMoves = function() {
  let validChoices = this.board.unUsedSquares();
  let choice;
  do {
    choice = Math.floor((Math.random() * 9) + 1).toString();
  } while (!validChoices.includes(choice));

  this.board.markSquareAt(choice, this.computer.getMarker());
}
TTTGame.prototype.gameOver = function() {
  return this.board.isFull() || this.someoneWon();
}

TTTGame.prototype.someoneWon = function() {
  return this.isWinner(this.human) || this.isWinner(this.computer);
}

TTTGame.prototype.isWinner = function(player) {
  return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
    return this.board.countMarkersFor(player, row) === 3;
  });
}

TTTGame.prototype.displayResults = function() {
  if (this.isWinner(this.human)) {
    this.displayMessage('You Won! Congrats!');
  } else if (this.isWinner(this.computer)) {
    this.displayMessage('I won! I won! Take that, human!');
  } else {
    this.displayMessage('It is a tie!');
  }
}
TTTGame.prototype.play = function() {
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

let game = new TTTGame();
game.play();
