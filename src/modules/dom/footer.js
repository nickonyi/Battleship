function createFooterBox() {
    const footerBox = document.createElement('footer');
    const authorName = document.createElement('p');
    authorName.classList.add('footer-author');
    authorName.textContent = 'Phantommobb 2023';

    const footerLink = document.createElement('a');
    footerLink.id = "footer-link";
    footerLink.setAttribute('href', 'https://github.com/nickonyi/Battleship.git');

    const githubLogo = document.createElement('i');
    githubLogo.classList.add("fa-brands", "fa-github", "fa-xl", "footer-logo");
    footerLink.appendChild(githubLogo);

    footerBox.appendChild(authorName)
    footerBox.appendChild(footerLink);

    return footerBox;
}

export default createFooterBox;