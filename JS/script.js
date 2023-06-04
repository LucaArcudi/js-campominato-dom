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

buttonElement.addEventListener("click", function () {

    let divSquareParentElement = document.getElementById("game-container");
    divSquareParentElement.classList.remove("d-none");
    divSquareParentElement.innerHTML = "";

    const bombs = [];
    for (let k = 0; k < 16; k++) {
        bombs.push(getRandomUniqueNumber(bombs, 1, 100));
    }
    console.log(bombs);

    let isGameOver = false;

    let points = 0;
    let lastGamePoints = 0;

    const scoreEl = document.createElement('p');
    const scoreParentEl = document.getElementById('game-status');
    scoreParentEl.innerHTML = '';
    scoreEl.classList.add('mb-0', 'fs-1', 'text-primary');
    // scoreEl.innerText = `Punti : ${point}`;
    scoreParentEl.appendChild(scoreEl);

    for (let i = 1; i <= 100; i++) {

        const divSquareElement = getNewSquare();

        divSquareElement.addEventListener("click", function () {
            if (!isGameOver) {
                if (bombs.includes(i)) {
                    divSquareElement.classList.add("square-bomb");
                    lastGamePoints = points;
                    console.log('lgp' + lastGamePoints);
                    scoreEl.classList.add('text-danger');
                    scoreEl.innerText = 'Hai Perso!';
                    isGameOver = true;
                } else {
                    divSquareElement.classList.add("square-clicked");
                    points++;
                    scoreEl.innerText = `Punti : ${points}`;
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