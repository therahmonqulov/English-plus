// menu
const btn = document.getElementById("menuBtn");
const menu = document.getElementById("mobHeader");

btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    menu.classList.toggle("active");
    
    // Body scroll ni bloklash yoki yoqish
    if (menu.classList.contains("active")) {
        // Menyu aktiv bo'lsa scroll ni bloklash
        document.body.style.overflow = "hidden";
    } else {
        // Menyu yopiq bo'lsa scroll ni qayta yoqish
        document.body.style.overflow = "";
    }
});

// 
const slider = document.getElementById('newsSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentPosition = 0;
const cardWidth = 360;
const gap = 40;
const moveBy = cardWidth + gap;

// Har safar o‘lchamni qayta hisoblash uchun funksiya
function getVisibleCardsCount() {
    const containerWidth = document.querySelector('.news-grid').offsetWidth;
    // taxminan qancha card sig‘ishi mumkin
    return Math.floor(containerWidth / moveBy) || 1;
}

function updateSliderPosition() {
    slider.style.transform = `translateX(${currentPosition}px)`;
}

function updateButtons() {
    const cards = document.querySelectorAll('.news-card');
    const totalCards = cards.length;
    const visibleCount = getVisibleCardsCount();

    // Maksimal chapga surish masofasi
    const maxPosition = -((totalCards - visibleCount) * moveBy);

    // Agar oxiriga yetgan bo‘lsa
    if (currentPosition <= maxPosition) {
        currentPosition = maxPosition;
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.4';
        nextBtn.style.cursor = 'not-allowed';
    } else {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }

    // Agar boshida bo‘lsa
    if (currentPosition >= 0) {
        currentPosition = 0;
        prevBtn.disabled = true;
        prevBtn.style.opacity = '0.4';
        prevBtn.style.cursor = 'not-allowed';
    } else {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
    }

    updateSliderPosition();
}

// Next tugmasi
nextBtn.addEventListener('click', () => {
    if (nextBtn.disabled) return;

    const cards = document.querySelectorAll('.news-card');
    const visibleCount = getVisibleCardsCount();
    const maxPosition = -((cards.length - visibleCount) * moveBy);

    if (currentPosition > maxPosition) {
        currentPosition -= moveBy;
        if (currentPosition < maxPosition) {
            currentPosition = maxPosition;
        }
        updateButtons();
    }
});

// Prev tugmasi
prevBtn.addEventListener('click', () => {
    if (prevBtn.disabled) return;

    if (currentPosition < 0) {
        currentPosition += moveBy;
        if (currentPosition > 0) {
            currentPosition = 0;
        }
        updateButtons();
    }
});

// Yangi card qo‘shilganda yoki o‘lcham o‘zgarganda tugmalarni yangilash
function refreshOnChange() {
    updateButtons();
}

// Oyna o‘lchami o‘zgarganda qayta hisoblash
window.addEventListener('resize', refreshOnChange);

// Dastlabki holatni o‘rnatish
setTimeout(updateButtons, 100);

// faq
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