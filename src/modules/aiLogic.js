function aiLogic() {
    //create a 2D array of available attack coordinates
    const availableAttacks = createAttackArray();
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
        if (this.lastHitArray.length === 0) {
            if (this.concurrentMisses > 3 && Math.random() > .8) {
                const enemyBoard = enemy.gameBoard.board;
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
        availableAttacks
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