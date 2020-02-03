var slideIndex = 1;
showSlides(slideIndex);

let requestURL = '/cards.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var cards = request.response;
  for (card of cards["prompts"]) {
    card = resolveCard(card);
  }
  var deck = shuffle(cards["prompts"]);
  console.log(deck.length);
  setupDeck(deck);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function resolveCard(cardText) {
  // Cards may hae {text a|text b} - choose one of the options and remove the extras
  //console.log(cardText)
  let matches = cardText.matchAll(/{[^}]+}/gm);
  for (match of matches) {
    let options = match.toString().replace(/[{}]/gi, "");
    options = options.split("|");
    let choice = options[Math.floor(Math.random() * options.length)].toString();
    cardText = cardText.replace(match, choice);
  }
  console.log(cardText);
  if (cardText.includes("{")||cardText.includes("}")) {
    console.warn("Extraneous {}s found! " + cardText);
  }
  
  return cardText;
}

function setupDeck(deck) {
  
}

// <- -> controls
function drawCard(n) {
  showSlides(slideIndex += n);
}

// Image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
 
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  slides[slideIndex-1].style.display = "block";
  
}