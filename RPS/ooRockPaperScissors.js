// the RPS game is :
// The user makes a choice.
// The computer makes a choice.
// The winner is displayed.

// The classical approach to planning an OO app includes several steps:
//1- Write a textual description of the problem or exercise.
//2- Extract the significant nouns and verbs from the description.
//3- Organize and associate the verbs with the nouns.

// first step:
// The RPS game is two players game,
// in our case the user is one of those player
// and the anthor palyer is a computer.
// the game start with user chosing
//   - one of three options : Rock, Paper or Scissor.
// then the computer make a choice
// then displey the winner who selected
//  - by comparing their choices with the following rules:
// paper wraps the rock => paper beats rock
// scissor cuts the paper => scissor beats paper

// rock crushes scissor => rock beats scissors
// rock crushes lizard => rock beats lizard

// lizard poisons spock => lizard beats spock
// lizard eats paper => lizard beats paper

// spock smashes scissors => spock beats scissors

// scissors decapitates lizard => scissors beats lizard
// paper disproves spock => paper beats spock

// spock vaporize rock => spock beats rock
// keeping score unitl one of the player reachs five points
//

// second step:
// nouns : rock, scissor, papper, score, lizard, spock, user, computer => player, move, rule, score
// verbs : compare, choose, incrementScore

// third step:
// player => choose a move
// move => comaper moves
// rule => compare moves based on rule
// score => increment winner score

// objects => nouns
// methods => verbs

const readline = require("readline-sync");
const MOVES_TYPE = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];

function createComputer() {
  let playerObj = createPlayer();
  let computerObj = {
    choose(moves) {
      let currentMoves = moves.reduce((result, move) => {
        let i = 0;
        while (i <= move.weight) {
          result.push(move.type);
          i++;
        }
        return result;
      }, []);
      console.log(currentMoves);
      let randomIndex = Math.floor(Math.random() * currentMoves.length);
      this.move.type = currentMoves[randomIndex];
    },
  };
  return Object.assign(playerObj, computerObj);
}

function createHuman() {
  let palyerObj = createPlayer();
  let humanObj = {
    choose() {
      let userInput;
      while (true) {
        console.log(
          `Choose one of the following moves: ${MOVES_TYPE.join(", ")}`
        );
        userInput = readline.question();
        if (MOVES_TYPE.includes(userInput)) break;
        console.log("Wrong choice!");
      }
      this.move.type = userInput;
    },
  };
  return Object.assign(palyerObj, humanObj);
}
function createPlayer() {
  return {
    // state
    move: createMove(),
    score: 0,
    incrementScore() {
      this.score += 1;
    },
  };
}

function createMove(type = null) {
  return {
    type: type,
    weight: 0,
    incrementWeight() {
      this.weight += 1;
    },
    decrementWeight() {
      if (this.weight - 1 < 0) {
        this.weight = 0;
      } else {
        this.weight -= 1;
      }
    },
  };
}
function createMovesArray() {
  let moves = [];
  while (moves.length < MOVES_TYPE.length) {
    MOVES_TYPE.forEach((type) => {
      let move = createMove(type);
      moves.push(move);
    });
  }
  return moves;
}

