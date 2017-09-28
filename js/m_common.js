/*
 *  Vitaly Danylyk
 *	web.vitaly@rambler.ru
 */

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

var scrollPos = $(window).scrollTop();

$(window).scroll(function(){
	if($(window).scrollTop() > (scrollPos+25) && $(window).scrollTop() > 122){
		$('.header').addClass('na');
	} else if ($(window).scrollTop() < (scrollPos-25) || $(window).scrollTop() <= 122) {
		$('.header').removeClass('na');
	}
	scrollPos = $(window).scrollTop();
});

$(window).resize(function(){
	tabnavigation();
	history();
	contHistory();
	tags();
});

$(document).ready(function(e){
	setTimeout(function(){
		tabnavigation();
		history();
		contHistory();
		tags();
		$('.good_sizes .size.is').click();
	},10);
});

$('#menu .user_view .info').click(function(e){
	if($(this).closest('.user_view').attr('class').contains('is')){
		$(this).closest('.user_view').removeClass('is');
		$(this).closest('.user_view').children('.control').slideUp(200);
	} else {
		$(this).closest('.user_view').addClass('is');
		$(this).closest('.user_view').children('.control').slideDown(200);
	}
});

function tabnavigation () {
	var navWidth = 0;
	$('.tabnavigation nav a').each(function() {
	    navWidth = navWidth + $(this).outerWidth()+1;
	});
	$('.tabnavigation nav').width(navWidth+15);
	$('.tabnavigation').removeClass('loading');
}

function history () {
	var navWidth = 0;
	$('.header .history nav a').each(function() {
		navWidth = navWidth + $(this).outerWidth()+43;
	});
	$('.header .history nav').width(navWidth+15-42);
	$('.header .history').removeClass('loading');
}

function contHistory () {
	var navWidth = 0;
	$('.content .history nav a').each(function() {
	    navWidth = navWidth + $(this).outerWidth()+9;
	});
	$('.content .history nav').width(navWidth+15-8);
	$('.content .history').removeClass('loading');
}

function tags () {
	var tagsWidth = 0;
	$('.tags li a').each(function() {
	    tagsWidth = tagsWidth + $(this).outerWidth()+2+20;
	});
	$('.tags').width(tagsWidth+15);
	$('.tags_line').removeClass('loading');
}

$('body:not(.w) #nav').click(function(e){
	e.preventDefault();
	if($(this).attr('class') == 'is'){
		$(this).removeClass('is');
		$(this).attr('dv-type', '');
		$('#menu').removeClass('is');
		$('.header, .content, .footer').removeClass('op');
		$('#bg').removeClass('op');
		$('body').css('overflow', 'auto');
	} else {
		$(this).addClass('is');
		$(this).attr('dv-type', 'arr');
		$('#menu').addClass('is');
		$('.header, .content, .footer').addClass('op');
		$('#bg').addClass('op');
		$('body').css('overflow', 'hidden');
	}
});

$('.item .add, .item .added').click(function(e){
	e.preventDefault();
	if($(this).attr('class') == 'add'){
		$(this).removeClass('add');
		$(this).addClass('added');
	} else {
		$(this).removeClass('added');
		$(this).addClass('add');
	}
});

$('#bg').click(function(e){
	if($(this).attr('class') == 'op'){
		$('#nav').click();
	}
});

$('.password .see').click(function(e){
	var status = $(this).closest('.password').children('input').attr('type');
	if(status == 'password'){
		$(this).closest('.password').children('input').attr('type', 'text');
	} else {
		$(this).closest('.password').children('input').attr('type', 'password');
	}
});

$('#search').click(function(e){
	if($(this).attr('class') == 'is') {
		$(this).removeClass('is');
		$('#searching').slideUp(200);
	} else {
		$(this).addClass('is');
		$('#searching').slideDown(200);
		$('#searching form input[type="text"]').focus();
	}
});

