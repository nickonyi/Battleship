import Game from "../game";
import createHeaderBox from "./header";
import createFooterBox from "./footer";
import setup from "./placeShips";
import shipTypes from "../shipTypes";

const app = document.createElement('div');
let gameReset = false;
app.id = "app";
document.body.appendChild(app);

const header = createHeaderBox();
const footer = createFooterBox();

const gameContainer = document.createElement('div');
gameContainer.id = 'game-container';
gameContainer.classList.add('game-container', 'active');
const showPlayContainer = document.createElement('div');
showPlayContainer.classList.add('how-to-play');


app.appendChild(header)
app.appendChild(gameContainer);
app.appendChild(showPlayContainer);
app.appendChild(footer);

function initializeGame() {
    let homeActive = true;
    let howToplayActive = false;


    const playBtn = document.querySelector('.play-button');
    playBtn.addEventListener('click', () => {
        if (howToplayActive) return;
        howToplayActive = true;
        homeActive = false;
        renderHowToPlay();
    });

    const newGameBtn = document.querySelector('.new-game-button');
    newGameBtn.addEventListener('click', () => {

        if (gameReset) {
            newGame();
        }
        if (homeActive) return;
        homeActive = true;
        howToplayActive = false;
        renderHome();

    });
}

initializeGame();

const game = Game();
newGame();

function startGame(player1, player2) {
    game.newGame(player1, player2);
    drawGame();
}

function newGame() {
    showGameContainer();
    const newPlayer1 = game.createPlayer('Nick_da_destroyer', 1);
    const newPlayer2 = game.createPlayer(false, 2);
    newPlayer2.gameBoard.placeAllShipsRandomly();
    drawSetup(newPlayer1);
    drawPlayBoard();

    const startGameBtn = document.querySelector('.setup-button-start');
    startGameBtn.addEventListener('click', function(event) {
        if (newPlayer1.gameBoard.placedShips.length == 5) {
            startGame(newPlayer1, newPlayer2);
            gameReset = true;
        }
    });
}

// creates a delay to be used in an async function
function delay(delayInMs) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, delayInMs);
    });
}


