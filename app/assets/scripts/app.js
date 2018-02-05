/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;
let dice = Math.floor(Math.random() * 6) + 1; //generate random number between 1 and 6 for the dice


// setting up the game
document.querySelector('.dice').style.display = 'none'; 
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.querySelector('.btn-roll').addEventListener('click', function() {
	//generate random number between 1 and 6 for the dice
	let dice = Math.floor(Math.random() * 6) + 1;
	
	//display the result
	let diceDOM = document.querySelector('.dice')
	diceDOM.style.display  = 'block';
	diceDOM.src = 'assets/images/dice-' + dice + '.png';

	//update round score IF the number wasn't 1
	if (dice !== 1) {
		//add score and display in current score section
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else {
		//force end turn
		nextPlayer();
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	//add current score to global score
	scores[activePlayer] += roundScore;
	//update the UI
	document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
	//check if player won the game 
	if (scores[activePlayer] >= 20) {
		//end the game
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	} else {
		//force end turn
		nextPlayer();	
	}
	
});






function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //switch between players when a player rolls a 1
		roundScore = 0;
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
}





