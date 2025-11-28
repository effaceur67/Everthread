const carousel = document.getElementById('brands-carousel');
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');


const scrollAmount = 950; 

arrowRight.addEventListener('click', () => {
    carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

arrowLeft.addEventListener('click', () => {
    carousel.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});