// INITIALIZE
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
  ease: "power3.out",
  stagger: 0.04,
  delay: 3.75, //
});

// FIXED HERO SECTION
gsap.to("#hero", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    pin: true,
    pinSpacing: false,
    scrub: true,
  },
  opacity: 0,
  scale: 0.8,
  filter: "blur(10px)",
  ease: "power1.out"
});

// FIXED PROJECT HEADER
ScrollTrigger.create({
  trigger: "#projects",
  start: "top top",
  endTrigger: "#project-img-col",
  end: "bottom bottom",
  pin: "#project-fixed-header",
  pinSpacing: false,
});

gsap.from("#project-list", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top top",
  },
  opacity: 0,
  ease: "power1.out"
});

// CHANGING PROJECT TITLE
const projectListItems = document.querySelectorAll(".project-index");
const projects = gsap.utils.toArray(".project");
const projectTitle = document.getElementById("project-title-content");

projects.forEach((project, i) => {
  ScrollTrigger.create({
    trigger: project,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      gsap.to(projectTitle, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          projectTitle.textContent = project.dataset.title;
          gsap.to(projectTitle, { opacity: 1, duration: 0.2 });
        }
      });

      projectListItems.forEach(item => item.classList.remove("active"));
      projectListItems[i].classList.add("active");
    },

    onEnterBack: () => {
      gsap.to(projectTitle, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          projectTitle.textContent = project.dataset.title;
          gsap.to(projectTitle, { opacity: 1, duration: 0.2 });
        }
      });

      projectListItems.forEach(item => item.classList.remove("active"));
      projectListItems[i].classList.add("active");
    },
  });
});

// TO REVEAL TEXT
const scrollText = document.querySelector(".scroll-text");

// Split into words AND spaces using regex
const wordsAndSpaces = scrollText.textContent.trim().split(/(\s+)/);
scrollText.innerHTML = wordsAndSpaces
  .map(part => {
    if (part.trim() === "") {
      return part;
    } else {
      return `<span class="word">${part}</span>`;
    }
  })
  .join("");

// Change text opacity
gsap.to(".scroll-text span", {
  opacity: 0,
  yPercent: -5,
  stagger: 0.3, // Delay between each character
  scrollTrigger: {
    trigger: ".scroll-text",
    start: "top -20%",
    end: "bottom botton",
    scrub: true,
  },
});


// Parallax text effect
gsap.to("#skills", {
  yPercent: 20,
  scrollTrigger: {
    trigger: "#skills",
    start: "top bottom",
    end: "bottom bottom",
    scrub: true,
  },
});

gsap.to(".stay-text", {
  scrollTrigger: {
    trigger: ".stay-text",
    start: "top top",
    end: "top -20%",
    scrub: true,
    markers: true
  },
  opacity: 0,
  filter: "blur(10px)",
});


// SKILL CARD ANIMATION
const cards = gsap.utils.toArray(".skill-card");

// Slide In (100 → 0)
gsap.fromTo(cards,
  { yPercent: 100 },
  {
    yPercent: 0,
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#skill-list",
      start: "top 90%",
      end: "bottom center",
      scrub: 1,
    }
  }
);

gsap.fromTo(cards,
  { yPercent: 0 },
  {
    yPercent: -80,
    stagger: -0.1,
    scrollTrigger: {
      trigger: "#skill-list",
      start: "bottom center",
      end: "bottom -20%",
      scrub: 1,
    }
  }
);

// FOOTER LOGO ENTRANCE
// let footerLogo = gsap.timeline();
// footerLogo.from("footer svg path", {
//   scrollTrigger: {
//     trigger: "footer",
//     start: "top 10%",
//     end: "top top",
//     scrub: true
//   },
//   yPercent: 85,
//   ease: "power2.out",
//   stagger: 0.02,
// });

// Create a GSAP timeline to animate both properties together
const bgTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: "footer", // Trigger when footer comes into view
    start: "bottom bottom", // Footer top reaches bottom of viewport
    toggleActions: "play reverse play reverse", // ✅ Reversible animation
    markers: true, // Debug – remove for production
  }
});

// Animate body background color and overlay opacity together
bgTimeline.to("body", {
  backgroundColor: "#080807",
  duration: 0.2,
  ease: "power2.out",
}, 0); // Start at time 0

bgTimeline.to(".texture-overlay", {
  opacity: 0,
  duration: 0.2,
  ease: "power2.out",
}, 0); // Start at same time

bgTimeline.from("footer svg path", {
  yPercent: 85,
  ease: "power2.out",
  stagger: 0.02,
}, 0);

bgTimeline.to("#contact-text", {
  opacity: 1,
  duration: 0.25,
  ease: "power2.out",
}, 0.2);