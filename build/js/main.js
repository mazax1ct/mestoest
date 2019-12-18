//функция навешивания класса на шапку
var resize_scroll = function(e) {
  var h = $(".header");
  $(window).scrollTop() > h.innerHeight()
    ? h.addClass("scrolled2")
    : h.removeClass("scrolled2");

  $(window).scrollTop() > h.innerHeight()*1.2
    ? h.addClass("scrolled")
    : h.removeClass("scrolled");
};

$(document).ready(function () {
  //запуск функции навешивания класса с тенью на шапку
  resize_scroll();

  //кастомный селект
  $('.js-select').select2({
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.popup')
  });

  //открваем мобильное меню
  $('.js-menu-opener').click(function () {
    $('body').addClass('overflow');
    $('.main-menu').addClass('is-open');
    return false;
  });

  //закрываем мобильное меню
  $('.js-menu-closer').click(function () {
    $('body').removeClass('overflow');
    $('.main-menu').removeClass('is-open');
    return false;
  });

  //закрытие попапа
  $('.js-popup-closer').click(function () {
    $.fancybox.close();
    return false;
  });

  //кастомный скролл
  $('.js-custom-scroll').each(function(index, element) {
    new SimpleBar(element, { autoHide: false })
  });

  //spy menu
  var menu_offset;
  if($('body').width() < 1200) {
    menu_offset = -70;
  }

  if($('body').width() > 1200 && $('body').width() < 1900) {
    menu_offset = -80;
  }

  if($('body').width() > 1900) {
    menu_offset = -123;
  }

  $("#main-menu").ddscrollSpy({
    scrolltopoffset: menu_offset
  });

  //навигация по меню
  $('#main-menu .js-scroll-link').click(function () {
    $('body').removeClass('overflow');
    $('.main-menu').removeClass('is-open');
    return false;
  });

  //переключение табов
  $('.js-tab-nav').on('click', function() {
    $('.js-tab-nav').removeClass("is-active");
    $(this).addClass("is-active");
    $('.js-tab').removeClass("is-active");
    $('.js-tab[data-target=' + $(this).attr("data-target") + ']').addClass("is-active");
    $(".js-sticky-block").trigger("sticky_kit:recalc");
    return false;
  });

  //тогглер акции
  $('.js-action').on('click', function() {
    if($(this).hasClass('is-active')) {
      $(this).removeClass('is-active')
    } else {
      $('.js-action').removeClass('is-active');
      $(this).addClass("is-active");
    }
    return false;
  });

  //тогглер вопросов
  $('.js-question-opener').on('click', function() {
    $(this).toggleClass("is-active");
    $(this).next('.question__cut').slideToggle();
    return false;
  });
});

//перезапуск функции навешивания класса с тенью на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);

//изменение состояния кнопки отправки в попапе
$(document).on('change', '.js-terms', function() {
  var this_ = $(this);
  var submit = $(this).closest('form').find('.button');
  if(this_.prop('checked') == true) {
    submit.prop('disabled', false);
  } else {
    submit.prop('disabled', true);
  }
});

//яндекс карты
var myMap;
var locations = [
  [59.917222, 30.521996, '«Место Есть» в Кудрово, пр. Строителей 7', 'id_1'],
  [60.014356, 30.452735, '«Место Есть» на Пискарёвском проспекте, 150к2', 'id_2'],
  [60.065795, 30.294255, '«Место Есть» на Выборгском шоссе, 200А', 'id_3'],
  [59.863956, 30.219308, '«Место Есть» на улице Маршала Казакова, 21', 'id_4'],
  [59.907677, 30.345423, '«Место Есть» на Лиговском пр./Растанной улице (Камчатская, 1)', 'id_5'],
  [59.818816, 30.312005, '«Место Есть» в ТРК "ЛЕТО" (7ой-Предпортовый проезд, 1А)', 'id_6']
];

setTimeout(function() {
  var elem = document.createElement('script');
  elem.type = 'text/javascript';
  elem.src = 'https://api-maps.yandex.ru/2.1/?apikey=cba047df-856c-4d12-a13e-85e5ff327c48&lang=ru_RU&onload=init';
  document.getElementById('map').appendChild(elem);
}, 2000);

function init() {
  myMap = new ymaps.Map('map', {
    center: [59.957262, 29.705429],
    zoom: 9
  }, {
    searchControlProvider: 'yandex#search'
  });

  myMap.behaviors.disable('scrollZoom');

  var iconLayout = 'default#image';
  var iconImageHref = 'images/icons/map-pin.svg';
  var iconImageSize = [35, 62];
  var iconImageOffset = [-17, -62];

  var i, placemark, addressClass, address;

  for (i = 0; i < locations.length; i++) {
    placemark = new ymaps.Placemark([locations[i][0], locations[i][1]], {
      balloonContent: locations[i][2],
      id: locations[i][3]
    }, {
      iconLayout: iconLayout,
      iconImageHref: iconImageHref,
      iconImageSize: iconImageSize,
      iconImageOffset: iconImageOffset
    });

    placemark.events.add('click', function(e) {
      var id = e._cache.target.properties._data.id;
      var el = document.querySelector('[data-id=' + id + ']');
      var curr_el = document.querySelector('.address-block__address.is-active');
      if (curr_el !== null) {
        curr_el.classList.remove('is-active');
        el.classList.add('is-active');
      } else {
        el.classList.add('is-active');
      }
    });

    myMap.geoObjects.add(placemark);
  }

  myMap.setBounds(myMap.geoObjects.getBounds(), {
    checkZoomRange: true,
    zoomMargin: 35
  });

  var body = document.querySelector('body');
  if (body.offsetWidth < 768) {
    myMap.behaviors.disable('drag');
    myMap.behaviors.enable('MultiTouch');
  }
}
