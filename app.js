const fruits = [
  { name: "apple", symbol: "🍎" },
  { name: "banana", symbol: "🍌" },
  { name: "cherry", symbol: "🍒" },
  { name: "coconut", symbol: "🥥" },
  { name: "grapes", symbol: "🍇" },
  { name: "mango", symbol: "🥭" },
  { name: "pineapple", symbol: "🍍" },
  { name: "watermelon", symbol: "🍉" },
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Make the deck: each fruit twice
let deck = [...fruits, ...fruits];
deck = shuffle(deck);

function buildBoard() {
  const board = document.getElementById("board");
  board.innerHTML = ""; 
  deck.forEach((fruit, index) => {
  const card = document.createElement("button");
  card.type = "button";
  card.classList.add("card");
  // give each card its index so we can find it later
  card.dataset.index = index;
  // labels
  card.setAttribute("aria-label", `Card ${index + 1}, face down`);
  card.textContent = "";
  board.appendChild(card);
});

}
buildBoard();

let moves = 0;
let flippedCards = [];

board.addEventListener("click", function(event) {
  let card = event.target;

  if (!card.classList.contains("card")) return;
  if (card.classList.contains("flipped")) return;

  let index = card.dataset.index;
  let fruit = deck[index];
  card.textContent = fruit.symbol;
  card.classList.add("flipped");
  card.setAttribute("aria-label", "Card " + (parseInt(index) + 1) + ", " + fruit.name);

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById("moves").textContent = moves;

    let fruit1 = deck[flippedCards[0].dataset.index];
    let fruit2 = deck[flippedCards[1].dataset.index];

    if (fruit1.name === fruit2.name) {
      // they match
      flippedCards[0].classList.add("matched");
      flippedCards[1].classList.add("matched");
      flippedCards[0].disabled = true;
      flippedCards[1].disabled = true;
      document.getElementById("status").textContent = "That's a pair!";
    }

    flippedCards = [];
  }
});
