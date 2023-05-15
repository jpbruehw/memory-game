document.addEventListener("DOMContentLoaded", function() {
  
  //start screen
  const startButton = document.getElementById('start-button');
  const startScreen = document.getElementById('start-screen');
  const gameDiv = document.getElementById('game-div');

  //display game
  startButton.addEventListener('click', function() {
    startScreen.classList.add('hidden');
    startScreen.style.display = 'none';
    gameDiv.style.display = 'block';
  });

  const gameContainer = document.getElementById('game');

  let count = 0;
  let countElement = document.getElementById('attempt-count');
  countElement.innerText = count;

  let wins = 0;
  let countWins = document.getElementById('correct-count');
  countElement.innerText - wins;

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

  function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add('card');
      newDiv.setAttribute('data-color', color);
      const newSpan = document.createElement('span');
      newSpan.innerHTML = '&#x2753;';
      newDiv.appendChild(newSpan);
      newDiv.addEventListener('click', handleCardClick);
      gameContainer.append(newDiv);
    }
  }

  let lastCLickedCard = [];

  function handleCardClick(event) {
    // update attempt count
    count++;
    //update text
    countElement.innerText = count.toString();
    // get clicked element
    const card = event.target;

    // get the color value from the data-color attribute
    const color = card.getAttribute('data-color');

    lastCLickedCard.push(color);

    if (lastCLickedCard.length === 2) {
      if (lastCLickedCard[0] === lastCLickedCard[1]) {
        wins++;
        countWins.innerText = wins.toString();
        lastCLickedCard = [];
      }
    } else if (lastCLickedCard.length > 2) {
      lastCLickedCard = [];
    }  

    // get the emoji span element
    const emoji = card.querySelector('span');

  // add clicked class for animation
    card.classList.add('clicked');

    // show the color of the card with a fade-in effect
    card.style.backgroundImage = `linear-gradient(${color}, rgba(220, 208, 221, 0.99))`;

    // fade out the emoji
    emoji.style.transition = 'opacity 0.5s ease-in-out';
    emoji.style.opacity = 0;

    // set delay then revert back to original color and stop spinning
    setTimeout(function () {
      card.style.backgroundImage = `linear-gradient(rgba(206,117,250,0.72), rgba(220,208,221,0.99))`;
      card.classList.remove('clicked');
      // fade in the emoji
      emoji.style.opacity = 1;
    }, 1000);
  }
  createDivsForColors(shuffledColors);
});