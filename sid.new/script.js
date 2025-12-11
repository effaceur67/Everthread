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


/* =======================
   Form Submission Handling
======================= */
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
