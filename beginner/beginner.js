const cardbox = document.getElementById("card-container");
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
let tempdeck = deck.map((el) => el);
let count = 0;
function drawbutton() {
  cardbox.innerHTML = "";
  if (tempdeck.length < 5) shuffle();
  drawcard();
  drawcard();
  drawcard();
  drawcard();
  drawcard();
}

function drawcard() {
  const random = Math.floor(Math.random() * tempdeck.length);
  const card = tempdeck[random];
  tempdeck.splice(random, 1);
  const value = card.replace(/C|D|S|H/, "");
  cardbox.innerHTML =
    cardbox.innerHTML + '<img src="../cards-svg/' + card + '.svg">';
  countcard(value);
}

function countcard(card) {
  switch (card) {
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

function checkcount() {
  const guess = document.getElementById("count-guess").value;
  if (Number(guess) === count) alert("You are correct!");
  else alert(`You are incorrect. The count is actually ${count}`);
}

function shuffle() {
  tempdeck = deck.map((el) => el);
}

function reset() {
  cardbox.innerHTML = "";
  count = 0;
  shuffle();
  alert("Everything reset!");
}
