import Ship from './ship';
import shipTypes from './shipTypes';


function GameBoard() {
    const board = createEmptyGameBoard();
    const placedShips = [];

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

    function checkSquare(row, col) {
        if (row < 0 || col < 0) return undefined;
        if (row > 9 || col > 9) return undefined;
        else return board[row][col];
    }

    //check weather is valid to place a ship of a given length on a gameboard at a specified origin with a specifed alignmnent 
    function checkValidPlacement(shipLength, origin, alignment) {
    
         //1. create an array to store the coordinates of squares where the ship will be placed
         let shipSquares = [];
         //2. Destructure the origin array into row and col variables
         let [row, col] = origin;
         //3. Use a for loop to iterate the whole ship length to calculate the cordinates of the squares the ship
         //will ocuppy based on the alignment
         for (let i = 0; i < shipLength; i++) {
             //4. for each iterations add the [row,col] coordinates to the ship square array 
             shipSquares.push([row, col]);
             //and increment either the row or col based on the allignment
             if (alignment === 'horizontal') {
                 col++;
             } else {
                 row++;
             }
         }

        //5. After determining the squares the ship will occupy check the validity of the placement
     const validPlacement = shipSquares.every(square => {
         //check if every square the ship occupies is within the board boundaries
         if (this.checkSquare === undefined) {
             return false;
         }
         //check if the cell has been occupied by another ship
         return this.board[row][col] === null;
     });

        return {
            isValid: validPlacement,
            squares: shipSquares
        }
    }

    function removeShip(origin) {
        const [row, col] = origin;
        const ship = this.checkSquare(row, col);
        ship.squares.forEach(square => {
            const [row, col] = square;
            this.board[row][col] = null;
        });
        const placedShipIndex = this.placedShips.indexOf(ship);
        this.placedShips.splice(placedShipIndex, 1);
    }




    return {
        board,
        removeShip,
        checkValidPlacement,
        checkSquare
    }
}

export default GameBoard;