// FAQ toggle
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(q => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const isOpen = answer.style.display === 'block';
    document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
    if (!isOpen) answer.style.display = 'block';
  });
});

// Form handling (feedback + contact)
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.reset();
    const thankYou = form.parentElement.querySelector('.thank-you');
    if (thankYou) {
      thankYou.style.display = 'block';
      setTimeout(() => (thankYou.style.display = 'none'), 3000);
    }
  });
});
