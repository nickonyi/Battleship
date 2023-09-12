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

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');
    btnContainer.appendChild(newGameButton);
    btnContainer.appendChild(howToPlayButton);

    header.appendChild(title);
    header.appendChild(btnContainer);


    return header;
}

export default createHeaderBox;