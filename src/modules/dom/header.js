function createHeaderBox() {
    const header = document.createElement('header');
    header.id = 'header';
    const title = document.createElement('h1');
    title.textContent = 'Battleship';

    const newGameButton = document.createElement('button');
    newGameButton.classList.add('new-game-button');
    newGameButton.textContent = "New game";

    const howToPlayButton = document.createElement('button');
    howToPlayButton.classList.add('play-button');
    howToPlayButton.textContent = "How to play";

    header.appendChild(title);
    header.appendChild(newGameButton);
    header.appendChild(howToPlayButton)

    return header;
}

export default createHeaderBox;