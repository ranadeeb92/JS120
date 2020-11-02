// the RPS game is :
// The user makes a choice.
// The computer makes a choice.
// The winner is displayed.

// The classical approach to planning an object-oriented application includes several steps:
//1- Write a textual description of the problem or exercise.
//2- Extract the significant nouns and verbs from the description.
//3- Organize and associate the verbs with the nouns.

// first step:
// The RPS game is two players game, in our case the user is one of those player and the anthor palyer is a computer.
// the game start with user chosing one of three options : Rock, Paper or Scissor.
// then the computer make a choice
// then displey the winner who selected by comparing their choices with the following rules:
// paper wraps the rock => paper beats rock
// scissor cuts the paper => scissor beats paper
// rock crushes scissor => rock beats scissors

// second step:
// nouns : rock, scissor, papper, user, computer => player, move, rule
// verbs : compare, choose

// third step:
//player => choose a move
// move => comaper moves
// rule => compare moves based on rule

// objects => nouns
// methods => verbs

const readline = require("readline-sync");

function createComputer() {
  let playerObj = createPlayer();
  let computerObj = {
    choose() {
      let choices = ["Rock", "Paper", "Scissors"];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };
  return Object.assign(playerObj, computerObj);
}

function createHuman() {
  let palyerObj = createPlayer();
  let humanObj = {
    choose() {
      let choices = ["Rock", "Paper", "Scissors"];
      let userInput;
      while (true) {
        console.log(`Choose one of the following moves: ${choices.join(", ")}`);
        userInput = readline.question();
        if (choices.includes(userInput)) break;
        console.log("Wrong choice!");
      }
      this.move = userInput;
    },
  };
  return Object.assign(palyerObj, humanObj);
}
function createPlayer() {
  return {
    // state
    move: null,
  };
}

// next step : Orchestration engine:
// engine object which orchestrate the objects and where the procedural program flow should be.
const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  displayWelComeMessage() {
    console.log("Welcom to Rock, Paper, Scissors Game!");
  },
  displayGoodbyeMessage() {
    console.log("Thanks for playing Rock, Paper, Scissors game, Goodbye!");
  },
  displayWinner() {
    let humanChoice = this.human.move;
    let computerChoice = this.computer.move;

    console.log(`Your choice: ${humanChoice}`);
    console.log(`The computer chose: ${computerChoice}`);

    if (
      (humanChoice === "Paper" && computerChoice === "Rock") ||
      (humanChoice === "Rock" && computerChoice === "Scissors") ||
      (humanChoice === "Scissors" && computerChoice === "Paper")
    ) {
      console.log("You win!");
    } else if (
      (computerChoice === "Paper" && humanChoice === "Rock") ||
      (computerChoice === "Rock" && humanChoice === "Scissors") ||
      (computerChoice === "Scissors" && humanChoice === "Paper")
    ) {
      console.log("Computer win!");
    } else {
      console.log("It Is A Tie!");
    }
  },
  palyAgain() {
    console.log("Would you like to play again? Enter(Yes/No)");
    let answer = readline.question().toLowerCase();
    return answer[0] === "y";
  },
  clear() {
    console.clear();
  },
  play() {
    this.displayWelComeMessage();
    while (true) {
      this.clear();
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.palyAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
