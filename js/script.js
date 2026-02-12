function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const btn = element.querySelector('.toggle-btn');

    // Close all other answers
    document.querySelectorAll('.faq-answer').forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
        }
    });

    document.querySelectorAll('.toggle-btn').forEach(item => {
        if (item !== btn) {
            item.textContent = '+';
        }
    });

    // Toggle current answer
    answer.classList.toggle('active');
    btn.textContent = answer.classList.contains('active') ? '-' : '+';
}