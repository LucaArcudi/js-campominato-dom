// Consegna
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// Attenzione: Nella stessa cella può essere posizionata al massimo una bomba,
// perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati
// - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile
// di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio,
// cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.



let records = [];
let bestScore = 0;
let lastGameScore = 0;

let buttonElement = document.querySelector("a");
buttonElement.addEventListener("click", function () {

    const squareElementParent = getSquareElementParent('game-container')

    const numberOfCells = 100

    const numberOfBombs = 16
    const bombs = [];
    for (let k = 0; k < numberOfBombs; k++) {
        bombs.push(getRandomUniqueNumber(bombs, 1, numberOfCells));
    }

    console.log(bombs);

    let isGameOver = false;
    let score = 0;

    const scoreElement = createScoreElement('p', score)
    getScoreElementParent('game-status', scoreElement)

    const bestScoreElement = createBestScoreElement('p')
    if (bestScore < numberOfCells - bombs.length) {
        bestScoreElement.innerText = `Miglior punteggio: ${bestScore}`
    } else {
        bestScoreElement.innerText = `Miglior punteggio: ${bestScore}. Non puoi fare di meglio!`
    }
    getBestScoreElementParent('game-record', bestScoreElement)

    const lastGameScoreElement = createLastGameScoreElement('p')
    getLastGameScoreElementParent('game-points', lastGameScoreElement)

    lastGameScoreElement.innerText = `Punteggio ultima partita: ${lastGameScore}`;

    for (let i = 1; i <= numberOfCells; i++) {
        const squareElement = createSquareElement(numberOfCells);
        squareElement.addEventListener("click", function () {

            if (!isGameOver) {
                if (bombs.includes(i)) {
                    squareElement.classList.add("square-bomb");
                    lastGameScore = score;
                    lastGameScoreElement.innerText = `Punteggio partita: ${lastGameScore}`;
                    records.push(lastGameScore);

                    bestScore = getMaxValueInArray(records, bestScore)

                    if (bestScore < numberOfCells - bombs.length) {
                        bestScoreElement.innerText = `Miglior punteggio: ${bestScore}`
                    } else {
                        bestScoreElement.innerText = `Miglior punteggio: ${bestScore}. Non puoi fare di meglio!`
                    }

                    scoreElement.classList.replace('text-secondary', 'text-danger');
                    scoreElement.innerText = 'Hai perso!';

                    isGameOver = true;
                } else {
                    squareElement.classList.add("square-clicked");
                    score++;
                    scoreElement.innerText = `Punti : ${score}`;

                    if (score === numberOfCells - bombs.length) {
                        lastGameScore = score;
                        lastGameScoreElement.innerText = `Punteggio partita: ${lastGameScore}`
                        records.push(lastGameScore);
                        bestScore = score
                        bestScoreElement.innerText = `Miglior punteggio: ${bestScore}. Non puoi fare di meglio!`
                        scoreElement.classList.replace('text-secondary', 'text-success');
                        scoreElement.innerText = 'Hai vinto!';
                        isGameOver = true;
                    }
                }
            }
        }, { once: true });
        squareElementParent.appendChild(squareElement);
    }
})

/***************
CUSTOM fUNCTIONS
***************/

function getRandomNumber(min, max) {
    if (min === max) {
        return max
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomUniqueNumber(blacklist, min, max) {
    let isValid = false;
    let randomNumber;
    while (isValid === false) {
        randomNumber = getRandomNumber(min, max);
        if (!blacklist.includes(randomNumber)) {
            isValid = true;
        }
    }
    return randomNumber;
}
function getMaxValueInArray(array, variable) {
    for (let i = 0; i < array.length; i++) {
        while (variable < array[i]) {
            variable = array[i];
        }
    }
    return variable
}
function createSquareElement(arg) {
    const squareElement = document.createElement("div");
    squareElement.classList.add("square", "d-flex");
    squareElement.style.width = `calc(100%/${Math.sqrt(arg)})`
    squareElement.style.height = `calc(100%/${Math.sqrt(arg)})`
    return squareElement;
}
function getSquareElementParent(id) {
    const squareElementParent = document.getElementById(id);
    squareElementParent.classList.remove("d-none");
    squareElementParent.innerHTML = "";
    return squareElementParent
}
function createScoreElement(tag, score) {
    let scoreElement = document.createElement(tag)
    scoreElement.innerText = `Punti : ${score}`;
    scoreElement.classList.add('mb-0', 'fs-1', 'text-secondary');
    return scoreElement
}
function getScoreElementParent(id, child) {
    const scoreElementParent = document.getElementById(id);
    scoreElementParent.innerHTML = '';
    scoreElementParent.appendChild(child);
}
function createBestScoreElement(tag) {
    const bestScoreElement = document.createElement(tag);
    bestScoreElement.classList.add('mb-0', 'fs-3', 'text-secondary');
    return bestScoreElement
}
function getBestScoreElementParent(id, child) {
    const bestScoreElementParent = document.getElementById(id);
    bestScoreElementParent.innerHTML = '';
    bestScoreElementParent.appendChild(child);
}
function createLastGameScoreElement(tag) {
    const lastGameScoreElement = document.createElement(tag);
    lastGameScoreElement.classList.add('mb-0', 'fs-3', 'text-secondary');
    return lastGameScoreElement
}
function getLastGameScoreElementParent(id, child) {
    const lastGameScoreElementParent = document.getElementById(id);
    lastGameScoreElementParent.innerHTML = '';
    lastGameScoreElementParent.appendChild(child);
}