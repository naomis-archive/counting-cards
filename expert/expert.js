const deck = [
  "AC",
  "AD",
  "AH",
  "AS",
  "2C",
  "2D",
  "2H",
  "2S",
  "3C",
  "3D",
  "3H",
  "3S",
  "4C",
  "4D",
  "4H",
  "4S",
  "5C",
  "5D",
  "5H",
  "5S",
  "6C",
  "6D",
  "6H",
  "6S",
  "7C",
  "7D",
  "7H",
  "7S",
  "8C",
  "8D",
  "8H",
  "8S",
  "9C",
  "9D",
  "9H",
  "9S",
  "10C",
  "10D",
  "10H",
  "10S",
  "JC",
  "JD",
  "JH",
  "JS",
  "QC",
  "QD",
  "QH",
  "QS",
  "KC",
  "KD",
  "KH",
  "KS",
];

let count = 0;
const playerhand = document.getElementById("player-container");
const dealerhand = document.getElementById("dealer-container");
const playerone = document.getElementById("player-one");
const playertwo = document.getElementById("player-two");
const dealerone = document.getElementById("dealer-one");
const dealertwo = document.getElementById("dealer-two");
const playerscore = document.getElementById("player-score");
const dealerscore = document.getElementById("dealer-score");
const hitbutton = document.getElementById("hit-button");
const standbutton = document.getElementById("stand-button");

function dealhand() {
  playerscore.innerHTML = 0;
  dealerscore.innerHTML = 0;
  playerhand.innerHTML = `<img id="player-one" src="../cards-svg/Joker1.svg" />
  <img id="player-two" src="../cards-svg/Joker1.svg" />`;
  dealerhand.innerHTML = `<img id="dealer-one" src="../cards-svg/Joker1.svg" />
    <img id="dealer-two" src="../cards-svg/Joker1.svg" />`;
  hitbutton.setAttribute("style", "display: initial;");
  standbutton.setAttribute("style", "display: initial;");
  dealfirstcard("player-one", playerscore);
  dealfirstcard("player-two", playerscore);
  dealfirstcard("dealer-one", dealerscore);
  checkscores(false);
}

function dealfirstcard(id, score) {
  const random = Math.floor(Math.random() * deck.length);
  const card = deck[random];
  const value = card.replace(/C|D|S|H/, "");
  const location = document.getElementById(id);
  location.setAttribute("src", `../cards-svg/${card}.svg`);
  countcard(value);
  updatescore(value, score);
}

function countcard(value) {
  switch (value) {
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
      count++;
      break;
    case "10":
    case "J":
    case "Q":
    case "K":
    case "A":
      count--;
      break;
  }
}

function updatescore(value, score) {
  switch (value) {
    case "A":
      value = 11;
      break;
    case "K":
    case "Q":
    case "J":
      value = 10;
      break;
    default:
      value = parseInt(value);
  }
  if (score == playerscore) {
    playerscore.innerHTML = parseInt(playerscore.innerHTML) + value;
  } else {
    dealerscore.innerHTML = parseInt(dealerscore.innerHTML) + value;
  }
}

function checkscores(end) {
  const pscore = parseInt(playerscore.innerHTML);
  const dscore = parseInt(dealerscore.innerHTML);
  if (pscore == 21 || dscore > 21) {
    alert("You win this hand!");
    return;
  }
  if (dscore == 21 || pscore > 21) {
    alert("You lose this hand!");
    return;
  }
  if (end) {
    if (dscore > pscore) {
      alert("You lose this hand!");
      return;
    }
    if (pscore > dscore) {
      alert("You win this hand!");
      return;
    }
    alert("It's a tie!");
  }
}

function hit() {
  const random = Math.floor(Math.random() * deck.length);
  const card = deck[random];
  const value = card.replace(/C|D|S|H/, "");
  playerhand.innerHTML += `<img src=../cards-svg/${card}.svg>`;
  countcard(value);
  updatescore(value, playerscore);
  checkscores(false);
}

function stand() {
  const random = Math.floor(Math.random() * deck.length);
  const card = deck[random];
  const value = card.replace(/C|D|S|H/, "");
  document
    .getElementById("dealer-two")
    .setAttribute("src", `../cards-svg/${card}.svg`);
  countcard(value);
  updatescore(value, dealerscore);
  if (parseInt(dealerscore.innerHTML) < 17) dealerdraw();
  else checkscores(true);
}

function dealerdraw() {
  const random = Math.floor(Math.random() * deck.length);
  const card = deck[random];
  const value = card.replace(/C|D|S|H/, "");
  dealerhand.innerHTML += `<img src=../cards-svg/${card}.svg>`;
  countcard(value);
  updatescore(value, dealerscore);
  if (parseInt(dealerscore.innerHTML) < 17) dealerdraw();
  else checkscores(true);
}

function reset() {
  count = 0;
  playerscore.innerHTML = 0;
  dealerscore.innerHTML = 0;
  playerhand.innerHTML = `<img id="player-one" src="../cards-svg/Joker1.svg" />
    <img id="player-two" src="../cards-svg/Joker1.svg" />`;
  dealerhand.innerHTML = `<img id="dealer-one" src="../cards-svg/Joker1.svg" />
      <img id="dealer-two" src="../cards-svg/Joker1.svg" />`;
  hitbutton.setAttribute("style", "display: none;");
  standbutton.setAttribute("style", "display: none;");
}

function checkcount() {
  const guess = document.getElementById("count-guess").value;
  if (Number(guess) === count) alert("You are correct!");
  else alert(`You are incorrect. The count is actually ${count}`);
}
