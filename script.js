// Анимация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const message = document.querySelector('.message');
    const button = document.querySelector('.button');
    
    // Плавное появление элементов
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // Анимация сердечка
    const heart = document.querySelector('.heart');
    if (heart) {
        setInterval(() => {
            heart.style.transform = 'scale(1.1)';
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
            }, 300);
        }, 2000);
    }
    
    // Вибрация при клике на кнопку (для мобильных)
    button.addEventListener('click', function(e) {
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // Вибрация 50ms
        }
        
        // Добавляем класс для анимации
        this.classList.add('clicking');
        setTimeout(() => {
            this.classList.remove('clicking');
        }, 300);
    });
    
    // Предотвращение масштабирования при двойном тапе
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});

// Оптимизация для мобильных устройств
if ('ontouchstart' in window) {
    document.documentElement.classList.add('touch-device');
}

// Определение типа устройства
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || 
           (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Добавляем CSS класс для touch-устройств
if (isMobileDevice()) {
    document.documentElement.classList.add('mobile-device');
}

// Загрузка текста из .txt файла
        fetch('fanfik.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Файл не найден');
                }
                return response.text();
            })
            .then(text => {
                const storyContent = document.getElementById('story-content');
                // Разбиваем текст на абзацы
                const paragraphs = text.split('\n\n').filter(p => p.trim() !== '');
                
                let html = '';
                paragraphs.forEach(paragraph => {
                    if (paragraph.trim() !== '') {
                        html += `<p>${paragraph.trim()}</p>`;
                    }
                });
                
                storyContent.innerHTML = html;
            })
            .catch(error => {
                document.getElementById('story-content').innerHTML = `
                    <div class="error">
                        <p>Ошибка загрузки текста: ${error.message}</p>
                        <p>Создайте файл "fanfik.txt" в той же папке</p>
                    </div>
                `;
            });