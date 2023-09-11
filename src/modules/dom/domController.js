import createHeaderBox from "./header";
import createFooterBox from "./footer";

const app = document.createElement('div');
app.id = "app";
document.body.appendChild(app);

const header = createHeaderBox();
const footer = createFooterBox();

const gameContainer = document.createElement('div');
gameContainer.id = 'game-container';


app.appendChild(header)
app.appendChild(gameContainer);
app.appendChild(footer);

const newGameBtn = document.querySelector('.new-game-button');
newGameBtn.addEventListener('click', newGame);


function newGame() {
    alert('Hii ndo game mpya');
}