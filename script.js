// INITIALIZE
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
window.onload = function () {
  setTimeout(function () {
    document.getElementById("fadein").remove();
  }, 1000);
};

// HEADER ANIMATION
gsap.utils.toArray(".slide-up-out").forEach((text, i) => {
  gsap.to(text, {
    scrollTrigger: {
      trigger: text,
      start: "top 10%",
      end: "top top",
      scrub: 1,
    },
    y: "-10vh",
    opacity: 0,
  });
});
const tl = gsap.timeline();
tl.from("#header-video", {
  height: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 1,
}).to("#header-video", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    scrub: 1,
  },
  scale: 1,
  ease: "power1.out",
  transformOrigin: "bottom center"
});

gsap.to("#hero-header", {
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    scrub: true,
    pin: "#hero-header",
    pinSpacing: false,
    end: "bottom 50%"
  },
  opacity: 0,
  scale: 0.8,
  filter: "blur(10px)",
  ease: "power1.out"
});


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
headerText.from("#hero-header p span", {
  duration: 0.5,
  y: "100%",
  autoAlpha: 0,
  ease: Power3.out,
  stagger: 0.02,
  delay: 0.5, //
})
  .from("#hero-header path", {
    duration: 0.8,
    y: "110%",
    ease: Power4.out,
    stagger: 0.05,
    delay: 0.4,
  }, 0.2);

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
projects.forEach((project, i) => {
  ScrollTrigger.create({
    trigger: project, 
    start: "top center", 
    end: "bottom center", 
    onEnter: () => {
      projectTitle.textContent = project.dataset.title;
    },
    onEnterBack: () => {
      projectTitle.textContent = project.dataset.title;
    },
  });
});

// PROJECT IMAGES PARALLAX
// gsap.utils.toArray('#projects .project-img').forEach(container => {
//   const img = container.querySelector('img');

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: container,
//       scrub: true,
//       pin: false,
//     }
//   }); 
//   tl.fromTo(img, {
//     yPercent: -15,
//     ease: 'none'
//   }, {
//     yPercent: 15,
//     ease: 'none'
//   });
// });

// gsap.set(".project-img", { zIndex: (i, target, targets) => targets.length - i });
// let projectImages = gsap.utils.toArray('.project-img').slice(0, -1);
// projectImages.forEach((image, i) => {
//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#projects",
//       start: () => "top -" + (window.innerHeight * (i + 0.5)),
//       end: () => "+=" + window.innerHeight,
//       scrub: true,
//       toggleActions: "play none reverse none",
//       invalidateOnRefresh: true,
//     }
//   })
//   tl
//     .to(image, { height: 0 })
//     ;
// });


// gsap.set(".project-info", { zIndex: (i, target, targets) => targets.length - i });
// let projectInfo = gsap.utils.toArray('.project-info');
// projectInfo.forEach((text, i) => {
//   let tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#projects",
//       start: () => "top -" + (window.innerHeight * i),
//       end: () => "+=" + window.innerHeight,
//       scrub: true,
//       toggleActions: "play none reverse none",
//       invalidateOnRefresh: true,
//     }
//   })
//   tl
//     .to(text, { duration: 0.33, opacity: 1})
//     .to(text, {opacity: 0, y: "-50%" }, 0.66);
// });


// ScrollTrigger.create({
//   trigger: "#projects",
//   scrub: true,
//   pin: true,
//   start: () => "top top",
//   end: () => "+=" + ((projectImages.length + 1) * window.innerHeight),
//   invalidateOnRefresh: true,

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
