import Game from "../game";
import createHeaderBox from "./header";
import createFooterBox from "./footer";
import setup from "./placeShips";
import shipTypes from "../shipTypes";

const app = document.createElement('div');
app.id = "app";
document.body.appendChild(app);

const header = createHeaderBox();
const footer = createFooterBox();

const gameContainer = document.createElement('div');
gameContainer.id = 'game-container';


app.appendChild(header)
app.appendChild(gameContainer);
app.appendChild(footer);

const newGameBtn = document.querySelector('.new-game-button');
newGameBtn.addEventListener('click', newGame);

const game = Game();
newGame();

function startGame(player1, player2) {
    game.newGame(player1, player2);
    drawGame();
}

function newGame() {
    const newPlayer1 = game.createPlayer('Nick_da_destroyer', 1);
    const newPlayer2 = game.createPlayer(false, 2);
    newPlayer2.gameBoard.placeAllShipsRandomly();
    drawSetup(newPlayer1);
    const startGameBtn = document.querySelector('.setup-button-start');
    startGameBtn.addEventListener('click', function(event) {
        if (newPlayer1.gameBoard.placedShips.length == 5) {
            startGame(newPlayer1, newPlayer2);
        }
    });
}

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function drawGame() {
    clearContainer(gameContainer);
    const player1BoardContainer = drawBoardContainer(game.player1);
    const player2BoardContainer = drawBoardContainer(game.player2);
    populateBoard(game.player1, player1BoardContainer.querySelector('.board'));
    populateBoard(game.player2, player2BoardContainer.querySelector('.board'));
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
    const defendigPlayerNumber = cell.dataset.player;
    const attackingPlayerNumber = defendigPlayerNumber == "1" ? "2" : "1";
    const attackingPlayer = game[`player${attackingPlayerNumber}`];
    const defendingPlayer = game[`player${defendigPlayerNumber}`];

    if (game.currentPlayer !== attackingPlayer) return;
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    attackingPlayer.attack(defendingPlayer, row, col);

    //const [result, location, ship] = attackingPlayer.attack(defendigPlayer, row, col);
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