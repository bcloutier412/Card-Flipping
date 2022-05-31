// Global Variables
let cardsInPlay = [];
let cardsMatched = [];
let numberOfPairs = 2;
let gameStyle = 'dinobabies'
let firstPickedImage = undefined;
let secondPickedImage = undefined;

//Document Selectors
const numberOfPairsSelect = document.querySelector("#numberOfPairs");
const resetBtn = document.querySelector("#reset");
const container = document.querySelector(".container");
const gameStyleSelect = document.querySelector('#gameStyle')

gameStyleSelect.addEventListener("change", function () {
  gameStyle = this.value
})

numberOfPairsSelect.addEventListener("change", function () {
  numberOfPairs = parseInt(this.value);
});

resetBtn.addEventListener("click", reset);


function createCardFront() {
  const cardFront = document.createElement("div");
  const cardFrontText = document.createElement("h2");
  cardFrontText.textContent = "Dinos arcade";
  cardFront.appendChild(cardFrontText);
  cardFront.classList.add("card__face", "card__face--front");
  return cardFront;
}

function createCardBack(i) {
  const cardBack = document.createElement("div");
  const cardBackImg = document.createElement("img");
  cardBackImg.src = `images/${gameStyle}image${Math.floor(i / 2)}.jpg`;
  cardBack.appendChild(cardBackImg);
  cardBack.classList.add("card__face", "card__face--back");
  return cardBack;
}

//CREATING THE CARD OBJECT/ RETURNING THE CARD OBJECT
function createCard(indexForImg) {
  // Creating MAIN container
  const card = document.createElement("div");
  card.classList.add("card");
  // Creating MAIN Card Content
  const cardInner = document.createElement("div");
  cardInner.classList.add("card__inner");
  //Checking for click -> toggle .is-flipped to flip card/ checking for matching imgs
  cardInner.addEventListener("click", function () {
    //Checks if the card is not the firstpickedimage/card and that it is in the 
    //cardsinplay so that means that you cant click an aleady matched card
    if (this !== firstPickedImage && cardsInPlay.includes(this.parentNode)) {
      cardInner.classList.toggle("is-flipped");
      if (firstPickedImage === undefined) {
        //variables value becomes the img src of the card object
        firstPickedImage = this;
      }
      //comparing first img to the second
      else if (
        firstPickedImage.lastElementChild.firstElementChild.src ===
        this.lastElementChild.firstElementChild.src
      ) {
        setTimeout(
          (firstPickedImage, secondPickedImage) => {
            firstPickedImage.classList.add("greenboxshadow");
            secondPickedImage.classList.add("greenboxshadow");
          },
          800,
          firstPickedImage,
          this
        );
        cardsInPlay.splice(cardsInPlay.indexOf(firstPickedImage.parentNode), 1);
        cardsMatched.push(firstPickedImage.parentNode);
        cardsInPlay.splice(cardsInPlay.indexOf(this.parentNode), 1);
        cardsMatched.push(this.parentNode);
        firstPickedImage = undefined;
        secondPickedImage = undefined;
        if (cardsInPlay.length === 0) {
          alert("You won");
        }
      }
      //if no match reset the variables to undefined
      else {
        setTimeout((firstPickedImage, secondPickedImage) => {
          firstPickedImage.classList.toggle("is-flipped");
          secondPickedImage.classList.toggle("is-flipped");
        }, 1300, firstPickedImage, this)
        firstPickedImage = undefined;
        secondPickedImage = undefined;
      }
    }
  });

  // CREATING THE FRONT AND BACK
  const cardFront = createCardFront();
  const cardBack = createCardBack(indexForImg);
  // Adding Front and Back as a child of cardInner
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  // Adding cardInner as a child of card
  card.appendChild(cardInner);

  return card;
}

//Function to reset the game board with defualt or newly given number of pairs
function reset() {
  //Removing all cards from the Container div
  cardsInPlay.forEach((element) => {
    container.removeChild(element);
  });
  cardsMatched.forEach((element) => {
    container.removeChild(element);
  });

  //resetting the cardsinplay/matched arrays to append new cards
  cardsInPlay = [];
  cardsMatched = [];
  firstPickedImage = undefined;
  secondPickedImage = undefined;

  //Creating the Cards through the createCard function then appending it to the cardsInPlay array and Container div
  for (i = 0; i < numberOfPairs * 2; i++) {
    const card = createCard(i);
    randnum = Math.random() * cardsInPlay.length;
    // cardsInPlay.push(card);
    cardsInPlay.splice(randnum, 0, card);
  }
  cardsInPlay.forEach((element) => {
    container.appendChild(element);
    
  });
}

reset();
