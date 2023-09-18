import './style.css'
import './modules/dom/domController'
import GameBoard from './modules/gameboard'



const game = GameBoard();

console.log(game.checkSquare(2, 5));