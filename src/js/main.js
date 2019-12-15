//функция навешивания класса с тенью на шапку
var resize_scroll = function(e) {
  var h = $(".header");
  $(window).scrollTop() > h.height()
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

  //запуск плавающего левого меню в разделе доставки
  if ($("#delivery-nav").length) {
    if ($("body").width() >= 768) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });

        //навигация по якорям
        $("#delivery-nav").ddscrollSpy({
          scrolltopoffset: -120
        });
      }, 100);
    }

    //если блок для контента пустой, открепляем плавающее левое меню
    if ($(".js-content-with-sticky").length) {
      if ($('.js-content-with-sticky').html().trim() === '') {
        $(".js-sticky-block").trigger("sticky_kit:detach");
      }
    }
  }

  //переключение табов
  $('.js-tab-nav').on('click', function() {
    $('.js-tab-nav').removeClass("is-active");
    $(this).addClass("is-active");
    $('.js-tab').removeClass("is-active");
    $('.js-tab[data-target=' + $(this).attr("data-target") + ']').addClass("is-active");
    $(".js-sticky-block").trigger("sticky_kit:recalc");
    return false;
  });

  //попап
  if ($('[data-fancybox]').length) {
    $('[data-fancybox]').fancybox({
      smallBtn: false,
      toolbar: false
    });
  }
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


$(document).on('change', '.js-terms', function() {
  var this_ = $(this);
  var submit = $(this).closest('form').find('.button');
  if(this_.prop('checked') == true) {
    submit.prop('disabled', false);
  } else {
    submit.prop('disabled', true);
  }
})
