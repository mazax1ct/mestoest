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

  $('.js-question-opener').on('click', function() {
    $(this).toggleClass("is-active");
    $(this).next('.question__cut').slideToggle();
    return false;
  });
});

//перезапуск функции навешивания класса с тенью на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);

//открепляем и перезапускаем прилипающий блок при резайзе
$(window).resize(function() {
  if ($("#delivery-nav").length) {
    if ($("body").width() >= 768) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });

        //навигация по якорям в новости
        $("#delivery-nav").ddscrollSpy({
          scrolltopoffset: -120
        });
      }, 100);
    }
  }
});

//открепляем и перезапускаем прилипающий блок при повороте устройства
$(window).on("orientationchange", function(event) {
  if ($("#delivery-nav").length) {
    if ($("body").width() >= 768) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });

        //навигация по якорям в новости
        $("#delivery-nav").ddscrollSpy({
          scrolltopoffset: -120
        });
      }, 100);
    }
  }
});

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
