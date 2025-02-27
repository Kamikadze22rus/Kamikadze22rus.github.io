(function() {
  'use strict';

  var Defined = {
    api: 'lampac',
    localhost: 'http://showwwy.com/',
    apn: ''
  };

  // ... (остальные переменные и функции остаются без изменений)

  function component(object) {
    // ... (основная логика компонента без изменений)

    this.initialize = function() {
      var _this = this;
      this.loading(true);
      
      // Восстановление обработчика поиска
      filter.onSearch = function(value) {
        clarificationSearchAdd(value);
        Lampa.Activity.replace({
          search: value,
          clarification: true
        });
      };

      // Восстановление обработчиков фильтров
      filter.onBack = function() {
        _this.start();
      };

      // Инициализация интерфейса
      filter.render().find('.selector').on('hover:enter', function() {
        clearInterval(balanser_timer);
      });

      // Важная часть: создание элементов интерфейса
      scroll.body().addClass('torrent-list');
      files.appendFiles(scroll.render());
      files.appendHead(filter.render());
      scroll.minus(files.render().find('.explorer__files-head'));
      scroll.body().append(Lampa.Template.get('lampac_content_loading'));
      
      // Восстановление кнопки просмотра
      this.createWatchButton();
      
      // ... (остальная логика инициализации)
    };

    // Метод для создания кнопки просмотра
    this.createWatchButton = function() {
      var buttonHtml = `
        <div class="full-start__button selector view--online_showy" 
             style="margin-left: 1.5em;"
             data-subtitle="Просмотр через Showy">
          <svg width="30" height="30" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M8,17.5V6.5L18,12L8,17.5Z"/>
          </svg>
          <span>Смотреть онлайн</span>
        </div>
      `;

      var button = $(buttonHtml).on('hover:enter', function() {
        Lampa.Activity.push({
          url: '',
          title: 'Онлайн просмотр',
          component: 'lampac',
          search: object.title,
          movie: object,
          page: 1
        });
      });

      // Добавляем кнопку в нужное место интерфейса
      var targetContainer = Lampa.Activity.active().activity.render().find('.full-start__buttons');
      if(targetContainer.length > 0) {
        targetContainer.append(button);
      } else {
        setTimeout(() => this.createWatchButton(), 100);
      }
    };

    // ... (остальные методы компонента)
  }

  // Функция для добавления кнопки в интерфейс
  function addButtonToInterface() {
    try {
      if(Lampa.Activity.active().component === 'full') {
        var btn = $(`
          <div class="full-start__button selector view--online_showy">
            <span>Смотреть онлайн</span>
          </div>
        `).on('hover:enter', function() {
          // Логика запуска просмотра
        });
        
        $('.full-start__buttons').append(btn);
      }
    } catch(e) {
      console.error('Error adding button:', e);
    }
  }

  // Инициализация плагина
  function startPlugin() {
    // ... (остальная логика инициализации)
    
    // Регистрируем обработчик для добавления кнопки
    Lampa.Listener.follow('full', function(e) {
      if(e.type === 'complite') {
        addButtonToInterface();
      }
    });
  }

  if(!window.showy_plugin) startPlugin();

})();