function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function drawPlayBoard() {
    clearContainer(showPlayContainer);
    const howToPlayContainer = document.createElement('div');
    howToPlayContainer.classList.add('how-to-playboard-container');

    const howToPlayHeader = document.createElement('h1');
    howToPlayHeader.classList.add('how-to-playboard-header');
    howToPlayHeader.textContent = "How to play battleship";

    const howToPlayDivContainer = document.createElement('div');
    howToPlayDivContainer.classList.add('how-to-play-div-container');

    const howToPlayDiv1 = document.createElement('div');
    howToPlayDiv1.classList.add('how-to-play-div-one');
    const howToPlayDiv1Header = document.createElement('h3');
    howToPlayDiv1Header.classList.add('how-to-play-div1-header');
    howToPlayDiv1Header.textContent = "Rules";
    const howToPlayDiv1Text1 = document.createElement('p');
    howToPlayDiv1Text1.classList.add('how-to-play-div1-text');
    howToPlayDiv1Text1.textContent = "The objective of Battleship is to try and sink all of the opponent's ships before they sink all of yours. Players take turns firing shots to attempt to hit the enemy ships";
    const howToPlayDiv1Text2 = document.createElement('p');
    howToPlayDiv1Text2.classList.add('how-to-play-div1-text');
    howToPlayDiv1Text2.textContent = "Both players can not see the fleet of the other, you have to guess where is the ideal position to shoot at!";
    const howToPlayDiv1Text3 = document.createElement('p');
    howToPlayDiv1Text3.classList.add('how-to-play-div1-text');
    howToPlayDiv1Text3.textContent = "When a player hits a tile that holds a ship, they can replay until they miss a shot.";
    const howToPlayDiv1Text4 = document.createElement('p');
    howToPlayDiv1Text4.classList.add('how-to-play-div1-text');
    howToPlayDiv1Text4.textContent = "First player to sink all the opponent's ships wins the game!";

    howToPlayDiv1.append(howToPlayDiv1Header, howToPlayDiv1Text1, howToPlayDiv1Text2, howToPlayDiv1Text3, howToPlayDiv1Text4);

    const howToPlayDiv2 = document.createElement('div');
    howToPlayDiv2.classList.add('how-to-play-div-two');
    const howToPlayDiv2Header = document.createElement('h3');
    howToPlayDiv2Header.classList.add('how-to-play-div2-header');
    howToPlayDiv2Header.textContent = "Controls";
    const howToPlayDiv2Text1 = document.createElement('p');
    howToPlayDiv2Text1.classList.add('how-to-play-div2-ul');
    howToPlayDiv2Text1.textContent = "Before starting, you need to place all your ships on the board. To do that, you can:";
    const howToPlayDiv2Ul = document.createElement('ul');
    const howToPlayDiv2Li1 = document.createElement('li');
    howToPlayDiv2Li1.textContent = "Drag and drop the ships on the board (doube click to rotate the ship)";
    const howToPlayDiv2Li2 = document.createElement('li');
    howToPlayDiv2Li2.textContent = "Press random to place your ships randomly";
    const howToPlayDiv2Text2 = document.createElement('p');
    howToPlayDiv2Text2.classList.add('how-to-play-div1-text');
    howToPlayDiv2Text2.textContent = "Once that is done, press start and try to defeat the AI!";


    howToPlayDiv2Ul.append(howToPlayDiv2Li1, howToPlayDiv2Li2);
    howToPlayDiv2.append(howToPlayDiv2Header, howToPlayDiv2Text1, howToPlayDiv2Ul, howToPlayDiv2Text2);

    howToPlayDivContainer.append(howToPlayDiv1, howToPlayDiv2);
    howToPlayContainer.append(howToPlayHeader, howToPlayDivContainer);
    showPlayContainer.appendChild(howToPlayContainer);
}

function drawGame() {
    clearContainer(gameContainer);
    const player1BoardContainer = drawBoardContainer(game.player1);
    const player2BoardContainer = drawBoardContainer(game.player2);
    populateBoard(game.player1, player1BoardContainer.querySelector('.board'));
    gameContainer.append(player1BoardContainer, player2BoardContainer);
}

function drawSetup(player) {
    clearContainer(gameContainer);
    const setupBoard = setup.drawSetupBoard(player, drawBoardContainer(player));
    const setupShips = setup.drawSetupShips();
    gameContainer.append(setupBoard, setupShips);
}

function drawBoardContainer(player) {
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board-container');
    const playerName = document.createElement('h3');
    if (player.isAi) {
        playerName.textContent = `${player.name}'s fleet`;
    } else {
        playerName.textContent = `Your fleet`;
    }
    const playerBoard = drawBoard(player);

    boardContainer.append(playerName, playerBoard);
    return boardContainer;
}

function drawBoard(player) {
    const board = document.createElement('div');
    board.classList.add('board');
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.player = player ? player.number : 0;
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);

            if (player && player.isAi) cell.addEventListener('click', listenForAttack, false);
        }

    }
    return board;
}



function listenForAttack(event) {
    const cell = event.target;
    const defendingPlayerNumber = cell.dataset.player;
    const attackingPlayerNumber = defendingPlayerNumber == "1" ? "2" : "1";
    const attackingPlayer = game[`player${attackingPlayerNumber}`];
    const defendingPlayer = game[`player${defendingPlayerNumber}`];

    if (game.currentPlayer !== attackingPlayer) return;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    const [result, location, ship] = attackingPlayer.attack(defendingPlayer, row, col);
    styleAttackedCell(cell, defendingPlayerNumber, result, ship);
    nextTurn();
}

