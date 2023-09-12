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


function newGame() {
    const player1 = game.createPlayer('Player 1', 1);
    const player2 = game.createPlayer(false, 2);
    drawSetup(player1);
    //const dev = drawBoardContainer(player1);
    //gameContainer.appendChild(dev);
}

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function drawSetup(player) {
    clearContainer(gameContainer);
    const setupBoard = setup.drawSetupBoard(player, drawBoardContainer(player));
    gameContainer.appendChild(setupBoard);
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
    console.log(playerBoard);
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