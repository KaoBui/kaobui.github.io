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

window.onload = function () {
  setTimeout(function () {
    document.getElementById("fadein").remove();
  }, 1000);
};

gsap.utils.toArray(".slide-up-out").forEach((text, i) => {
  gsap.to(text, {
    scrollTrigger: {
      trigger: text,
      start: "top 10%",
      end : "top top",
      scrub: 1,
    },
    y: "-10vh",
    opacity: 0,
  });
});

const splitTextElements = document.querySelectorAll(".split-text");

splitTextElements.forEach((textElement) => {
  const text = textElement.textContent;

  textElement.innerHTML = text
    .split("")
    .map((char) => `<span>${char === " " ? "&nbsp;" : char}</span>`)
    .join("");
});

let tl = gsap.timeline();
tl.from(".split-text span", {
  duration: 1,
  y: 150,
  autoAlpha: 0,
  ease: Power3.out,
  stagger: 0.1,
  delay: 0.5,
});

// IMAGE SLIDER
const slider = document.getElementById('img-slider');
const before = document.getElementById('before-image');
const beforeImage = before.getElementsByTagName('img')[0];
const resizer = document.getElementById('resizer');

let active = false;

//Sort overflow out for Overlay Image
document.addEventListener("DOMContentLoaded", function() {
  let width = slider.offsetWidth;
  console.log(width);
  beforeImage.style.width = width + 'px';
});

//Adjust width of image on resize 
window.addEventListener('resize', function() {
  let width = slider.offsetWidth;
  console.log(width);
  beforeImage.style.width = width + 'px';
})

resizer.addEventListener('mousedown',function(){
  active = true;
 resizer.classList.add('resize');

});

document.body.addEventListener('mouseup',function(){
  active = false;
 resizer.classList.remove('resize');
});

document.body.addEventListener('mouseleave', function() {
  active = false;
  resizer.classList.remove('resize');
});

document.body.addEventListener('mousemove',function(e){
  if (!active) return;
  let x = e.pageX;
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

resizer.addEventListener('touchstart',function(){
  active = true;
  resizer.classList.add('resize');
});

document.body.addEventListener('touchend',function(){
  active = false;
  resizer.classList.remove('resize');
});

document.body.addEventListener('touchcancel',function(){
  active = false;
  resizer.classList.remove('resize');
});

//calculation for dragging on touch devices
document.body.addEventListener('touchmove',function(e){
  if (!active) return;
  let x;
  
  let i;
  for (i=0; i < e.changedTouches.length; i++) {
  x = e.changedTouches[i].pageX; 
  }
  
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

function slideIt(x){
    let transform = Math.max(0,(Math.min(x,slider.offsetWidth)));
    before.style.width = transform+"px";
    resizer.style.left = transform-0+"px";
}

//stop divs being selected.
function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}

