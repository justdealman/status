function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
			'background-size': 'contain'
		});
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:960px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('.article__info--slider, .partner__slider').slick({
		slidesToScroll: 1,
		dots: false,
		infinite: true,
		centerMode: true,
		variableWidth: true,
		speed: 300,
		responsive: [
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 1,
					centerMode: false,
					variableWidth: false,
					adaptiveHeight: true
				}
			}
		]
	});
	$('.article__tabs--nav a').on('click', function(e) {
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
	});
	$('.category-grid').isotope({
		itemSelector: '.category-grid__item',
		layoutMode: 'fitRows'
	});
	function stickyNav() {
		if ( $(document).scrollTop() > $('.header').outerHeight()-$('.nav__main').outerHeight() ) {
			$('.nav__main').addClass('fixed');
		} else {
			$('.nav__main').removeClass('fixed');
		}
	}
	function setServicesSlider() {
		if ( $('[slider-mobile]').hasClass('slick-initialized') ) {
			$('[slider-mobile]').slick('unslick');
		}
		if ( isMobile ) {
			$('[slider-mobile]').slick({
				mobileFirst: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: false,
				dots: true,
				draggable: true,
				adaptiveHeight: true,
				responsive: [
					{
						breakpoint: 640,
						settings: {
							slidesToShow: 2
						}
					}, {
						breakpoint: 960,
						settings: 'unslick'
					},
				]
			});
		}
	}
	function setMinContentHeight() {
		var minHeight = $(window).height()-($('.header').outerHeight()+$('.footer-nav').outerHeight()+parseInt($('.footer-nav').css('margin-top'))+$('.footer').outerHeight());
		if ( minHeight < 0 ) {
			minHeight = 0;
		}
		$('.content').css({
			'min-height': minHeight
		});
	}
	$(window).on('resize scroll', function() {
		if ( !isMobile ) {
			stickyNav();
		}
	});
	$(window).on('resize', function() {
		detectDevice();
		if ( justSwitched ) {
			setServicesSlider();
		}
		$('[data-full-text]').each(function() {
			if ( Modernizr.mq('(max-width:640px)') ) {
				$(this).val($(this).attr('data-short-text'));
			} else {
				$(this).val($(this).attr('data-full-text'));
			}
		});
		setMinContentHeight();
	});
	$(window).trigger('resize');
	$('.footer-nav--group h5').on('click', function() {
		if ( isMobile ) {
			$(this).toggleClass('is-dropped');
		}
	});
	$('.menu-open').on('click', function() {
		$('.header').addClass('is-dropped');
		$('body').addClass('is-locked');
	});
	$('.search-open').on('click', function() {
		$('.header').addClass('is-search');
		$('body').addClass('is-locked');
	});
	$('.menu-close').on('click', function() {
		$('.header').removeClass('is-dropped is-search');
		$('body').removeClass('is-locked');
	});
	$('.nav__search--submit').on('click', function(e) {
		e.preventDefault();
	});
	$(window).on('scroll', function() {
		if ( $(document).scrollTop() > $(window).height() ) {
			$('.go-up').addClass('is-visible');
		} else {
			$('.go-up').removeClass('is-visible');
		}
	});
	$('.go-up').on('click', function(e) {
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: 0
		}, 1000);
	});
	$('.mediakit__item--slider .core').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		infinite: true,
		adaptiveHeight: true,
		fade: true,
		speed: 300
	});
	$('.mediakit__item--slider .nav li').on('click', function(e) {
		e.preventDefault();
		$(this).parents('.mediakit__item--slider').find('.core').slick('slickGoTo',$(this).attr('data')-1);
		$(this).addClass('active').siblings().removeClass('active');
	});
});/*
(function headerSearch() {
	var isFocused = false;
	var hideDelay;
	var t = $('.nav__row');
	function hideInput() {
		t.find('.nav__search--text').css({
			width: 0
		}).removeClass('is-visible');
	}
	t.find('.nav__search').on('mouseenter', function() {
		clearTimeout(hideDelay);
		$(this).find('.nav__search--text').css({
			width: t.width()
		}).addClass('is-visible');
	});
	t.find('.nav__search--text').on('focus', function() {
		isFocused = true;
	});
	t.find('.nav__search').on('mouseleave', function() {
		var t = $(this);
		if ( !isFocused ) {
			hideInput();
		} else {
			hideDelay = setTimeout(function() {
				hideInput();
				isFocused = false;
			}, 5000);
		}
	});
	t.find('.nav__search--text').on('blur', function() {
		clearTimeout(hideDelay);
		hideInput();
		isFocused = false;
	});
})();*/