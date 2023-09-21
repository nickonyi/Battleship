import GameBoard from "./gameboard";
import aiLogic from "./aiLogic";

function Player(playerName, playerNumber) {
    let name = typeof playerName == 'string' ? playerName : 'battlebot';
    const number = playerNumber;
    const isAi = typeof playerName == 'string' ? false : true;
    const gameBoard = GameBoard();
    const battlebot = aiLogic();
     
    return {
        name,
        number,
        isAi,
        battlebot,
        gameBoard
    }
}

export default Player;