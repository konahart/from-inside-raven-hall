async function main() {
  await loadGame()
  showSlides(slideIndex)
}

async function loadGame() {
  const resp = await fetch('/cards.json')
  const gameSlides = await resp.json()
  addSlides(gameSlides)
}

// <- -> controls
function nextSlide(n) {
  showSlides(slideIndex += n);
}

// Image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function addSlides(slides) {
  var slideshow = document.getElementsByClassName("slideshow")[0];
  for (slide of slides) {
    // create slide
    const slideDiv = document.createElement('div')
    slideDiv.className = "mySlides fade"
    if (slide["type"] == "ritual") {
      const div = document.createElement('div')
      div.textContent = "Ritual"
      div.className = "ritual-header"
      slideDiv.appendChild(div)
    }
    for (para of slide["text"]) {
      const p = document.createElement('p')
      p.innerHTML = para
      p.className = "fadeup glow " + slide["type"]
      slideDiv.appendChild(p)
    }
    
    // add slide to slideshow
    slideshow.appendChild(slideDiv)
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
  togglePrev(slideIndex)
  toggleNext(slideIndex, slides.length)
  
  slides[slideIndex-1].style.display = "block";
  
}

function togglePrev(slideIndex) {
  var prev = document.getElementsByClassName("prev")[0];
  if (slideIndex == 1) {
    prev.style.display = "none"
  } else {
    prev.style.display = "block"
  }
}

function toggleNext(slideIndex, slideCount) {
  var next = document.getElementsByClassName("next")[0];
  if (slideIndex == slideCount) {
    next.style.display = "none"
  } else {
    next.style.display = "block"
  }
}

function checkKey(e) {
    e = e || window.event;

    if (e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
        nextSlide(-1)
    }
    else if (e.key == 'ArrowRight' || e.key == 'ArrowDown' || e.key == " ") {
        nextSlide(1)
    }
}

var slideIndex = 1
document.onkeydown = checkKey
main()