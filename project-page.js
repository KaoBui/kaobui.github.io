// INITIALIZE
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import Swiper from 'swiper';
import 'swiper/css';


gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

const lenis = new Lenis({
  duration: 1.5,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});
function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.to("#project-header", {
    scrollTrigger: {
        trigger: "#project-top",
        start: "top top",
        scrub: true,
        pin: "#project-header",
        pinSpacing: false,
    },
    opacity: 0,
    scale: 0.8,
    filter: "blur(10px)",
    ease: "power1.out"
});

gsap.utils.toArray(".floating-img").forEach((img) => {
    gsap.fromTo(
        img,
        { yPercent: -5 },
        {
            yPercent: 5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                scrub: true,
            }
        }
    );
});

function wrapWordsForAll(selector, wordClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        const words = element.textContent.trim().split(/\s+/);
        element.innerHTML = "";

        words.forEach((word, index) => {
            const span = document.createElement("span");
            span.className = wordClass; // Apply the class to each span
            span.textContent = word; // Set the text to the current word
            element.appendChild(span);

            // Add a space after each word except the last one
            if (index < words.length - 1) {
                element.appendChild(document.createTextNode(" "));
            }
        });
    });
}

wrapWordsForAll(".split-word", "word");
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".split-word").forEach((element) => {
    gsap.fromTo(
        element.querySelectorAll(".word"),
        { y: 50, opacity: 0 }, // Start position: below and invisible
        {
            y: 0,                 // End position: original position
            opacity: 1,           // Fade in
            stagger: 0.1,         // Animate each word with a small delay
            ease: "power3.out",   // Smooth easing for the slide
            duration: 0.8,          // Animation duration for each word
            scrollTrigger: {
                trigger: element, // Trigger for each split text element
                start: "top 80%", // Start animation when element enters viewport
                toggleActions: "play none none none", // Play animation once
            },
        }
    );
});

// CAROUSSEL
const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 60,
    centeredSlides: true,
    slidesPerView: 1.6,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",}
});



// IMAGE SLIDER
const slider = document.getElementById('img-slider');
const before = document.getElementById('before-image');
const beforeImage = before.getElementsByTagName('img')[0];
const resizer = document.getElementById('resizer');
let active = false;
//Sort overflow out for Overlay Image
document.addEventListener("DOMContentLoaded", function () {
  let width = slider.offsetWidth;
  console.log(width);
  beforeImage.style.width = width + 'px';
});
//Adjust width of image on resize 
window.addEventListener('resize', function () {
  let width = slider.offsetWidth;
  console.log(width);
  beforeImage.style.width = width + 'px';
})
resizer.addEventListener('mousedown', function () {
  active = true;
  resizer.classList.add('resize');

});
document.body.addEventListener('mouseup', function () {
  active = false;
  resizer.classList.remove('resize');
});
document.body.addEventListener('mouseleave', function () {
  active = false;
  resizer.classList.remove('resize');
});
document.body.addEventListener('mousemove', function (e) {
  if (!active) return;
  let x = e.pageX;
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});
resizer.addEventListener('touchstart', function () {
  active = true;
  resizer.classList.add('resize');
});
document.body.addEventListener('touchend', function () {
  active = false;
  resizer.classList.remove('resize');
});
document.body.addEventListener('touchcancel', function () {
  active = false;
  resizer.classList.remove('resize');
});

document.body.addEventListener('touchmove', function (e) {
  if (!active) return;
  let x;

  let i;
  for (i = 0; i < e.changedTouches.length; i++) {
    x = e.changedTouches[i].pageX;
  }

  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});
function slideIt(x) {
  let transform = Math.max(0, (Math.min(x, slider.offsetWidth)));
  before.style.width = transform + "px";
  resizer.style.left = transform - 0 + "px";
}
//stop divs being selected.
function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

// VIDEO PLAYER
const video = document.getElementById('myVideo');
video.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});