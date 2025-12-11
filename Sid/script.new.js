/* hambuger menu */



/* =======================
   FAQ Toggle (Improved)
======================= */

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {

        const answer = question.nextElementSibling;

        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(a => {
            if (a !== answer) a.style.display = 'none';
        });

        // Toggle selected answer
        answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    });
});

// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}
