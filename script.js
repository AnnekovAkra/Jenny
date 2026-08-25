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
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ЛОГИКА ФОТОКАРУСЕЛИ ОТЗЫВОВ ---
    const wrapper = document.getElementById('reviewsWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.review-slide');
    
    let currentIndex = 0;

    if (wrapper && prevBtn && nextBtn && slides.length > 0) {
        function updateSlider() {
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Возвращаемся в начало карусели
            }
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = slides.length - 1; // Переходим к последнему снимку
            }
            updateSlider();
        });
    }

    // --- 2. ЛОГИКА LIGHTBOX (УВЕЛИЧЕНИЕ ФОТО ПРИ КЛИКЕ) ---
    const modal = document.getElementById('lightboxModal');
    const modalImg = document.getElementById('lightboxTargetImg');
    const captionText = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('lightboxClose');
    const photoCards = document.querySelectorAll('.review-photo-card');

    if (modal && modalImg && photoCards.length > 0) {
        photoCards.forEach(card => {
            card.addEventListener('click', function() {
                const imgAsset = this.querySelector('.review-img-asset');
                const infoBlock = this.querySelector('.review-photo-info h4');
                
                if (imgAsset) {
                    modal.style.display = "block";
                    modalImg.src = imgAsset.src; // Передаем ссылку на картинку во всплывающее окно
                    if (infoBlock) {
                        captionText.innerHTML = infoBlock.innerHTML; // Передаем подпись
                    }
                }
            });
        });

        // Функция закрытия окна при клике на крестик
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });

        // Функция закрытия окна при клике на любое темное пространство фона
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target === closeBtn) {
                modal.style.display = "none";
            }
        });
    }

    // Здесь может продолжаться ваш остальной код (параллакс букв, отправка формы лидов и т.д.)
});
