/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

CHALLENGE RULES-----
1. A player looses his ENTIRE score when he rolls two 6's in a row. After  that, it's the next player's turn. (Hint: Always save the previous diceroll in a separate variable). --COMPLETED

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: You can read that value with the .value property in JS). --COMPLETED

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: You will need CSS to position the second dice, so take a look at the CSS code for the first one.)

*/

let scores;
let roundScore;
let activePlayer;
let dice;
let previousRoll;
let gamePlaying = true;
let winningScore = 100;

 //initialize game
 init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		//generate random number between 1 and 6 for the dice
		let previousRoll = dice;   //capture previous roll data
		dice = Math.floor((Math.random() * 6) + 1);  
	
		//display the result
		let diceDOM = document.querySelector('.dice')
		diceDOM.style.display  = 'block';
		diceDOM.src = 'assets/images/dice-' + dice + '.png';

		//if two 6's in a row end turn
		if (previousRoll === 6 && dice === 6) {
			//force end turn
			nextPlayer();

		//update round score IF the number wasn't 1
		} else if (dice !== 1) {
			//add score and display in current score section
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			//force end turn
			nextPlayer();
		}
	} 
	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		//add current score to global score
		scores[activePlayer] += roundScore;
		//update the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
		//check if player won the game 
		if (scores[activePlayer] >= winningScore) {
			//end the gamePlaying
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//force end turn
			nextPlayer();	
		}	
	}	
});



//reset game with 'new game button'
document.querySelector('.btn-new').addEventListener('click', init);



//change winning score value from player input
document.querySelector('.score-limit__btn').addEventListener('click', function() {
  winningScore = parseInt(document.querySelector('.score-limit__input').value);

  //error message if user inputs anything other than a number
  document.querySelector('.score-limit__error').classList.remove('score-limit__error--active');
  if (isNaN(winningScore)) {
    document.querySelector('.score-limit__error').classList.add('score-limit__error--active');
  } else {
    //restart game with new winning score
    init();
  }
});


/////////////////////////////////FUNCTIONS//////////////////////////////////////

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	dice = undefined;

	//resetting UI
	document.querySelector('.dice').style.display = 'none'; 
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //switch between players when a player rolls a 1
		roundScore = 0;
		dice = undefined;
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
}




