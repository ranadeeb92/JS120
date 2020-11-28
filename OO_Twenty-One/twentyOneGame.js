const readline = require('readline-sync');
class Card {
  constructor(face, suit) {
    this.face = face;
    this.suit = suit;
  }
  getSuit() {
    return this.suit;
  }
  getFace() {
    return this.face;
  }
}
class Deck {
  static SUITS = ['Hearts', 'Dimonds', 'Clubs', 'Spade'];
  static FACES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
  constructor() {
    this.cards = [];
    for(let suit = 0; suit < Deck.SUITS.length; suit++){
      for(let card = 0; card < Deck.FACES.length; card++) {
        this.cards.push(new Card(Deck.FACES[card], Deck.SUITS[suit]));
      }
    }
  }
  shuffel() {
    for(let num = 0; num <= 1000; num++) {
        let randomIndex = Math.floor(Math.random() * this.cards.length);
        let card = this.cards.splice(randomIndex, 1)[0];
        this.cards.unshift(card);
    }
  }
  // if we want to add more players, we pass array of players and loop over the length
  deal(player, dealer) {
    for(let num = 1; num <= 2; num++){
      player.addCard(this.drawCard());
      dealer.addCard(this.drawCard());
    }
  }
  drawCard() {
    return this.cards.shift();
  }
}
class Participant {
  constructor() {
    this.scores = 0;
    this.status = "";
    this.cards = [];
  } 
  addCard(card) {
    this.cards.push(card);
  }
  getCards(){
    return this.cards;
  }
 
  displyCards(){
    for(let index = 0; index < this.cards.length; index++){
      console.log(this.cards[index].face + ':' + this.cards[index].suit)
    }
    console.log('Total :' + this.getCardsTotal());
  }
  hit(card) {
    this.updateStatus('hit');
    this.addCard(card);
  }
  stay() {
    this.updateStatus('stay');
  }
  isBust(){
    return this.getCardsTotal() > 21;
  }
  bust() {
    this.updateStatus('bust');
  }
  updateStatus(status) {
    this.status = status;
  }
  getStatus() {
    return this.status;
  }
  getCardsTotal(){
    let total = this.cards.reduce((total, card)=> {
      let cardFace = card.getFace();
      if(cardFace >= 2 && cardFace <= 10) {
        total += cardFace;
      }else if(['Queen', 'King', 'Jack'].includes(cardFace)) {
        total += 10;
      }else {  // card face is 'Ace'
        total += 11;
      }
      return total;
    }, 0);
    this.cards.filter(card => card.getFace() === "Ace").forEach(_ => {
      if(total > 21) total -= 10;
    });
    return total;
  }
}
class Player extends Participant {
  // may has a different immplemenattion of hit and stay methods
}
class Dealer extends Participant {
   // may has a different immplemenattion of hit and stay methods
   displyCards(playerTurn = true) {
     if(playerTurn) {
      for(let index = 0; index < this.cards.length - 1; index++){
        console.log(this.cards[index].face + ':' + this.cards[index].suit)
      }
     }else {
      for(let index = 0; index < this.cards.length; index++){
        console.log(this.cards[index].face + ':' + this.cards[index].suit)
      }
      console.log('Total :' + this.getCardsTotal());
     }
   }
}

class TwentyOneGame {
  static PARTICIPANT_NUMBERS = 2; // at least 2
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }
  displayMessage(message) {
    console.log(message);
  }
  dealCards() {
    this.deck.deal(this.player, this.dealer);
  }
  showCrads(playerTurn = true) {
    let num = 1;
    while(num <= TwentyOneGame.PARTICIPANT_NUMBERS - 1){
      this.displayMessage('Player Cards are :');
      this.player.displyCards();
      num++;
    }
    this.displayMessage('Dealer Cards are :');
    this.dealer.displyCards(playerTurn);
  }
  playerTurn(){
    this.displayMessage('Would you like to hit or stay?');
    let choice = readline.question().toLowerCase();
    while(true){
      if(['hit', 'stay'].includes(choice)) break;
      this.displayMessage('Please choose hit or stay');
      choice = readline.question().toLowerCase();
    }
    if(choice === 'hit') {
      let card = this.deck.drawCard();
      this.player.hit(card);
      // check if bust
      if(this.player.isBust()){
        this.player.bust();
      }
    }else{
      this.player.stay();
    }
  }
  dealerTurn() {
    this.dealer.displyCards(false);
    while(this.dealer.getCardsTotal() < 17){
      console.clear();
      let card = this.deck.drawCard();
      this.dealer.hit(card);
      this.dealer.displyCards(false);
    }
    if(this.dealer.isBust()) {
      this.dealer.bust();
    }else{
      this.dealer.stay();
    }
  }
  compareResult() {
    return this.player.getCardsTotal() > this.dealer.getCardsTotal() ? 'Player' : 'Dealer';
  }
  displayResult(result) {
    console.clear();
    this.showCrads(false);
    this.displayMessage(`The winner is ${result}`);
  }
  start() {
    console.clear();
    this.displayMessage('Welcom to Twenty-one game');
    this.deck.shuffel();
    this.dealCards();
    this.showCrads();
    while(true) {
      this.playerTurn();
      console.clear();
      this.player.displyCards();
      if(this.player.getStatus() === 'stay' || this.player.getStatus() === 'bust') break;
    }
    if(this.player.getStatus() === 'stay') {
     this.dealerTurn();
     if(this.dealer.getStatus() === 'bust') {
       this.displayResult('Player');
     }else {
       let result = this.compareResult();
       this.displayResult(result);
     }
    }
    else {
      this.displayResult('Dealer');
    }
    this.displayMessage('The Game is Over, Thank you!');
  }
}

let game = new TwentyOneGame();
game.start();

// let deck = new Deck();
// deck.shuffel();
// let player = new Participant();
// let card = deck.pickCard()
// console.log(card);
// deck.removeCard(card);
// player.hit(card);

// card = deck.pickCard()
// console.log(card);
// deck.removeCard(card);
// player.hit(card);

// card = deck.pickCard()
// console.log(card);
// deck.removeCard(card);
// player.hit(card);

// console.log(player.getCardsTotal());