//style the attacked cell based on a hit or a miss
//if the whole ship is sunked,style each of the ship's cell with the .cell-sunk class
function styleAttackedCell(cell, defendingPlayerNumber, result, ship) {
    if (result == 'hit') {
        cell.classList.add('cell-hit');
        if (ship.isSunk()) {
            ship.squares.forEach(square => {
                const cell = document.querySelector(`[data-player='${defendingPlayerNumber}'][data-row='${square[0]}'][data-col='${square[1]}']`);
                cell.classList.add('cell-sunk');
            });
        }
    }
    if (result == 'miss') {
        cell.classList.add('cell-miss');
    }

}

//call an attack for the AI
function callAIAttack(ai) {
    if (ai !== game.currentPlayer) return;
    const defendingPlayerNumber = game.defendingPlayer === game.player1 ? "1" : "2";
    const [result, location, ship] = ai.attack(game.defendingPlayer);
    const cell = document.querySelector(`[data-player='${defendingPlayerNumber}'][data-row='${location[0]}'][data-col='${location[1]}']`);
    styleAttackedCell(cell, defendingPlayerNumber, result, ship);
    nextTurn();
}

function nextTurn() {
    const winner = game.checkGameOver();
    if (winner) {
        return endGame(winner);
    }

    game.changeTurn();

    if (game.currentPlayer.isAi) {
        callAIAttack(game.currentPlayer);
    }
}

function endGame(winner) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', listenForAttack));
    console.log(drawVictoryContainer(winner));
    gameContainer.appendChild(drawVictoryContainer(winner));
}

//pop up victory container
function drawVictoryContainer(winner) {
    const loser = game.checkGameOver() === game.player1 ? game.player2 : game.player1;
    const victoryContainer = document.createElement('div');
    victoryContainer.classList.add('victory-container');
    const victoryTitle = document.createElement('h2');
    const winnerText = document.createElement('p');
    const loserText = document.createElement('p');
    if (winner.isAi) {
        victoryTitle.classList.add('victory-defeat');
        victoryTitle.textContent = "TOTAL ANNILATION!";
        winnerText.textContent = `${winner.name} has claimed domination`;
        loserText.textContent = 'Your fleet is sunk!';
    } else {
        victoryTitle.classList.add('victory-victory');
        victoryTitle.textContent = 'TOTAL VICTORY';
        winnerText.textContent = `You have claimed domination!`;
        loserText.textContent = `${loser.name}'s fleet is sunk.`
    }
    victoryContainer.append(victoryTitle, winnerText, loserText);

    return victoryContainer;
}

//Draw the ships on the player's onscreen board so they can see their fleet
function populateBoard(player, board) {
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const square = player.gameBoard.board[row][col];
            const cell = board.querySelector(`[data-row='${row}'][data-col='${col}']`);
            if (square !== null && typeof square === 'object') {
                cell.classList.add('cell-ship');
            } else {
                cell.classList.remove('cell-ship');
            }
        }

    }
}

function showGameContainer() {
    gameContainer.style.display = 'flex';
    showPlayContainer.style.display = 'none';
}

function showPlayContainerBoard() {
    gameContainer.style.display = 'none';
    showPlayContainer.style.display = 'flex';
}

function toggleActive() {
    //gameContainer.classList.toggle('active');
    showPlayContainer.classList.toggle('active');
}

//render home screen 
async function renderHome() {
    const home = document.querySelector("#game-container");
    const howToPlay = document.querySelector(".how-to-play");
    howToPlay.classList.toggle("active");
    await delay(140);

    howToPlay.style.display = "none";
    home.style.display = "flex";
    await delay(140);

    home.classList.toggle("active");

    window.location.href = "#New-game";
}

//renders how to play screen
async function renderHowToPlay() {
    const home = document.querySelector('#game-container');
    const howToPlay = document.querySelector('.how-to-play');
    home.classList.toggle('active');
    await delay(140);
    home.style.display = 'none';
    howToPlay.style.display = 'flex';
    await delay(140);
    howToPlay.classList.toggle("active");

    window.location.href = "#how-to-play";
}