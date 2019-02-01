
let cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K'];
let cardFlipValues = [];
let cardIDs = [];
let cardsFlipped = 0;

//If currentPlayer is an odd numnber = redPlayer, even number = bluePlayer
let currentPlayer = 0;

//SCORE HANDLING//
let bluePlayer = {
  player: 'Blue Player',
  currentMatches: 0,
  gamesWon: 0
}
let redPlayer = {
  player: 'Red Payer',
  currentMatches: 0,
  gamesWon: 0
}

function bluePlayerMatch() {
  bluePlayer.currentMatches += 1;
  document.getElementById('blue_score')
    .innerHTML = bluePlayer.currentMatches;


}

function redPlayerMatch() {
  redPlayer.currentMatches += 1;
  document.getElementById('red_score').innerHTML = redPlayer.currentMatches;

}

function resetScores() {
  //blue player
  bluePlayer.gamesWon = 0;
  bluePlayer.currentMatches = 0;
  document.getElementById('blue_score').innerHTML = 0;
  document.getElementById('blue_gamesWon').innerHTML = 0;
  //red player
  redPlayer.gamesWon = 0;
  redPlayer.currentMatche = 0;
  document.getElementById('red_score').innerHTML = 0;
  document.getElementById('red_gamesWon').innerHTML = 0;

}

function playerDisplay(currentPlayer) {
  if (currentPlayer % 2 == 0) {
    document.getElementById('playerDisplay').innerHTML = "Red Player's Turn"
  }
  else {
    document.getElementById('playerDisplay').innerHTML = "Blue Player's Turn"
  }
}

// Shuffle cardValues array  Durstenfeld shuffle
function shuffleCards() {
  for (let i = cardValues.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = cardValues[i];
    cardValues[i] = cardValues[j];
    cardValues[j] = temp;
  }
  console.log(cardValues)
}

// newBoard
function newBoard() {
  cardFlipValues = [];
  cardsFlipped = 0;
  let cards = ''
  shuffleCards();
  //Red Player goes first each game
  currentPlayer = 0;
  //Current matches for each player is reset to zero
  bluePlayer.currentMatches = 0;
  redPlayer.currentMatches = 0;
  for (let i = 0; i < cardValues.length; i++) {
    cards += '<div id="card_' + i + '"' + ' value="' + cardValues[i] + '" onclick="flipCard(this,\'' + cardValues[i] + '\')"></div>';;
  }
  document.getElementById('gameBoard').innerHTML = cards;
}


//Flip Card Function//
function flipCard(card, value) {
  //making sure no more than 2 cards flipped//
  if (card.innerHTML == "" && cardFlipValues.length < 2) {
    card.style.background = 'white'
    card.innerHTML = value;
    //if no cards have been flipped
    if (cardFlipValues.length == 0) {
      cardFlipValues.push(value);
      cardIDs.push(card.id);

    } else if (cardFlipValues.length == 1) {

      cardFlipValues.push(value);
      cardIDs.push(card.id);

      if (cardFlipValues[0] == cardFlipValues[1]) {
        cardsFlipped += 2;
        //switching players
        currentPlayer += 1;
        playerDisplay(currentPlayer);
        //updates current matches for each player
        if (currentPlayer % 2 == 0) {
          bluePlayerMatch()
        } else {
          console.log('redplayer')
          redPlayerMatch()
        }
        //emptying array//
        cardFlipValues = [];
        cardIDs = [];
        //checking to see if all tiles have been matched and flipped
        if (cardsFlipped == cardValues.length) {
          if (bluePlayer.currentMatches > redPlayer.currentMatches) {
            alert('Blue Player Wins')
            bluePlayer.gamesWon += 1;
            document.getElementById('blue_gamesWon').innerHTML = bluePlayer.gamesWon;
            //reset current match score
            document.getElementById('blue_score').innerHTML = 0;
            document.getElementById('red_score').innerHTML = 0;
          } else {
            alert('Red Player Wins')
            redPlayer.gamesWon += 1;
            document.getElementById('red_gamesWon').innerHTML = redPlayer.gamesWon;
            //reset current match score
            document.getElementById('blue_score').innerHTML = 0;
            document.getElementById('red_score').innerHTML = 0;

          }
          //clear board//
          document.getElementById('gameBoard').innerHTML = ""
          newBoard();
        }
        //If there is no match cover cards and switch players
      } else {
        function coverCards() {
          currentPlayer += 1;
          console.log('Current Player number: ' + currentPlayer)
          playerDisplay(currentPlayer);

          var tile_1 = document.getElementById(cardIDs[0])
          var tile_2 = document.getElementById(cardIDs[1])


          tile_1.style.background = 'url("style/card.jpg") no-repeat';
          tile_1.style.backgroundSize = "90px";

          tile_1.innerHTML = "";

          tile_2.style.background = 'url("style/card.jpg") no-repeat';
          tile_2.style.backgroundSize = "90px";
          tile_2.innerHTML = "";

          cardFlipValues = [];
          cardIDs = [];


        }
        setTimeout(coverCards, 700)
      }
    }
  }

}