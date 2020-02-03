var slideIndex = 1;
showSlides(slideIndex);

let requestURL = '/cards.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var cards = request.response;
  let resolvedCards = [];
  for (card of cards["prompts"]) {
    card = resolveText(card);
    if (card != null) {
      resolvedCards.push(card);
    }
  }
  cards["prompts"] = resolvedCards;
  console.log(cards["prompts"][0]);
  cards["prompts"] = shuffle(cards["prompts"]);
  console.log(cards["prompts"][0]);
  setupDeck(cards);
  showDeck(cards);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function resolveText(text) {
  // Text may contain {text a|text b} - choose one of the options and remove the extras
  let matches = text.matchAll(/{[^}]+}/gm);
  for (match of matches) {
    let options = match.toString().replace(/[{}]/gi, "");
    options = options.split("|");
    let choice = randomFromArray(options).toString();
    text = text.replace(match, choice);
  }
  if (text.includes("{")||text.includes("}")) {
    console.warn("Extraneous {}s found! \"" + text + "\"");
    return null;
  }
  return text;
}

function setupDeck(cards) {
  let promptsPerAct = cards["prompts"].length / cards["rituals"].length;
  let i = 1;
  for (let value of Object.values(cards["rituals"])) {
    let ritualPrompt = "Ritual: " + value;
    console.log(ritualPrompt);
    
    cards["prompts"].splice(i * promptsPerAct, 0, ritualPrompt);
    ++i;
  }
}

// <- -> controls
function drawCard(n) {
  showSlides(slideIndex += n);
}

// Image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showDeck(cards) {
  var slideshow = document.getElementsByClassName("slideshow")[0];
  for (card of cards["prompts"]) {
    // create slide
    const slide = document.createElement('div');
    slide.className = "mySlides fade"
    const p = document.createElement('p');
    p.textContent = card;
    slide.appendChild(p);
    
    // add slide to slideshow
    slideshow.appendChild(slide);
  }
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