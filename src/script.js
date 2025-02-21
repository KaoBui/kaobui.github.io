// INITIALIZE
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger);
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


// INTRO ANIMATION
document.addEventListener('DOMContentLoaded', () => {
  const intro = gsap.timeline();
  const counter = document.querySelector('.counter');
  const loader = document.querySelector('.loader');
  const videoWrapper = document.querySelector('.video-wrapper');
  intro
    .to(counter, {
      innerText: 100,
      duration: 3,
      snap: { innerText: 2 },
      onUpdate: () => counter.textContent = `${Math.round(counter.innerText)}`,
      ease: "power3.inOut",
      onComplete: startMaskAnimation,
    })
    .to(loader, {
      y: "100vh",
      duration: 1.5,
      ease: "power4.in",
      delay: "-0.5",
    });

  function startMaskAnimation() {
    let loader = document.querySelector(".loader");
    let start = 0; // Start value for --c
    let end = 90; // End value for --c
    let duration = 1500; // Animation time in milliseconds

    let startTime = performance.now();

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animateMask(time) {
      let elapsed = time - startTime;
      let progress = Math.min(elapsed / duration, 1); // Normalize progress from 0 to 1
      let easedProgress = easeInOutQuad(progress); // Apply easing function

      let currentC = start + (end - start) * easedProgress;
      loader.style.setProperty("--c", currentC + "%");

      if (progress < 1) {
        requestAnimationFrame(animateMask);
      }
    }

    requestAnimationFrame(animateMask);
  }
});

// HEADER ANIMATION
const splitTextElements = document.querySelectorAll(".split-text");
splitTextElements.forEach((textElement) => {
  const text = textElement.textContent;
  textElement.innerHTML = text
    .split("")
    .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
    .join("");
});

// HEADER ENTRANCE TEXT
let headerText = gsap.timeline();
headerText.from("#hero-title svg path", {
  duration: 0.5,
  y: "100%",
  autoAlpha: 0,
  ease: Power3.out,
  stagger: 0.04,
  delay: 3.5, //
});

// PROJECT LIST
gsap.fromTo(
  "#project-aside",
  {
    autoAlpha: 0,
    filter: "blur(10px)",
  }, // Start fully transparent and hidden
  {
    autoAlpha: 1,
    filter: "blur(0px)", // Fade in
    scrollTrigger: {
      trigger: "#project-aside",
      start: "top 90%", // Trigger when the top of #project-aside reaches 50% of the viewport height
      toggleActions: "play none none none", // Play the fade-in animation once
      scrub: 1,
      end: "top 50%"
    },
  }
);
gsap.to("#project-aside", {
  scrollTrigger: {
    trigger: "#project-aside",
    start: "bottom bottom",
    scrub: 1,
    endTrigger: "#project-col", // Reference the longer column
    end: "bottom bottom",
    pin: "#project-aside",
    pinSpacing: false,
  },
  ease: "power1.out"
});

const projects = gsap.utils.toArray(".project");
const projectTitle = document.getElementById("project-title");

// CHANGING PROJECT TITLE
// projects.forEach((project, i) => {
//   ScrollTrigger.create({
//     trigger: project,
//     start: "top center",
//     end: "bottom center",
//     onEnter: () => {
//       projectTitle.textContent = project.dataset.title;
//     },
//     onEnterBack: () => {
//       projectTitle.textContent = project.dataset.title;
//     },
//   });
// });


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
