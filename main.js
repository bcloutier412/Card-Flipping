// Global Variables
let cardsInPlay = [];
let cardsMatched = [];
let numberOfPairs = 2;
let firstPickedImage = undefined
let secondPickedImage = undefined

//Document Selectors
const numberOfPairsSelect = document.querySelector('#numberOfPairs');
const resetBtn = document.querySelector('#reset');
const container = document.querySelector('.container')

//Function to reset the game board with defualt or newly given number of pairs
function reset() {
  cardsInPlay = [];
  cardsMatched = [];
  for (i = 0; i < numberOfPairs * 2; i++) {
    const card = createCard(i);
    cardsInPlay.push(card);

  }
  cardsInPlay.forEach(element => {
    container.appendChild(element)
  })

  
}
//CREATING THE CARD OBJECT -> pushing it to the cardsInPlay array with event listener
function createCard(indexForImg) {
  // Creating MAIN container
  const card = document.createElement('div');
  card.classList.add('card')
  // Creating MAIN Card Content with click->flip functionality
  const cardInner = document.createElement('div');
  cardInner.classList.add('card__inner')
  //Checking for click -> toggle .is-flipped to flip card/ checking for matching imgs 
  cardInner.addEventListener("click", function () {
    cardInner.classList.toggle('is-flipped');
    if (firstPickedImage === undefined) {
    //variables value becomes the img src of the card object
      firstPickedImage = this.lastElementChild.firstElementChild.src
    }
    //comparing first img to the second
    else if (firstPickedImage === this.lastElementChild.firstElementChild.src) {
      alert('match!')
      firstPickedImage = undefined
      secondPickedImage = undefined
    }
    //if no match reset the variables to undefined
    else {
      alert('no match')
      firstPickedImage = undefined
      secondPickedImage = undefined
    }
  });

  // CREATING THE FRONT AND BACK
  const cardFront = createCardFront();
  const cardBack = createCardBack(indexForImg);
  // Adding Front and Back as a child of cardInner
  cardInner.appendChild(cardFront)
  cardInner.appendChild(cardBack)
  // Adding cardInner as a child of card
  card.appendChild(cardInner)

  return card
}

function createCardFront() {
  const cardFront = document.createElement('div');
  const cardFrontText = document.createElement('h2');
  cardFrontText.textContent = 'Dinos arcade';
  cardFront.appendChild(cardFrontText);
  cardFront.classList.add('card__face', 'card__face--front');
  return cardFront;
}

function createCardBack(i) {
  const cardBack = document.createElement('div');
  const cardBackImg = document.createElement('img');
  cardBackImg.src = `images/image${Math.floor(i/2)}.jpg`;
  cardBack.appendChild(cardBackImg);
  cardBack.classList.add('card__face','card__face--back');
  return cardBack;
}

numberOfPairsSelect.addEventListener('change', function () {
  numberOfPairs = parseInt(this.value);;
})

resetBtn.addEventListener('click', reset);
reset()