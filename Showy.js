(function() {
  'use strict';

  var Defined = {
    api: 'lampac',
    localhost: 'http://showwwy.com/',
    apn: ''
  };

  var rchtype = 'web';
  var check = function check(good) {
    rchtype = Lampa.Platform.is('android') ? 'apk' : good ? 'cors' : 'web';
  }

  var unic_id = Lampa.Storage.get('lampac_unic_id', '');
  if (!unic_id) {
    unic_id = Lampa.Utils.uid(8).toLowerCase();
    Lampa.Storage.set('lampac_unic_id', unic_id);
  }

  if (Lampa.Platform.is('android') || Lampa.Platform.is('tizen')) check(true);
  else {
    var net = new Lampa.Reguest();
    net.silent('https://github.com/', function() {
      check(true);
    }, function() {
      check(false);
    }, false, {
      dataType: 'text'
    });
  }

  function BlazorNet() {
    // ... (остальной код остался без изменений)
  }

  var Network = Lampa.Reguest;

  function component(object) {
    // ... (остальной код компонента остался без изменений)

    // УДАЛЕНО ВСЕ, ЧТО СВЯЗАНО С АВТОРИЗАЦИЕЙ
    // Удалены функции: showHavePROModal, checkCode, deleteDeviceToken
    // Удалены интервалы проверки авторизации
    // Удалены модальные окна с QR-кодами

    function account(url) {
      url = url + '';
      if (url.indexOf('uid=') == -1) {
        var uid = Lampa.Storage.get('lampac_unic_id', '');
        if (uid) url = Lampa.Utils.addUrlComponent(url, 'uid=' + encodeURIComponent(uid));
      }
      return url;
    }

    // ... (остальной код компонента остался без изменений, кроме удаленных частей)

    this.initialize = function() {
      // Удалены проверки авторизации
      var _this = this;
      this.loading(true);
      filter.onSearch = function(value) {
        clarificationSearchAdd(value)
        Lampa.Activity.replace({
          search: value,
          clarification: true
        });
      };
      // ... (остальной код инициализации)
    };

    // ... (остальные методы компонента без изменений)
  }

  // УДАЛЕНЫ ВСЕ УПОМИНАНИЯ МОДАЛЬНЫХ ОКОН И ПРОВЕРОК АВТОРИЗАЦИИ
  // В функции startPlugin() удалены элементы связанные с авторизацией

  function startPlugin() {
    window.lampac_plugin = true;
    var manifst = {
      // ... (осталось без изменений)
    };

    Lampa.Lang.add({
      // ... (языковые настройки без изменений)
    });

    Lampa.Template.add('lampac_css', "...");
    $('body').append(Lampa.Template.get('lampac_css', {}, true));

    function resetTemplates() {
      // ... (шаблоны без изменений)
    }

    // ... (остальной код плагина без изменений)
  }

  // УДАЛЕНЫ ВСЕ ЭЛЕМЕНТЫ РЕКЛАМЫ И УПОМИНАНИЯ БОТА
  if (!window.showy_plugin) startPlugin();

})();