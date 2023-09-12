import GameBoard from "./gameboard";

function Player(playerName, playerNumber) {
    let name = typeof playerName == 'string' ? playerName : 'battlebot';
    const number = playerNumber;
    const isAi = typeof playerName == 'string' ? false : true;
    const gameBoard = GameBoard();

    return {
        name,
        number,
        isAi,
        gameBoard
    }
}

export default Player;