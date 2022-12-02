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

buttonElement.addEventListener("click", function(){

        let divSquareParentElement = document.getElementById("game-container");
        divSquareParentElement.classList.remove("d-none");

        divSquareParentElement.innerHTML = "";

        for(let i = 1; i <= 100; i++){

            const divSquareElement = getNewSquare(i);
            divSquareElement.innerHTML = `<span class="m-auto">${i}</span>`;
            divSquareParentElement.appendChild(divSquareElement);
    
        }

    
})

function getNewSquare (index) {

    const divNewSquare = document.createElement("div");
    divNewSquare.classList.add("square", "d-flex");
    
    divNewSquare.addEventListener("click", function (){

        divNewSquare.classList.toggle("square-clicked");
        console.log("");
        console.log(`${"Hai cliccato la cella numero:"} ${index}`);

    })
    
    return divNewSquare;
}