$('.content div:not(.choose_own_size) .tabs a').click(function(e){
	e.preventDefault();

	var tag = $(this).attr('dv-tag');

	$(this).closest('.tabs').children('a').removeClass('is');
	$(this).addClass('is');

	$(this).closest('.tabs').parent().children('.windows').children('.window').removeClass('is');
	$(this).closest('.tabs').parent().children('.windows').children('.window[dv-tag="'+tag+'"]').addClass('is');
});

var popup__size_autoscroll = false;
if($('.choose_own_size .windows .window:nth-child(1)').length > 0){
	var popup__size_scroll = $('.choose_own_size .windows .window:nth-child(1)').offset().left;
}

$('.choose_own_size .tabs a').click(function(e){
	e.preventDefault();
	var to = $(this).attr('dv-tag');
	$('.windows_line').slick('slickGoTo', to);
});

if($('.windows_line').length > 0){
	$('.windows_line').slick({
		dots: false,
		infinite: false,
		autoplay: false,
		centerMode: true,
		variableWidth: true
	});
}
$('.windows_line').on('beforeChange', function(event, slick, currentSlide, nextSlide){
	$('.choose_own_size .tabs a').removeClass('is');
	$('.choose_own_size .tabs a[dv-tag="'+nextSlide+'"]').addClass('is');
});

$('ul.main li.sub > a').click(function(e){
	e.preventDefault();
	
	if($(this).closest('li').attr('class').contains('is')){
		$(this).closest('li').removeClass('is');
		$('+ ul', this).slideUp(200);
	} else {
		$(this).closest('li').addClass('is');
		$('+ ul', this).slideDown(200);
	}
});

$('ul.main li.go > a').click(function(e){
	e.preventDefault();
	
	if($(this).closest('li').attr('class').contains('opened')){
		$(this).closest('li').removeClass('opened');
		$('#menu .menu_content').removeClass('opened')
	} else {
		$(this).closest('li').addClass('opened');
		$('#menu .menu_content').addClass('opened')
	}
});

$('.size[dv-sizes] button').click(function(e){
	var pos = parseInt($(this).closest('.size').attr('dv-def'));
	var sizes = $(this).closest('.size').attr('dv-sizes');

	sizes = sizes.split(',');

	var type = $(this).attr('dv-type');

	$(this).closest('.size').children('button').removeClass('disable');

	if (type == 's') {
		pos = pos - 1;
		if (pos <= 0) {
			pos = 0;
			$(this).addClass('disable');
		}

		$(this).closest('.size').children('div').text(sizes[pos]);
	} else if (type == 'b') {
		pos = pos + 1;
		if (pos >= (sizes.length-1)) {
			pos = (sizes.length-1);
			$(this).addClass('disable');
		}

		$(this).closest('.size').children('div').text(sizes[pos]);
	}

	$(this).closest('.size').attr('dv-def', pos);
});

$('.size[dv-sizes]').each(function(e){
	var pos = parseInt($(this).attr('dv-def'));
	var sizes = $(this).attr('dv-sizes');
	sizes = sizes.split(',');
	$('div', this).text(sizes[pos])
});

$('.amount[dv-amount]').each(function(e){
	var def = parseInt($(this).attr('dv-def'));
	$('div', this).text(def)
});

$('.amount[dv-amount] button').click(function(e){
	var def = parseInt($(this).closest('.amount').attr('dv-def'));
	var max = parseInt($(this).closest('.amount').attr('dv-max'));

	var type = $(this).attr('dv-type');

	$(this).closest('.amount').children('button').removeClass('disable');

	if (type == 's') {
		def = def - 1;
		if (def <= 1) {
			def = 1;
			$(this).addClass('disable');
		}

		$(this).closest('.amount').children('div').text(def);
	} else if (type == 'b') {
		def = def + 1;
		if (def >= (max)) {
			def = (max);
			$(this).addClass('disable');
		}

		$(this).closest('.amount').children('div').text(def);
	}

	$(this).closest('.amount').attr('dv-def', def);
});

