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
    const slideDiv = document.createElement('div');
    slideDiv.className = "mySlides fade"
    const p = document.createElement('p');
    p.innerHTML = slide;
    slideDiv.appendChild(p);
    
    // add slide to slideshow
    slideshow.appendChild(slideDiv);
  }
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  console.log(slides.length);
 
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  slides[slideIndex-1].style.display = "block";
  
}

var slideIndex = 1
main()