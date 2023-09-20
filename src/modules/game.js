import Player from "./player";

function Game() {
    let player1;
    let player2;
    let currentPlayer;
    let defendigPlayer;

    function createPlayer(playerName, playerNumber) {
        return Player(playerName, playerNumber);
    }

    function newGame(player1,player2){
           this.player1 = player1;
           this.player2 = player2;
           this.currentPlayer = this.player1;
           this.defendigPlayer = this.player2;
    }


    return {
        player1,
        player2,
        currentPlayer,
        defendigPlayer,
        createPlayer,
        newGame
        
        
    }

}

export default Game;