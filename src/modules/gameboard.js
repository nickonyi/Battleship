import Ship from './ship';
import shipTypes from './shipTypes';


function GameBoard() {
    const board = createEmptyGameBoard();

    function createEmptyGameBoard() {
        let gameBoardArray = [];
        for (let row = 0; row <= 9; row++) {
            let rowArray = [];
            for (let col = 0; col <= 9; col++) {
                rowArray[col] = null;
            }
            gameBoardArray[row] = rowArray;
        }
        return gameBoardArray;
    }
    return {
        board
    }
}

export default GameBoard;