var blockDoubleClick = false;

window.cookieBoxInit = function(cname, cvalue, exdays) {
	$('.cookie-box .xbtn, .cookie-box a').on('click', function(){
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		$(this).closest('.cookie-box').remove();
	});
};

window.loadView = function(url, isFormPost){
	if (typeof isFormPost === "undefined") {
		isFormPost = false;
	}
	if (!blockDoubleClick) {
		blockDoubleClick = true;
		preloaderInit('body');
		$('body').append('<div id="preloader-background"></div>');
		$.ajax({
			url: url
		}).done(function(data){
			var data = $(data);
			var main = data.filter('main');
			if (isFormPost) {
				main.find('.form-page').append('<div class="xbtn form-page-close"></div>');
				$('main').prepend(main.html());
			} else {
				document.title = data.filter('title').text();
				$('main').html(main.html());
			}
			$('html, body').animate({
				scrollTop: 0
			}, 0);
		}).always(function(){
			blockDoubleClick = false;
			$('#preloader-background, #preloader').remove();
		});
	}
};

window.headerMenuInit = function(){
	var desktopResolution = window.matchMedia("(min-width: 769px)");
	var headerNavButton = $('#header-nav-button');
	var headerNav = $('#header-nav');
	var headerNavLi = $('#header-nav li');
	var headerNavAnchor = $('#header-nav a');

	function headerNavOpen() {
		headerNavButton.addClass("active");
		headerNav.addClass("open-transition").removeClass("close-transition");
	}

	function headerNavClose() {
		headerNavButton.removeClass("active");
		headerNav.removeClass("open-transition").addClass("close-transition");
	}

	function mainMenuRestore() {
		headerNavButton.removeClass("active");
		headerNav.removeClass("open-transition close-transition");
	}

	headerNavButton.on('click', function(){
		if (headerNav.hasClass("open-transition")) {
			headerNavClose();
		} else {
			headerNavOpen();
		}
	});

	$(document).on('click', 'main, footer', function(){
		if (headerNav.hasClass("open-transition")) {
			headerNavClose();
		}

		if (desktopResolution.matches) {
			headerNavLi.removeClass('open').find('ul').css('display', '');
		}
	});

	$(window).on("resize", function() {
		mainMenuRestore();
		if ($(this).width() > 768) {
			headerNav.find('ul').css('display','');
		}
	});

	headerNavAnchor.on('click', function(event){
		var anchor = $(this);
		var anchors = headerNav.find('a');
		var href = anchor.attr('href');
		var targetId = (href.indexOf('#') >= 0 ? '#'+href.substring(href.indexOf("#")+1) : '');
		if (href == '#') {
			event.preventDefault();
			anchor.next().slideToggle(100, function() {
				anchor.parent().toggleClass("open");
			});
		} else if (targetId.length) {
			$('.form-page').remove();
			$('html, body').animate({
				scrollTop: $(targetId).offset().top - $('#header').height()
			}, 500, function(){
				mainMenuRestore();
				if (targetId == '#contact-us') {
					$('[name="subject"]').focus();
				}
			});
			event.preventDefault();
		} else if (history && history.pushState && enableMenuAjax) {
			window.history.pushState(null, null, href);
			anchors.removeClass('active');
			anchor.addClass('active');
			loadView(href);
			mainMenuRestore();
			if ($(window).width() > 768) {
				headerNav.find('ul').css('display','');
			}
			event.preventDefault();
		}
	});

	$(window).on("popstate", function() {
		var href = this.location.href;
		headerNavAnchor.removeClass('active');
		headerNavAnchor.filter('a[href="' + href + '"]').addClass('active');
		loadView(href);
	});
};

window.footerMenuInit = function(){
	var footerNavAnchor = $('.footer-nav a');
	var headerNavAnchor = $('#header-nav a');
	footerNavAnchor.on('click', function(event){
		var href = $(this).attr('href');
		if (history && history.pushState && enableMenuAjax) {
			window.history.pushState(null, null, href);
			headerNavAnchor.removeClass('active');
			$('#header-nav a[href="'+href+'"]').addClass('active');
			loadView(href);
			event.preventDefault();
		}
	});
};

window.headerMenuHelper = function(element){
	$('#header-nav #navSolutions').addClass('open');
	$('#header-nav #navSolutions > a').addClass('active');
};

window.loadVideo = function(id){
	var video = document.getElementById(id);
	var videoSRC = video.getAttribute('data-src');

	if (bVideoBlob) {
		window.URL = window.URL || window.webkitURL;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", videoSRC);
		xhr.responseType = "blob";
		xhr.onload = function() {
			video.setAttribute("src", window.URL.createObjectURL(xhr.response));
		}
		xhr.send();
	} else {
		video.setAttribute("src", videoSRC);
	}

	video.removeAttribute('data-src');

	video.addEventListener('play', function(){
		video.removeAttribute('poster');
	});

	video.addEventListener('loadedmetadata', function(){
		console.log('video `' + id + '` loaded!');
	});

	video.addEventListener('error', function(){
		console.log('video `' + id + '` error! ' + this.error.code);
	});
};

/**
 * Check mobile resolution.
 */
window.isMobileResolution = function(){
	if ($(window).width() <= 768) {
		return true;
	}

	return false;
};

/**
 * Mobile responsive for FAQ panel;
 */
window.responsivePanels = function(){
	var tMR = null;
	var collapse = $('.panel-title > [data-toggle="collapse"]');
	var panelCollapse = $('.panel-collapse');

	function chechMobileResolution() {
		var isMR = isMobileResolution();

		if (tMR != isMR) {
			tMR = isMR;
			if (isMR) {
				collapse.addClass('collapsed').attr('aria-expanded', false);
				panelCollapse.removeClass('show');
			}
		}
	}

	$(window).resize(function() {
		chechMobileResolution();
	});

	chechMobileResolution();
};

window.formCategoryInit = function(){
	$('[name="category"]').val('home');
};