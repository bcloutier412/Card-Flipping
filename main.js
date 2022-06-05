// Global Variables
let cardsInPlay = [];
let cardsMatched = [];
let numberOfPairs = 2;
let gameStyle = 'doodles';
let cardBackgroundImg = 'images/doodlesgif.gif'
let firstPickedImage = undefined;
let secondPickedImage = undefined;
let inPlay = false;

//Document Selectors
const numberOfPairsSelect = document.querySelector("#numberOfPairs");
const resetBtn = document.querySelector("#reset");
const container = document.querySelector(".container");
const gameStyleSelect = document.querySelector('#gameStyle');
const body = document.querySelector('body');
const bannerimg = document.querySelector('#banner');
const menuBtns = document.querySelector('#menu-btns');
const seconds = document.querySelector('#seconds')
const milliseconds = document.querySelector('#milliseconds')
const winningMessage = document.querySelector('#winningMessage')
const winningMessageSeconds = document.querySelector('#winningMessageSeconds')
const winningMessageMilliseconds = document.querySelector('#winningMessageMilliseconds')

gameStyleSelect.addEventListener("change", function () {
  gameStyle = this.value
  if (this.value === 'dinobabies') {
    cardBackgroundImg = 'images/dinobabiesegg.jpg'
  }
  else if (this.value === 'doodles') {
    cardBackgroundImg = 'images/doodlesgif.gif'
  }
  else if (this.value === 'kaijukingz') {
    cardBackgroundImg = ''
  }
})

numberOfPairsSelect.addEventListener("change", function () {
  numberOfPairs = parseInt(this.value);
});

resetBtn.addEventListener("click", reset);

function displayWinningScreen() {
  cardsMatched.forEach((element) => {
    setTimeout(() => {
      container.style.display = 'none'
      winningMessageSeconds.textContent = seconds.textContent
      winningMessageMilliseconds.textContent = milliseconds.textContent
      winningMessage.style.display = 'block'
    }, 1500)
  })
}
function gameTimer() {
  if (inPlay === false) {
    return
  }

  setTimeout(() => {
    secondsNum = parseInt(seconds.textContent)
    millisecondsNum = parseInt(milliseconds.textContent)
    millisecondsNum += 1
    if (millisecondsNum === 10) {
      secondsNum += 1
      seconds.textContent = secondsNum
      milliseconds.textContent = 0
    }
    else {
      milliseconds.textContent = millisecondsNum
    }
    gameTimer()
  }, 100)
}
function setGameStyle() {
  body.className = '';
  body.classList.add(gameStyle + '-background-image')
  bannerimg.src = `images/${gameStyle}banner.png`
  menuBtns.childNodes.forEach(function(nodeObj) {
  nodeObj.className = `${gameStyle}-btn`
  })
}
function removeAllExistingCards() {
  cardsInPlay.forEach((element) => {
    container.removeChild(element);
  });
  cardsMatched.forEach((element) => {
    container.removeChild(element);
  });
  cardsInPlay = [];
  cardsMatched = [];
  firstPickedImage = undefined;
  secondPickedImage = undefined;
}
function createCardFront() {
  const cardFront = document.createElement("div");
  const cardFrontText = document.createElement("img");
  cardFrontText.src = cardBackgroundImg;
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
  cardInner.classList.add(gameStyle + '-background-color')
  //Checking for click -> toggle .is-flipped to flip card/ checking for matching imgs
  cardInner.addEventListener("click", function () {
    //Checks if the card is not the firstpickedimage/card and that it is in the 
    //cardsinplay so that means that you cant click an aleady matched card
    const isNotFirstCard = this !== firstPickedImage
    const isInPlay = cardsInPlay.includes(this.parentNode)
    if (isNotFirstCard && isInPlay) {
      if (inPlay === false) {
        inPlay = true
        gameTimer()
      }
      cardInner.classList.toggle("is-flipped");
      if (firstPickedImage === undefined) {
        //variables value becomes the img src of the card object
        firstPickedImage = this;
        return
      }
      //comparing first img to the second
      else if (firstPickedImage.lastElementChild.firstElementChild.src === this.lastElementChild.firstElementChild.src) {
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
          inPlay = false
          displayWinningScreen()
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
  setGameStyle()
  removeAllExistingCards()
  //Creating the Cards through the createCard function then randomly appending it to the cardsInPlay array and Container div
  for (i = 0; i < numberOfPairs * 2; i++) {
    const card = createCard(i);
    randnum = Math.random() * cardsInPlay.length;
    cardsInPlay.splice(randnum, 0, card);
  }
  cardsInPlay.forEach((element) => {
    container.appendChild(element);
  });
  container.style.display = 'flex'
  inPlay = false
  seconds.textContent = '0'
  milliseconds.textContent = '0'
  winningMessage.style.display = 'none'
}

reset();