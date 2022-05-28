let cardsInPlay = [];
let cardsMatched = [];
let numberOfPairs = 2;
const numberOfPairsSelect = document.querySelector('#numberOfPairs');
const resetBtn = document.querySelector('#reset');
const container = document.querySelector('.container')

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


// CREATING THE CARD
function createCard(indexForImg) {
  // MAIN container
  const card = document.createElement('div');
  card.classList.add('card')
  // MAIN Card Content with click->flip functionality
  const cardInner = document.createElement('div');
  cardInner.classList.add('card__inner')
  cardInner.addEventListener("click", function (e) {
    cardInner.classList.toggle('is-flipped');
  });
  // CREATING THE FRONT AND BACK
  const cardFront = createCardFront();
  const cardBack = createCardBack(indexForImg);
  // Adding child of cardInner
  cardInner.appendChild(cardFront)
  cardInner.appendChild(cardBack)
  // Adduing child of card
  card.appendChild(cardInner)

  return card
}
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

numberOfPairsSelect.addEventListener('change', function () {
  numberOfPairs = parseInt(this.value);;
})

resetBtn.addEventListener('click', reset);
reset()