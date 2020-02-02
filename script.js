var slideIndex = 1;
showSlides(slideIndex);

let requestURL = '/cards.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  const cards = request.response;
  var deck = shuffleDeck(cards);
  setupDeck(deck);
}

function shuffleDeck(cards) {
  
}

function resolveCard(cardText) {
  // Cards may hae {text a|text b} - choose one of the options and remove the extras
  let re = /{([^\|]+)(?:\|([^\|]+))?}/;
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