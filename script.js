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
      markers: true,
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