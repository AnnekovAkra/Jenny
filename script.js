document.addEventListener('DOMContentLoaded', () => {
            
    // 1. Мобильное меню (Бургер)
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const spans = burger.querySelectorAll('span');
            spans.forEach((span, idx) => {
                if (navLinks.classList.contains('open')) {
                    if(idx === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if(idx === 1) span.style.opacity = '0';
                    if(idx === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });

        // Закрытие мобильного меню при выборе пункта
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                burger.querySelectorAll('span').forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }

    // 2. Аккордеон (FAQ)
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Закрытие остальных активных вкладок
                faqItems.forEach(el => {
                    el.classList.remove('active');
                    const ans = el.querySelector('.faq-answer');
                    if(ans) ans.style.maxHeight = null;
                });
                
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });

    // 3. Обработка формы заявок
    const form = document.getElementById('leadForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            
            alert(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами по номеру ${phone} в ближайшее время.`);
            form.reset();
        });
    }

    // 4. Плавный скролл к секциям с учетом высоты закрепленной шапки
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Смещение под высоту navbar
                    behavior: 'smooth'
                });
            }
        });
    });
});
    // 5. Генерация случайных английских букв на фоне
    const lettersContainer = document.getElementById('bg-letters-container');
    
    if (lettersContainer) {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdeifghjklmnopqrstuvwxyz";
        // Количество букв на странице (можно увеличить или уменьшить)
        const letterCount = 45; 

        for (let i = 0; i < letterCount; i++) {
            const letterSpan = document.createElement('span');
            
            // Выбираем случайную букву
            const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            letterSpan.textContent = randomLetter;
            letterSpan.classList.add('bg-letter');

            // Случайные координаты по всей высоте и ширине экрана (в процентах)
            const randomTop = Math.random() * 100;
            const randomLeft = Math.random() * 95; // Немного отступаем от правого края

            // Случайный размер шрифта от 24px до 110px
            const randomSize = Math.floor(Math.random() * 86) + 24;

            // Случайный наклон буквы для естественности
            const randomRotation = Math.floor(Math.random() * 60) - 30; // от -30 до +30 градусов

            // Применяем стили
            letterSpan.style.top = `${randomTop}%`;
            letterSpan.style.left = `${randomLeft}%`;
            letterSpan.style.fontSize = `${randomSize}px`;
            letterSpan.style.transform = `rotate(${randomRotation}deg)`;

            // Добавляем на страницу
            lettersContainer.appendChild(letterSpan);
        }
    }
