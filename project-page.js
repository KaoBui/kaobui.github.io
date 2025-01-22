gsap.registerPlugin(ScrollTrigger);

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
});
