import shipTypes from "../shipTypes";

let player;
let board;

function drawSetupBoard(setupPlayer, setupBoard) {
    player = setupPlayer;
    board = setupBoard;

    return setupBoard;
}

const setup = {
    drawSetupBoard
}

export default setup;