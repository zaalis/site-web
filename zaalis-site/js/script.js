function toggleMenu(el) {
    el.classList.toggle("active");
    el.classList.toggle("not-active");

    const menu = document.getElementById("burgerMenu");
    menu.classList.toggle("show");
}

const canvas = document.querySelector(".stars");
const ctx = canvas.getContext("2d");
let width, height;
let stars = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function initStars(count = 150) {
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.5,
            d: Math.random() * 1,
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
    });
}

function moveStars() {
    stars.forEach((star) => {
        star.y += star.d;
        if (star.y > height) star.y = 0;
    });
}

function animate() {
    drawStars();
    moveStars();
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    resize();
    initStars();
});

// Initialize stars if canvas exists
if (canvas) {
    resize();
    initStars();
    animate();
}

const revealElements = document.querySelectorAll(".reveal");
function handleScrollReveal() {
    const triggerBottom = window.innerHeight * 0.9;
    revealElements.forEach((el) => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.classList.add("visible");
        } else {
            el.classList.remove("visible");
        }
    });
}
window.addEventListener("scroll", handleScrollReveal);
window.addEventListener("load", handleScrollReveal);

/* Désélectionne tout si on clique sur la navbar (UX mobile propre) */
document.querySelector('header').addEventListener('click', () => {
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
});
