(function() {
    'use strict';

    // Конфигурация
    const config = {
        buttonClass: 'showy-watch-button',
        buttonStyle: `
            margin-left: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            padding: 12px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s ease;
        `,
        buttonHoverStyle: `
            background: rgba(255, 255, 255, 0.2);
            transform: scale(1.05);
        `,
        iconStyle: `
            width: 24px;
            height: 24px;
            fill: currentColor;
        `
    };

    // Главная функция инициализации
    function initPlugin() {
        // Слушатель изменения активности
        Lampa.Listener.follow('activity', {
            onAction: (event, activity) => {
                if (activity.component === 'full') {
                    addWatchButton(activity);
                }
            }
        });

        // Стили для кнопки
        addButtonStyles();
    }

    // Добавляем стили
    function addButtonStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .${config.buttonClass} {
                ${config.buttonStyle}
            }
            .${config.buttonClass}:hover {
                ${config.buttonHoverStyle}
            }
            .${config.buttonClass} svg {
                ${config.iconStyle}
            }
        `;
        document.head.appendChild(style);
    }

    // Создаем и добавляем кнопку
    function addWatchButton(activity) {
        const container = activity.render().find('.full-start__buttons');
        if (!container || container.find(`.${config.buttonClass}`).length) return;

        const button = $(`
            <div class="selector ${config.buttonClass}">
                <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Смотреть через Showy</span>
            </div>
        `).on('hover:enter', () => launchPlayer(activity.card));

        container.append(button);
        console.log('Showy: Кнопка добавлена');
    }

    // Запуск плеера
    function launchPlayer(cardData) {
        Lampa.Activity.push({
            url: '',
            title: 'Онлайн просмотр',
            component: 'showy',
            movie: cardData,
            page: 1
        });
    }

    // Задержка инициализации для совместимости
    if (window.Lampa && Lampa.Listener) {
        initPlugin();
    } else {
        setTimeout(() => {
            if (window.Lampa) initPlugin();
            else console.error('Showy: Lampa не обнаружена');
        }, 1000);
    }

    console.log('Showy: Плагин загружен');
})();
