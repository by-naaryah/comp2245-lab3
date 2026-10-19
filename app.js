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

    // labels
    card.setAttribute("aria-label", `Card ${index + 1}, face down`);

    //no emoji yet
    card.textContent = "";
    board.appendChild(card);
  });
}
buildBoard();
