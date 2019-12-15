//функция навешивания класса с тенью на шапку
var resize_scroll = function(e) {
  var h = $(".header");
  $(window).scrollTop() > h.height()
    ? h.addClass("scrolled")
    : h.removeClass("scrolled");
};

//функция рендеринга наполнения селекта с иконками
function formatState (state) {
  if (!state.id) {
    return state.text;
  }
  var $state = $(
    '<span><svg class="sorting-icon" aria-hidden="true"><use xlink:href="#'+ state.element.className +'" /></svg><span class="text">'+ state.text +'</span></span>'
  );
  $state.find(".text").text(state.text);
  return $state;
};

$(document).ready(function () {
  //запуск функции навешивания класса с тенью на шапку
  resize_scroll();

  //слайдер картинок
  if ($('.js-main-slider').length) {
    $('.js-main-slider').slick({
      auto: false,
      mobileFirst: true,
      slidesToShow: 1,
      infinite: true,
      arrows: false,
      appendArrows: $('.main-slider-nav'),
      prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#main-slider-prev"/></svg></button>',
      nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#main-slider-next"/></svg></button>',
      dots: true,
      responsive: [
        {
          breakpoint: 1349,
          settings: {
            arrows: true
          }
        }
      ]
    });
  }

  //кастомный селект
  $('.js-select').select2({
    minimumResultsForSearch: Infinity
  });

  //кастомный селект с иконками
  $(".js-select2").select2({
    containerCssClass: 'sorting-select',
    dropdownCssClass: 'sorting-select',
    minimumResultsForSearch: Infinity,
    templateResult: formatState,
    templateSelection: formatState
  });

  //слайдер картинок
  if ($('.js-slider').length) {
    $('.js-slider').slick({
      auto: false,
      mobileFirst: true,
      slidesToShow: 1,
      infinite: true,
      arrows: false,
      prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider-arrow-left"/></svg></button>',
      nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider-arrow-right"/></svg></button>',
      dots: true,
      responsive: [
        {
          breakpoint: 849,
          settings: {
            dots: false,
            arrows: true
          }
        }
      ]
    });
  }

  //проверка на пустоту поля ввода при загрузке страницы
  $('.js-input').each(function() {
    if($(this).val()) {
      $(this).parent('.input-label').addClass('filled');
    }
  });

  //проверка на пустоту поля ввода
  $('.js-input').blur(function () {
    if($(this).val()) {
      $(this).parent('.input-label').addClass('filled');
    } else {
      $(this).parent('.input-label').removeClass('filled');
    }
  });

  //открваем мобильное меню
  $('.js-menu-open').click(function () {
    $(this).toggleClass('is-active');
    $('.header').toggleClass('header--menu_open');
    $('body').toggleClass('overflow');
    $('.menu-block').toggleClass('is-open');
    return false;
  });

  //мобильное выпадающее меню 2 уровня
  $('.js-root-1').click(function () {
    var _this = $(this);
    if(_this.next('.js-sub-1').hasClass('is-open')) {
      _this.next('.js-sub-1').slideToggle(300, function () {
        _this.next('.js-sub-1').toggleClass('is-open');
      });
      _this.removeClass('is-active');
      _this.parent().removeClass('is-active');
    } else if($('.js-sub-1.is-open').length > 0) {
      $('.js-sub-1.is-open').slideToggle(300, function () {
        $(this).toggleClass('is-open');
        _this.next('.js-sub-1').slideToggle(300, function () {
          _this.next('.js-sub-1').toggleClass('is-open');
        });
      });
      $('.js-root-1').removeClass('is-active');
      $('.menu__item').removeClass('is-active');
      _this.addClass('is-active');
      _this.parent().addClass('is-active');
    } else {
      _this.next('.js-sub-1').slideToggle(300, function () {
        _this.next('.js-sub-1').toggleClass('is-open');
      });
      _this.addClass('is-active');
      _this.parent().addClass('is-active');
    }
    return false;
  });

  //открываем мобильное выпадающее меню 3 уровня
  $('.js-root-2').click(function () {
    var _this = $(this);
    $('.menu-block__top').addClass('menu-block__top--submenu_open'); //вешаем класс с нижним отступом для блока с меню
    $('.menu__item').fadeOut(300, function () {
      $('.js-root-1').hide(); //скрываем рутовую сслыку 1 уровня
      $('.js-root-2').hide(); //скрываем рутовую ссылку 2 уровня
      _this.closest('.menu__item').fadeIn(); //показываем блок с меню 3 уровня
      _this.next('.js-sub-2').show(); //показываем меню 3 уровня
    }); //скрываем пункты меню 1 уровня
    return false;
  });

  //закрытие выпадающего меню 3 уровня
  $('.js-root-2-close').click(function () {
    $('.js-sub-2').fadeOut(); //скрываем меню 3 уровня
    $('.menu__item').fadeIn(300, function () {
      $('.js-root-1').fadeIn(); //показываем рутовую сслыку 1 уровня
      $('.js-root-2').fadeIn(); //показываем рутовую ссылку 2 уровня
      $('.js-sub-2').hide(); //скрываем меню 3 уровня
      $('.menu-block__top').removeClass('menu-block__top--submenu_open'); //убираем класс с нижним отступом для блока с меню
    }); //показываем пункты меню 1 уровня
    return false;
  });

  //открытие блока поиска
  $('.js-search-open').click(function () {
    $('.search').addClass('is-open');
    $('.search__input').focus();
    return false;
  });

  //закрытие блока поиска
  $('.js-search-close').click(function () {
    $('.search').removeClass('is-open');
    $('.search__input').val('');
    return false;
  });

  //подстановка варианта поиска в инпут
  $('.js-search-variant').click(function () {
    $('.search-bar__input').val($(this).html());
    return false;
  });

  //открытие фильтра каталога на мобильных
  $('.js-filter-open').click(function () {
    $('body').addClass('overflow');
    $('.catalog-section__filter').addClass('is-open');
    return false;
  });

  //закрытие фильтра каталога на мобильных
  $('.js-filter-close').click(function () {
    $('body').removeClass('overflow');
    $('.catalog-section__filter').removeClass('is-open');
    return false;
  });

  //открытие/закрытие секции фильтра каталога
  $('.js-filter-section-toggle').click(function () {
    $(this).toggleClass('is-active');
    $(this).next('.catalog-filter__section-list').slideToggle(300, function () {
      $(this).toggleClass('is-open');
    });
    return false;
  });

  //переключение вида каталога
  $('.js-catalog-view').click(function () {
    $('.js-catalog-view').toggleClass('is-active');
    $('.catalog-list').toggleClass('list');
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

  //слайдер размера видеостены
  if ($(".js-range-slider").length) {
    $(".js-range-slider").ionRangeSlider({
      min: 1,
      max: 5,
      from: 1,
      to: 5,
      grid: true
    });
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

  //запуск плавающего блока ИТОГО
  if ($("#config-result").length) {
    if ($("body").width() >= 768) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });
      }, 100);
    }

    //если блок для контента пустой, открепляем плавающее блок ИТОГО
    if ($(".js-content-with-sticky").length) {
      if ($('.js-content-with-sticky').html().trim() === '') {
        $(".js-sticky-block").trigger("sticky_kit:detach");
      }
    }
  }

  //запуск плавающего левого меню в конфиге
  if ($("#config-nav").length) {
    if ($("body").width() >= 992) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });

        //навигация по якорям
        $("#config-nav").ddscrollSpy({
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

  //попап
  if ($('[data-fancybox]').length) {
    $('[data-fancybox]').fancybox({
      smallBtn: false,
      toolbar: false
    });
  }

  //скролл к концу баннера
  $('.js-scroll-to-banner-end').click(function () {
    var bOff = $('.banner2').offset().top;
    var bH = $('.banner2').innerHeight();
    var hH = $('.header').innerHeight();
    var offset = bOff + bH - hH;
    console.log(bOff, bH, hH);
    $('body, html').animate({
      scrollTop: offset
    }, 500);
    return false;
  });

  //запуск плавающего левого меню в разделе доставки
  if ($("#content-nav").length) {
    if($("body").width() < 768) {
      //навигация по якорям
      $("#content-nav").ddscrollSpy({
        scrolltopoffset: -100
      });

      //навигация по якорям
      $("#subcontent-nav").ddscrollSpy({
        scrolltopoffset: -100
      });
    } else {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });

        //навигация по якорям
        $("#content-nav").ddscrollSpy({
          scrolltopoffset: -120
        });

        //навигация по якорям
        $("#subcontent-nav").ddscrollSpy({
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

  if ($("#config-result").length) {
    if ($("body").width() >= 768) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });
      }, 100);
    }
  }

  if ($("#config-nav").length) {
    if ($("body").width() >= 992) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });

        //навигация по якорям в новости
        $("#config-nav").ddscrollSpy({
          scrolltopoffset: -120
        });
      }, 100);
    }
  }

  if ($("#content-nav").length) {
    if($("body").width() < 768) {
      //навигация по якорям
      $("#content-nav").ddscrollSpy({
        scrolltopoffset: -100
      });

      //навигация по якорям
      $("#subcontent-nav").ddscrollSpy({
        scrolltopoffset: -100
      });
    } else {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });

        //навигация по якорям
        $("#content-nav").ddscrollSpy({
          scrolltopoffset: -120
        });

        //навигация по якорям
        $("#subcontent-nav").ddscrollSpy({
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

  if ($("#config-result").length) {
    if ($("body").width() >= 768) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });
      }, 100);
    }
  }

  if ($("#config-nav").length) {
    if ($("body").width() >= 992) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });

        //навигация по якорям в новости
        $("#config-nav").ddscrollSpy({
          scrolltopoffset: -120
        });
      }, 100);
    }
  }

  if ($("#content-nav").length) {
    if($("body").width() < 768) {
      //навигация по якорям
      $("#content-nav").ddscrollSpy({
        scrolltopoffset: -100
      });

      //навигация по якорям
      $("#subcontent-nav").ddscrollSpy({
        scrolltopoffset: -100
      });
    } else {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 120
        });

        //навигация по якорям
        $("#content-nav").ddscrollSpy({
          scrolltopoffset: -120
        });

        //навигация по якорям
        $("#subcontent-nav").ddscrollSpy({
          scrolltopoffset: -120
        });
      }, 100);
    }
  }
});

$(document).on('click', '.js-cmenu-opener', function () {
  $('body').addClass('overflow');
  $('.mwcc__left').addClass('is-open');
  return false;
});

$(document).on('click', '.js-cmenu-closer', function () {
  $('body').removeClass('overflow');
  $('.mwcc__left').removeClass('is-open');
  return false;
});

$(document).on('click', '#content-nav a', function () {
  $('body').removeClass('overflow');
  $('.mwcc__left').removeClass('is-open');
});
