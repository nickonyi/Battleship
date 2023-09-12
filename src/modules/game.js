import Player from "./player";

function Game() {
    let player1;
    let player2;
    let currentPlayer;
    let defendigPlayer;

    function createPlayer(playerName, playerNumber) {
        return Player(playerName, playerNumber);
    }


    return {
        player1,
        player2,
        currentPlayer,
        defendigPlayer,
        createPlayer
    }

}

export default Game;