var backCount = 0;
$('.view_good .back').click(function(e){
	e.preventDefault();
	backCount += 1;

	var back = $(this).attr('dv-data');
	var front = $(this).closest('.view_good').children('img').attr('dv-data');

	if(backCount % 2 != 0){
		$(this).addClass('f');
	} else {
		$(this).removeClass('f');
	}

	$(this).attr('dv-data', front);
	$(this).css('background-image', 'url(\'../includes/uploads/'+front+'\')');
	$(this).closest('.view_good').children('img').attr('dv-data', back);
	$(this).closest('.view_good').children('img').attr('src', '../includes/uploads/'+back);
});

if($('.good .advantages .slider').length > 0){
	$('.good .advantages .slider').slick({
		dots: true,
		slidesToShow: 1,
		centerMode: true,
		autoplay: true,
		variableWidth: true
	});
}
if($('.main_slider').length > 0){
	$('.main_slider').slick({
		dots: true,
		slidesToShow: 1,
		autoplay: true
	});
}

if($('#map').length > 0){
	ymaps.ready(function () {
		var myMap = new ymaps.Map('map', {
			center: [55.751574, 37.573856],
			zoom: 14,
			controls: []
		}, {
			searchControlProvider: 'yandex#search'
		});

		myMap.behaviors.disable('scrollZoom');
		myMap.behaviors.disable('drag');

		var layout = ymaps.templateLayoutFactory.createClass('<div class="map_marker_ico"></div>');;

		myPlacemark_1 = new ymaps.Placemark([55.751574, 37.573856], {
			hintContent: ''
		}, {
			iconLayout: layout,
			iconShape: {
				type: 'Circle',
				coordinates: [2, 2],
				radius: 2
			}
		});

		myMap.geoObjects.add(myPlacemark_1);
	});
}

if($('.popup .actionbar').length > 0){
	$('.popup').scroll(function(e){
		if($(this).offset().top >= $('.content', this).offset().top){
			$('.actionbar', this).addClass('fixed');
		} else {
			$('.actionbar', this).removeClass('fixed');
		}
	});
}


$('.qas .qa .q').click(function(e){
	if($(this).closest('.qa').attr('class').contains('is')){
		$(this).closest('.qa').removeClass('is');
		$(this).closest('.qa').children('.a').slideUp(200);
	} else {
		$('.qas .qa').removeClass('is');
		$('.qas .qa .a').slideUp(200);
		$(this).closest('.qa').addClass('is');
		$(this).closest('.qa').children('.a').slideDown(200);
	}
});

function clP (el) {
	$('.popup[dv-popup="'+el+'"]').removeClass('is');
}

$('.good_sizes .size').click(function(e){
	$('.good_sizes .size').removeClass('is');
	$(this).addClass('is');
	var l = $(this).position().left;
	var w = $(this).width();
	$('.chooser').css('left', l+'px');
	$('.chooser').width(w);
});

$('.delivery .smart_input .flags .chosen').click(function(e){
	if($(this).closest('.flags').attr('class').contains('is')){
		$(this).closest('.flags').removeClass('is');
	} else {
		$(this).closest('.flags').addClass('is');
	}
});

$('.delivery .smart_input .flags .flag').click(function(e){
	var data = $(this).attr('dv-data');
	$('.delivery .smart_input .flags.is .flag').removeClass('is');
	$(this).addClass('is');
	$('.delivery .smart_input .flags .chosen img').attr('src', '../includes/img/flags/'+data+'.jpg');
});

$('.delivery .smart_input input').keyup(function(e){
	if($.trim($(this).val()) != ''){
		$(this).closest('.smart_input').children('.reset').removeClass('disable');
	} else {
		$(this).closest('.smart_input').children('.reset').addClass('disable');
	}
});

$('.delivery .smart_input .reset').click(function(e){
	$(this).closest('.smart_input').children('input').val('');
});



/************************************************/
$('.content.good .ldl a').click(function(e){/****/
/**/e.preventDefault();/*************************/
/**/if($(this).attr('class').contains(' is')){/**/
/******/$(this).removeClass('is');/**************/
/******/return true;/****************************/
/**/}/*******************************************/
/**/$('.ldl a').removeClass('is');/**************/
/**/$(this).addClass('is');/*********************/
});/*********************************************/
/************************************************/