// next step : Orchestration engine:
// engine object which orchestrate the objects
//and where the procedural program flow should be.
const RPSGame = {
  movesHistory: [],
  moves: createMovesArray(),
  human: createHuman(),
  computer: createComputer(),
  displayWelComeMessage() {
    console.log("Welcom to Rock, Paper, Scissors Game!");
  },
  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors game, Goodbye!");
  },
  displayWinner(winner) {
    console.log(`Your choice: ${this.human.move.type}`);
    console.log(`The computer chose: ${this.computer.move.type}`);
    if (winner === "Human") {
      console.log("You win!");
    } else if (winner === "Computer") {
      console.log("Computer win!");
    } else {
      console.log(winner);
    }
  },
  compareChoices() {
    if (
      (this.human.move.type === "Paper" &&
        (this.computer.move.type === "Rock" ||
          this.computer.move.type === "Spock")) ||
      (this.human.move.type === "Rock" &&
        (this.computer.move.type === "Scissors" ||
          this.computer.move.type === "Lizard")) ||
      (this.human.move.type === "Scissors" &&
        (this.computer.move.type === "Paper" ||
          this.computer.move.type === "Lizard")) ||
      (this.human.move.type === "Lizard" &&
        (this.computer.move.type === "Spock" ||
          this.computer.move.type === "Paper")) ||
      (this.human.move.type === "Spock" &&
        (this.computer.move.type === "Rock" ||
          this.computer.move.type === "Scissors"))
    ) {
      return "Human";
    } else if (
      (this.computer.move.type === "Paper" &&
        (this.human.move.type === "Rock" ||
          this.human.move.type === "Spock")) ||
      (this.computer.move.type === "Rock" &&
        (this.human.move.type === "Scissors" ||
          this.human.move.type === "Lizard")) ||
      (this.computer.move.type === "Scissors" &&
        (this.human.move.type === "Paper" ||
          this.human.move.type === "Lizard")) ||
      (this.computer.move.type === "Lizard" &&
        (this.human.move.type === "Spock" ||
          this.human.move.type === "Paper")) ||
      (this.computer.move.type === "Spock" &&
        (this.human.move.type === "Rock" ||
          this.human.move.type === "Scissors"))
    ) {
      return "Computer";
    } else {
      return "It Is A Tie!";
    }
  },
  changeScore(winner) {
    if (winner === "Human") {
      this.human.score += 1;
    } else if (winner === "Computer") {
      this.computer.score += 1;
    }
  },
  playMatch() {
    this.clear();
    this.displayScores();
    this.human.choose();
    this.computer.choose(this.moves);
    let winner = this.compareChoices();
    this.changeScore(winner);
    this.storeGameMoves(winner);
    this.displayWinner(winner);
    this.analyzeGameMoves();
  },
  analyzeGameMoves() {
    // let lastHands = this.movesHistory[this.movesHistory.length - 1];
    // let computerMove = lastHands[0];
    // let move = this.moves.find((move) => move.type === computerMove);
    this.moves.forEach((move) => {
      if (this.isWinningMove(move.type)) {
        move.incrementWeight();
      } else {
        move.decrementWeight();
      }
    });
  },
  isWinningMove(move) {
    let choosingTimes = this.movesHistory.filter((ele) => ele[0] === move)
      .length;
    let winningTimes = this.movesHistory.filter(
      (ele) => ele[0] === move && ele[2] === "Computer"
    ).length;
    let winningRate = Math.floor((winningTimes / choosingTimes) * 100);
    return winningRate > 60;
  },
  palyAgain() {
    console.log("Would you like to play again? Enter(Yes/No)");
    let answer = readline.question().toLowerCase();
    return answer[0] === "y";
  },
  displayGameWinner() {
    if (this.human.score === 5) {
      console.log("You won the Game!");
    } else {
      console.log("Computer won the Game!");
    }
  },
  displayScores() {
    console.log(
      `Your score: ${this.human.score}, Computer score: ${this.computer.score}`
    );
  },
  storeGameMoves(winner) {
    this.movesHistory.push([
      this.computer.move.type,
      this.human.move.type,
      winner,
    ]);
  },
  clear() {
    console.clear();
  },
  reset() {
    this.human.score = 0;
    this.computer.score = 0;
  },
  play() {
    this.displayWelComeMessage();
    while (true) {
      this.reset();
      this.clear();
      while (true) {
        this.playMatch();
        if (this.human.score === 5 || this.computer.score === 5) break;
        readline.question("Enter any letter to continue..");
      }
      this.clear();
      this.displayScores();
      this.displayGameWinner();
      if (!this.palyAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
