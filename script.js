document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ИНТЕРАКТИВНЫЙ ПАРАЛЛАКС БУКВ НА ФОНЕ ---
    const letters = document.querySelectorAll('.bg-letter');

    // Проверяем наличие мыши, чтобы не перегружать процессоры смартфонов
    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            letters.forEach((letter, index) => {
                // Разная скорость смещения для каждой парящей буквы
                const displacementFactor = (index + 1) * 12; 
                const offsetX = (mouseX - 0.5) * displacementFactor;
                const offsetY = (mouseY - 0.5) * displacementFactor;
                
                letter.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }

    // --- 2. ИНТЕРАКТИВНЫЙ СЛАЙДЕР ОТЗЫВОВ ---
    const wrapper = document.getElementById('reviewsWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.review-slide');
    
    let currentIndex = 0;

    function updateSlider() {
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Перемотка в начало
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 1; // Перемотка в конец
        }
        updateSlider();
    });

    // --- 3. ОБРАБОТКА И ВАЛИДАЦИЯ ФОРМЫ ЗАЯВОК ---
    const form = document.getElementById('leadForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name').value.trim();
        const phoneInput = document.getElementById('phone').value.trim();

        if (!nameInput || !phoneInput) {
            setFormMessage('Пожалуйста, заполните пустые поля.', '#FFEB3B');
            return;
        }

        const submitBtn = form.querySelector('.btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Обработка...';

        // Имитируем отправку данных на сервер
        setTimeout(() => {
            setFormMessage('Заявка принята! Мы скоро свяжемся с вами.', '#4CAF50');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Заказать разбор';
        }, 1500);
    });

    function setFormMessage(text, color) {
        formMessage.innerText = text;
        formMessage.style.color = color;
    }
});
