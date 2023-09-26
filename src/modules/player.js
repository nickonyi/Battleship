import GameBoard from "./gameboard";
import aiLogic from "./aiLogic";

function Player(playerName, playerNumber) {
    let name = typeof playerName == 'string' ? playerName : 'battlebot';
    const number = playerNumber;
    const isAi = typeof playerName == 'string' ? false : true;
    const gameBoard = GameBoard();
    const battlebot = aiLogic();

    function attack(enemy, row, col) {
        //if the attacking player is ai we use the ai module to get the attacking coordinates
        if (this.isAi) {
            if (this.battlebot.availableAttacks.length === 0) {
                return 'No squares to attack';
            } else {
                [row, col] = this.battlebot.attack(enemy);
            }
        }
        //get the results of the attack and update ai logic with
        const results = enemy.gameBoard.receiveAttack(row, col);
        console.log(results);
        if(this.isAi){
             if(results[0] === 'hit'){
                this.battlebot.lastHitArray.push(results[1]);
                this.battlebot.concurrentMisses  = 0;
             }
        }
        if(results[0] === 'miss'){
            this.battlebot.concurrentMisses++; 
        }
        if(results[2] !== null){
            this.battlebot.lastShip = results[2];
        }
        this.battlebot.removeCellFromAvailableAttacks(results[1]);

        return results;
    }
    return {
        name,
        number,
        isAi,
        battlebot,
        gameBoard,
        attack
    }
}

export default Player;