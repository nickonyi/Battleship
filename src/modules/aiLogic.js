function aiLogic() {
    //create a 2D array of available attack coordinates
    const availableAttacks = createAttackArray();
    let lastShip;
    //store an array containing all the recent attacks inorder
    //When a ship is sunk remove all its cell from the array
    //so we we have an array of recent hits of ships which have not yet been sunk
    const lastHitArray = [];
    const possibleDirections = ['up', 'down', 'left', 'right'];
    let concurrentMisses = 0;

    function attack(enemy) {
        if (this.lastHitArray.length > 0) {
            this.checkIfShipIsSunk(enemy, this.lastHitArray[lastHitArray.length - 1]);
        }

        if (this.availableAttacks.length === 0) return 'No squares to attack';

        //if the last hit ship has been sunk or nothing has been hit yet, get a random cell
        //If the bot has missed more than three times in a row, give it a 50% chance to cheat
        if (lastHitArray.length === 0) {
            if (this.concurrentMisses > 5 && Math.random() > .8) {
                for (let row = 0; row < 10; row++) {
                    for (let col = 0; col < 10; col++) {
                        const cell = enemy.gameBoard.checkSquare(row, col);
                        if (typeof cell === "object" && cell != null) {
                            console.log('cheating');
                            return [row, col];
                        }
                    }
                }
            }
            let attackCoordinates = this.getRandomCell(enemy);
            return attackCoordinates;
        }
        // Else, we find the next cell adjacent to the lastHit
        const lastHit = this.lastHitArray[lastHitArray.length - 1];
        const adjacentCells = this.getAllAdjascentCells(enemy, lastHit);
        const adjacentHits = adjacentCells.filter(cell => {
            return (cell.cellResult === 'hit' && this.checkIfShipIsSunk(enemy, cell.adjascentCell) === false);
        });

        // If there is a hit (or multiple) adjacent, attack in the opposite direction
        if (adjacentHits.length > 0) {
            const randomAdjacentHit = adjacentHits[Math.floor(Math.random() * adjacentHits.length)];
            let nextCell = this.getNextAttackableCell(enemy, lastHit, this.flipDirection(randomAdjacentHit.direction));

            if (nextCell === false) {
                nextCell = this.getNextAttackableCell(enemy, lastHit, randomAdjacentHit.direction);
            };
            while (nextCell === false) {
                nextCell = this.getNextAttackableCell(enemy, lastHit, this.possibleDirections[Math.floor(Math.random() * this.possibleDirections.length)]);
            };
            return nextCell;
        }
        // Iterate backwards through all other hit cells for adjaceny to the lastHit cell
        // If adjacency is found, see if we can attack a cell in that direction

        for (let i = this.lastHitArray.length - 2; i >= 0; i--) {
            const cell = this.lastHitArray[i];
            const result = this.getAdjacency(lastHit, cell);
            if (result) {
                let nextCell = this.getNextAttackableCell(enemy, lastHit, result.direction);

                if (nextCell) return nextCell;
            }
        }
        // At this point we have confirmed that the lastHit is the only hit on that ship
        // So we pick a random adjacent cell that we can attack, and attack it!
        const adjacentCellsToAttack = adjacentCells.filter(cell => {
            return typeof cell.cellResult !== 'string' && cell.cellResult !== undefined;
        });

        const cell = adjacentCellsToAttack[Math.floor(Math.random() * adjacentCellsToAttack.length)];

        return cell.adjascentCell;
    }


    function getRandomCell(enemy) {
        if (this.availableAttacks.length === 0) return 'No squares to attack';
        //get a row and col for a random AI attack from the available attack arrays
        let arrayRow = Math.floor(Math.random() * this.availableAttacks.length);
        let arrayCol = Math.floor(Math.random() * this.availableAttacks[arrayRow].length);

        let cell = this.availableAttacks[arrayRow][arrayCol];

        //if the selected cell has no adjascent cell to attack get another random cell
        const adjascentCells = this.getAllAdjascentCells(enemy, cell);

        if (adjascentCells.every(cell => typeof cell.cellResult != 'object')) {
            return this.getRandomCell(enemy);
        }

        return cell;
    }

    function removeCellFromAvailableAttacks(cell) {
        for (let row = 0; row < this.availableAttacks.length; row++) {
            for (let col = 0; col < this.availableAttacks[row].length; col++) {
                const square = this.availableAttacks[row][col];
                if (cell[0] === square[0] && cell[1] === square[1]) {
                    this.availableAttacks[row].splice(col, 1);
                    if (this.availableAttacks[row].length === 0) {
                        this.availableAttacks.splice(row, 1);
                    }
                    return;
                }
            }

        }
    }

    function getAdjascentCell(cell, direction) {
        let [row, col] = cell;
        switch (direction) {
            case 'up':
                row--;
                break;
            case 'down':
                row++;
                break;
            case 'left':
                col--;
                break;
            case 'right':
                col++;
                break;

            default:
                break;
        }

        return [row, col];
    }
    //given a cell, find the 4 possible adjascent cells and their directions
    function getAllAdjascentCells(enemy, cell) {
        return possibleDirections.map(direction => {
            const adjascentCell = this.getAdjascentCell(cell, direction);
            let cellResult = enemy.gameBoard.checkSquare(adjascentCell[0], adjascentCell[1]);

            if (cellResult === 'hit') {
                if (this.checkIfShipIsSunk(enemy, adjascentCell)) {
                    cellResult = 'sunk';
                }
            }
            return {
                cellResult,
                adjascentCell,
                direction
            }
        });
    }
    // Check if a cell is adjacent to, or in the same row/col as another
    // Return the direction to the cell, the opposite direction, and the distance
    function getAdjacency(cell, neighbourCell) {
        let direction;
        let oppositeDirection;
        let distance;
        if (cell[0] === neighbourCell[0]) {
            const diff = cell[1] - neighbourCell[1];
            direction = diff > 1 ? 'left' : 'right';
            oppositeDirection = diff > 1 ? 'right' : 'left';
            distance = Math.abs(diff);
        } else if (cell[1] === neighbourCell[1]) {
            const diff = cell[0] - neighbourCell[0];
            direction = diff > 1 ? 'down' : 'up';
            oppositeDirection = diff > 1 ? 'up' : 'down';
            distance = Math.abs(diff);
        } else {
            return false;
        }
        return {
            direction,
            oppositeDirection,
            distance
        }
    }

    // Look for a possible cell to attack in a given direction (search 4 cells only)
    function getNextAttackableCell(enemy, cell, direction) {
        let nextCell = getAdjascentCell(cell, direction);

        for (let i = 0; i < 4; i++) {
            let nextCellStatus = enemy.gameBoard.checkSquare(nextCell[0], nextCell[1]);
            if (typeof nextCellStatus === 'object' || nextCellStatus === null) return nextCell;
            if (nextCellStatus === undefined) return false;
            if (nextCellStatus === 'miss') return false;
            // We skip over a hit (could be part of the same ship we're attacking),
            // unless that ship is sunk - then we shouldn't keep attacking in that direction
            if (nextCellStatus === 'hit') {
                if (this.checkIfShipIsSunk(enemy, nextCell)) return false;
            }
            nextCell = getAdjascentCell(nextCell, direction);
        }
        return false;
    }

    function flipDirection(direction) {
        switch (direction) {
            case 'up':
                return 'down';
            case 'down':
                return 'up';
            case 'left':
                return 'right';
            case 'right':
                return 'left';
            default:
                return false;
        }
    }
    //find a ship at a certain cell and check if it sunk
    //if it is remove it's squares from the last hit array and retun true
    function checkIfShipIsSunk(enemy, cell) {
        const enemyShips = enemy.gameBoard.placedShips;
        let hitShip;
        enemyShips.forEach(ship => {
            if (ship.squares.some(square => {
                    return square[0] === cell[0] && square[1] === cell[1];
                })) {
                hitShip = ship;
            }
        });

        if (hitShip.isSunk()) {
            hitShip.squares.forEach(square => {
                const index = this.lastHitArray.findIndex(location => {
                    return location[0] === square[0] && location[1] === square[1];
                });

                if (index > -1) {
                    this.lastHitArray.splice(index, 1);
                }
            });
            return true;
        } else {
            return false;
        }
    }

    return {
        availableAttacks,
        lastHitArray,
        concurrentMisses,
        attack,
        getRandomCell,
        getAllAdjascentCells,
        getAdjascentCell,
        removeCellFromAvailableAttacks,
        checkIfShipIsSunk,
        flipDirection,
        getNextAttackableCell
    }
}

function createAttackArray() {
    const attackArray = [];
    for (let row = 0; row < 10; row++) {
        let rowArray = [];
        for (let col = 0; col < 10; col++) {
            rowArray.push([row, col]);
        }
        attackArray.push(rowArray);
    }

    return attackArray;
}

export default aiLogic;