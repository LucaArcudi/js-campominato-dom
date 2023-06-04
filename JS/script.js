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



let buttonElement = document.querySelector("a");
let records = [];
let bestScore = 0;
buttonElement.addEventListener("click", function () {
    let divSquareParentElement = document.getElementById("game-container");
    divSquareParentElement.classList.remove("d-none");
    divSquareParentElement.innerHTML = "";
    const bombs = [];
    for (let k = 0; k < 5; k++) {
        bombs.push(getRandomUniqueNumber(bombs, 1, 25));
    }
    console.log(bombs);
    let isGameOver = false;
    let points = 0;
    let lastGamePoints = 0;
    const scoreEl = document.createElement('p');
    const scoreParentEl = document.getElementById('game-status');
    scoreParentEl.innerHTML = '';
    scoreEl.innerText = `Punti : ${points}`;
    scoreEl.classList.add('mb-0', 'fs-1', 'text-secondary');
    scoreParentEl.appendChild(scoreEl);
    const bestScoreElement = document.createElement('p');
    const bestScoreParentEl = document.getElementById('game-record');
    bestScoreParentEl.innerHTML = '';
    if (bestScore < 20) {
        bestScoreElement.innerText = `Miglior punteggio: ${bestScore}`
    } else {
        bestScoreElement.innerText = `Miglior punteggio: ${bestScore}. Non puoi fare di meglio!`
    }
    bestScoreElement.classList.add('mb-0', 'fs-3', 'text-secondary');
    bestScoreParentEl.appendChild(bestScoreElement);
    const lastGameScoreEl = document.createElement('p');
    const lastGameScoreParentEl = document.getElementById('game-points');
    lastGameScoreParentEl.innerHTML = '';
    lastGameScoreEl.classList.add('mb-0', 'fs-3', 'text-secondary');
    lastGameScoreParentEl.appendChild(lastGameScoreEl);
    for (let i = 1; i <= 25; i++) {
        const divSquareElement = getNewSquare();
        divSquareElement.addEventListener("click", function () {
            if (!isGameOver) {
                if (bombs.includes(i)) {
                    divSquareElement.classList.add("square-bomb");
                    lastGamePoints = points;
                    lastGameScoreEl.innerText = `Punteggio partita: ${lastGamePoints}`
                    records.push(lastGamePoints);
                    for (let i = 0; i < records.length; i++) {
                        while (bestScore < records[i]) {
                            bestScore = records[i];
                        }
                    }
                    if (bestScore < 20) {
                        bestScoreElement.innerText = `Miglior punteggio: ${bestScore}`
                    } else {
                        bestScoreElement.innerText = `Miglior punteggio: ${bestScore}. Non puoi fare di meglio!`
                    }
                    scoreEl.classList.replace('text-secondary', 'text-danger');
                    scoreEl.innerText = 'Hai perso!';
                    isGameOver = true;
                } else {
                    divSquareElement.classList.add("square-clicked");
                    points++;
                    scoreEl.innerText = `Punti : ${points}`;
                    if (points === 25 - bombs.length) {
                        lastGamePoints = points;
                        lastGameScoreEl.innerText = `Punteggio partita: ${lastGamePoints}`
                        records.push(lastGamePoints);
                        bestScore = points
                        bestScoreElement.innerText = `Miglior punteggio: ${bestScore}. Non puoi fare di meglio!`
                        scoreEl.classList.replace('text-secondary', 'text-success');
                        scoreEl.innerText = 'Hai vinto!';
                        isGameOver = true;
                    }
                }
            }
        }, { once: true });
        divSquareParentElement.appendChild(divSquareElement);
    }
})
function getRandomNumber(min, max) {
    if (min === max) {
        return max
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getNewSquare() {
    const divNewSquare = document.createElement("div");
    divNewSquare.classList.add("square", "d-flex");
    return divNewSquare;
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