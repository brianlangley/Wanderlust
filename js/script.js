document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('nav');
    const hero = document.querySelector('#hero');
    const cards = document.querySelectorAll('.card');
    const footer = document.querySelector('footer');

    // GSAP
    gsap.from(nav, {
        opacity: 0, duration: 2, delay: 0, y: -30,
    });
    gsap.from(hero, {
        opacity: 0, duration: 3, delay: 0.5, x: -30,
    });
    gsap.from(footer, {
        opacity: 0, duration: 3, delay: 0.5, y: 30,
    });
    gsap.from(cards, {
        opacity: 0, duration: 3, delay: 0.5, y: 30,
    });
});