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
let waiting = false;

board.addEventListener("click", function(event) {
  let card = event.target;
  if (!card.classList.contains("card")) return;
  if (card.classList.contains("flipped")) return;
  if (waiting) return;

  let index = card.dataset.index;
  let fruit = deck[index];

  // flip card
  card.textContent = fruit.symbol;
  card.classList.add("flipped");
  card.setAttribute("aria-label", "Card " + (parseInt(index) + 1) + ", " + fruit.name);

  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById("moves").textContent = moves;

    let card1 = flippedCards[0];
    let card2 = flippedCards[1];
    let fruit1 = deck[card1.dataset.index];
    let fruit2 = deck[card2.dataset.index];

    if (fruit1.name === fruit2.name) {
      // they match
      card1.classList.add("matched");
      card2.classList.add("matched");
      card1.disabled = true;
      card2.disabled = true;
      document.getElementById("status").textContent = "That's a pair!";
      flippedCards = [];

      // check if all cards are matched
      let matchedCount = document.querySelectorAll(".card.matched").length;
      if (matchedCount === deck.length) {
        let status = document.getElementById("status");
        status.textContent = "You found all the pairs in " + moves + " moves!";
        status.classList.add("you-won");
      }
    } else {
      // not a match
      document.getElementById("status").textContent = "Not a pair. Try again.";
      waiting = true;
      setTimeout(function() {
        card1.textContent = "";
        card2.textContent = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.setAttribute("aria-label", "Card " + (parseInt(card1.dataset.index) + 1) + ", face down");
        card2.setAttribute("aria-label", "Card " + (parseInt(card2.dataset.index) + 1) + ", face down");
        flippedCards = [];
        waiting = false;
      }, 1000);
    }
  }
});
