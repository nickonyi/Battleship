import shipTypes from "../shipTypes";

let player;
let board;

// This object holds the data for the drag methods to use
// These properties are updated as the user drags and drops ships
const dragData = {
    shipObject: null,
    shipElement: null,
    offsetX: null,
    offsetY: null,
    rowDif: 0,
    colDif: 0,
    shipHomeContainer: null,
    previousContainer: null,
    previousCell: null,
    currentCell: null,
}

function drawSetupBoard(setupPlayer, setupBoard) {
    player = setupPlayer;
    board = setupBoard;
    const setUpCells = board.querySelectorAll('.cell');

    setUpCells.forEach(cell => {
        cell.addEventListener('dragenter', dragEnter);
    });
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
    shipList.classList.add('setup-ship-list');
    for (const ship in shipTypes) {
        shipList.append(drawShip(shipTypes[ship]));
    }

    setupShipsHeader.append(setupShipsTitle, setupShipsInfo);
    setupShipsContainer.append(setupShipsHeader, shipList, setupShipsOptions);

    return setupShipsContainer;
}

function drawShip(ship) {
    const shipContainer = document.createElement('div');
    shipContainer.classList.add('setup-ship');
    shipContainer.id = `${ship.name}-home`;
    const shipBox = document.createElement('div');
    shipBox.id = ship.name;
    shipBox.dataset.length = ship.length;
    shipBox.classList.add('setup-ship-box');
    for (let i = 0; i < ship.length; i++) {
        const shipCell = document.createElement('div');
        shipCell.classList.add('setup-ship-cell');
        shipBox.append(shipCell);
    }
    shipBox.draggable = true;
    shipBox.dataset.alignment = 'horizontal';
    shipBox.addEventListener('dragstart', dragStart);
    shipBox.addEventListener('dragend', dragEnd);

    const shipName = document.createElement('p');
    if (ship.name === 'patrol') {
        shipName.textContent = 'Patrol Boat';
    } else {
        shipName.textContent = ship.name;
    }
    shipContainer.append(shipName, shipBox);
    return shipContainer;
}

//This function handles the drag event when a user interacts with a particular ship element and enters a game cell into the board
function dragEnter(event, touchCell) {
    //1.clean up- removes any visual effects from with the previous drag operation
    dragLeave(event);
    //2.Prevent default behaviour of the drag operation
    event.preventDefault();
    //3.Extract data from the currently draagged ship and store it in the type variable
    const type = dragData.shipElement.id;
    let row;
    let col;
    //4.Depending on weather the current event is touch move or not we calculate the row and col values
    //adjusting the difference between the origanl touch point and the cell origin
    if (event.type === "touchmove") {
        row = parseInt(touchCell.dataset.row) - parseInt(dragData.rowDif);
        col = parseInt(touchCell.dataset.col) - parseInt(dragData.colDif);
    } else {
        row = parseInt(event.target.dataset.row) - parseInt(dragData.rowDif);
        col = parseInt(event.target.dataset.col) - parseInt(dragData.colDif);
    }

    //5. check weather is valid to place the ship in the given position on the board
    const shipSquares = player.gameboard.checkValidPlacement(shipTypes[type].length, [row, col], dragData.shipElement.dataset.alignment);
    //console.log(shipSquares);
    //6.filter invalid squares
    //shipSquares.squares = shipSquares.squares.filter(square => {
    //    return player.gameBoard.checkSquare(square[0], square[1] != undefined);
    //});
    ////7.For each valid square create a visual overlay
    //shipSquares.square.forEach(square => {
    //    const cell = board.querySelector(`[data-row='${square[0]}'][data-col='${square[1]}']`);
    //    const cellOverLay = document.createElement('div');
    //    cellOverLay.classList.add('cell', 'cell-drag-over');
    //    cell.appendChild(cellOverLay);
    //
    //    if (shipSquares.isValid) {
    //        cellOverLay.classList.add('cell-drag-valid');
    //    } else {
    //        cellOverLay.classList.add('cell-drag-invalid');
    //    }
    //});
}

function dragLeave(event) {
    const leftCells = document.querySelectorAll('.cell-drag-over');
    leftCells.forEach(cell => {
        cell.remove();
    });
}

// When the user starts dragging a ship, we store its information in dragData
function dragStart(event) {

    if (event.type === "touchstart") {
        dragData.shipElement = event.target.parentElement;
        dragData.shipHomeContainer = document.querySelector(`#${event.target.parentElement.id}-home`);
        dragData.previousContainer = event.target.parentElement.parentElement;
    } else {
        dragData.shipElement = event.target;
        dragData.shipHomeContainer = document.querySelector(`#${event.target.id}-home`);
        dragData.previousContainer = event.target.parentElement;
    }
    updateCellDiff(event);

    if (dragData.shipElement.dataset.alignment === 'vertical') dragData.shipElement.classList.add('setup-ship-vertical');
    // On dragStart, we store the ship back in its home container & style it to be a 'ghost'
    // Use a setTimeout to ensure this happens only after the ship has been picked up
    setTimeout(() => {
        dragData.shipElement.classList.add('setup-ship-hide');
        dragData.shipElement.classList.remove('setup-ship-dropped');
        dragData.shipElement.classList.remove('setup-ship-vertical');
        dragData.shipHomeContainer.append(dragData.shipElement);
    }, 0);
    // If the ship is already placed (i.e., it's parent is a cell), we remove the ship from the player's gameboard
    if (dragData.previousContainer.classList.contains('cell')) {
        const cell = dragData.previousContainer;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        player.gameBoard.removeShip([row, col]);
    }
}

function dragEnd(event) {
    dragData.shipElement.classList.remove('setup-ship-hide');
}
// When a user grabs a ship element, we track the user's cursor location for the dragEnter and drop events
// When the ship is grabbed from the center, the cursor does not match up with the ship's origin cell
// The cellDif difference between the origin cell to the cell where the user has grabbed the ship element
// i.e., if a ship of length 5 is grabbed from the 4th cell, the cellDif will be 3
function updateCellDiff(event) {
    let x;
    let y;
    if (event.type === 'touchstart') {
        let bcr = event.target.parentElement.getBoundingClientRect();
        x = event.targetTouches[0].clientX - bcr.x;
        y = event.targetTouches[0].clientY - bcr.y;
        dragData.offsetX = x;
        dragData.offsetY = y;
    } else {
        x = event.offsetX;
        y = event.offsetY;
    };

    const cellSize = document.querySelector('.setup-ship-cell').offsetWidth;
    if (dragData.shipElement.dataset.alignment === 'horizontal') {
        dragData.rowDif = 0;
        dragData.colDif = Math.floor(x / (cellSize + 2));
    } else {
        dragData.rowDif = Math.floor(y / (cellSize + 2));
        dragData.colDif = 0;
    }
}
const setup = {
    drawSetupBoard,
    drawSetupShips
}

export default setup;