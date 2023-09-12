import shipTypes from "../shipTypes";

let player;
let board;

function drawSetupBoard(setupPlayer, setupBoard) {
    player = setupPlayer;
    board = setupBoard;

    return setupBoard;
}

function drawSetupShips() {
    const setupShipsContainer = document.createElement('div');
    setupShipsContainer.classList.add('setup-ships-container');
    const setupShipsHeader = document.createElement('div');
    setupShipsHeader.classList.add('setup-ships-header');
    const setupShipsTitle = document.createElement('h3');
    setupShipsTitle.textContent = 'Place your ships';
    const setupShipsInfo = document.createElement('p');
    setupShipsInfo.textContent = 'Double click to rotate(once placed)';
    const setupShipsOptions = document.createElement('div');
    setupShipsOptions.classList.add('setup-ships-options');
    const startGameBtn = document.createElement('button');
    startGameBtn.classList.add('setup-button-start');
    startGameBtn.textContent = 'Start Game';
    const randomShips = document.createElement('button');
    randomShips.classList.add('setup-button-random');
    randomShips.textContent = 'Randomize';
    //randomShips.addEventListener('click', randomizeShips);
    setupShipsOptions.append(startGameBtn, randomShips);
    const shipList = document.createElement('div');


    setupShipsHeader.append(setupShipsTitle, setupShipsInfo);
    setupShipsContainer.append(setupShipsHeader, shipList, setupShipsOptions);

    return setupShipsContainer;
}

const setup = {
    drawSetupBoard,
    drawSetupShips
}

export default setup;