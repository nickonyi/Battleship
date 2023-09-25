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

    function clearBoard(board) {
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                board[row][col] = null;
            }
        }
    }

    function clearFleet(fleet) {
        while (fleet.length > 0) {
            fleet.pop();
        }
    }

    function checkSquare(row, col) {
        if (row < 0 || col < 0) return undefined;
        if (row > 9 || col > 9) return undefined;
        else return this.board[row][col];
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
            const [row, col] = square;
            if (this.checkSquare(row, col) === undefined) {
                return false;
            }
            //check if the cell has been occupied by another ship
            if (this.board[row][col] === null) {
                return true;
            }
        });

        return {
            isValid: validPlacement,
            squares: shipSquares
        }
    }


    function placeShip(shipType, origin, alignment) {
        const shipLength = shipTypes[shipType].length;
        const shipSquares = this.checkValidPlacement(shipLength, origin, alignment);

        if (shipSquares.isValid) {

            const ship = Ship(shipType);
            ship.squares = shipSquares.squares
            ship.alignment = alignment;


            shipSquares.squares.forEach(square => {
                let [row, col] = square;
                this.board[row][col] = ship;
            });

            placedShips.push(ship);
            return ship;
        } else {
            return "Cannot place ship in that area";
        }
    }

    function removeShip(origin) {
        const [row, col] = origin;
        const ship = this.checkSquare(row, col);
        ship.squares.forEach(square => {
            const [row, col] = square;
            this.board[row][col] = null;
        });

        const placedShipIndex = placedShips.indexOf(ship);
        placedShips.splice(placedShipIndex, 1);
    }

    function placeAllShipsRandomly() {
        clearBoard(this.board);
        clearFleet(placedShips);
        for (const ship in shipTypes) {

            let result = this.placeShipRandomly(ship);

            while (typeof result !== 'object' || result == null) {
                result = this.placeAllShipsRandomly(ship);
            }
        }
    }

    //take a ship and determine  a random origin and alignment
    //keep placing ships until a valid location is found
    function placeShipRandomly(shipType) {
        const shipLength = shipTypes[shipType].length;

        function getRandomAlignment() {
            return Math.random() < 0.5 ? 'horizontal' : 'vertical';
        }

        function getRandomOrigin(alignment) {
            let rowDif = 0;
            let colDif = 0;

            if (alignment === "vertical") {
                rowDif = shipLength - 1;
            } else {
                colDif = shipLength - 1;
            }

            let row = Math.floor(Math.random() * (10 - rowDif));
            let col = Math.floor(Math.random() * (10 - colDif));

            return [row, col];
        }

        let alignment = getRandomAlignment();
        let origin = getRandomOrigin();
        let shipSquares = this.checkValidPlacement(shipLength, origin, alignment);

        while (!shipSquares.isValid) {
            alignment = getRandomAlignment();
            origin = getRandomOrigin();
            shipSquares = this.checkValidPlacement(shipLength, origin, alignment);
        }
        return this.placeShip(shipType, origin, alignment);
    }


    function receiveAttack(row, col) {
        if (this.checkSquare(row, col) === undefined) {
            return 'Invalid location';
        }
        const attackedShip = this.board[row][col];
        if (attackedShip === null) {
            this.board[row][col] = 'miss';
        } else {
            attackedShip.hit();
            this.board[row][col] = 'hit';
        }
        return [this.board[row][col],
            [row, col], attackedShip
        ];
    }


    return {
        board,
        removeShip,
        checkValidPlacement,
        checkSquare,
        placedShips,
        placeShip,
        placeAllShipsRandomly,
        placeShipRandomly,
        receiveAttack
    }
}

export default GameBoard;