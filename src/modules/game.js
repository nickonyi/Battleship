import Player from "./player";

function Game() {
    let player1;
    let player2;
    let currentPlayer;
    let defendingPlayer;

    function createPlayer(playerName, playerNumber) {
        return Player(playerName, playerNumber);
    }

    function newGame(player1,player2){
           this.player1 = player1;
           this.player2 = player2;
           this.currentPlayer = this.player1;
           this.defendingPlayer = this.player2;
    }

    function changeTurn(){
        this.currentPlayer = this.currentPlayer === this.player1?this.player2:this.player1;
        this.defendingPlayer = this.defendingPlayer === this.player2?this.player1:this.player2;
    }


    return {
        player1,
        player2,
        currentPlayer,
        defendingPlayer,
        createPlayer,
        newGame,
        changeTurn
        
        
    }

}

export default Game;