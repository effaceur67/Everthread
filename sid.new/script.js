document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    });
/* FAQ toggle */

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {

        const answer = question.nextElementSibling;

        // close all other answers
        document.querySelectorAll('.faq-answer').forEach(a => {
            if (a !== answer) a.style.display = 'none';
        });

        // toggle selected answer
        answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    });
});


/* form submission handling */
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();

        form.reset();

        const thankYou = form.parentElement.querySelector('.thank-you');
        if (thankYou) {
            thankYou.style.display = 'block';

            setTimeout(() => {
                thankYou.style.display = 'none';
            }, 3000);
        }
    });
});
