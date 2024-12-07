gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({
  duration: 1.5, // Adjust the duration for the smoothness of the scroll
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing function
  smooth: true,
});

// Function to synchronize Lenis with ScrollTrigger
function raf(time) {
  lenis.raf(time); // Update Lenis scroll position
  ScrollTrigger.update(); // Refresh ScrollTrigger
  requestAnimationFrame(raf); // Continue the animation frame loop
}

requestAnimationFrame(raf); // Start the loop

function togglemenu() {
  var x = document.getElementById("nav");
  if (x.className === "nav") {
    x.className += " nav--open";
  } else {
    x.className = "nav";
  }
  var element = document.getElementById("menu-toggle");
  element.classList.toggle("menu-toggle--open");
}

window.onload = function () {
  setTimeout(function () {
    document.getElementById("fadein").remove();
  }, 1000);
};

function handleButtonClick(event) {
  const button = event.target;
  const card = button.parentElement.parentElement;
  const cards = document.querySelectorAll('.accordeon-card');
  const buttons = document.querySelectorAll('.accordeon-content a')

  // Remove the 'active' class from all cards
  cards.forEach((c) => c.classList.remove('active'));


  // Add the 'active' class to the clicked card
  card.classList.add('active');
  setTimeout(() => { button.innerHTML = 'See Details'; },
    500);

  buttons.forEach((b) => {
    if (b !== button && b.innerHTML === 'See Details') {
      b.innerHTML = '+'
    }
  });
}


const cards = document.querySelectorAll('.features-bloc');

cards.forEach((card) => {
  card.addEventListener('click', () => {
    cards.forEach((otherCard) => {
      otherCard.classList.remove('active');
    });

    card.classList.add('active');
  });
});

var photoContainer = document.querySelector('.caroussel .img-container');
var photoWidth = document.querySelector('.caroussel .img-container img').offsetWidth + 10;

function scrollToPhoto(index) {
  var scrollAmount = photoWidth * index;
  photoContainer.style.transform = 'translateX(-' + scrollAmount + 'px)';
}

cards.forEach(function (button, index) {
  button.addEventListener('click', function () {
    scrollToPhoto(index);
  });
});


const questions = document.querySelectorAll('.question-bloc')
const questionContents = document.querySelectorAll('.question-content .answer')

questions.forEach((question) => {
  question.addEventListener('click', () => {
    const questionAnswer = question.querySelector('.answer');
    if (question.classList.contains('active')) {
      question.classList.remove('active');
      questionAnswer.style.height = '0px';
    } else {
      questions.forEach((otherQuestions) => {
        otherQuestions.classList.remove('active');
      });
      question.classList.add('active');
      questionContents.forEach((content) => {
        content.style.height = '0px';
      });
      questionAnswer.style.height = questionAnswer.scrollHeight + 'px';
    }
  })
})
