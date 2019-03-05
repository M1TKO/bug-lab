/**
 * Open page from ajax.
 */
$(function(){
	$(document).on('click', '.page-open', function(event){
		var element = $(this);
		var url = element.attr('href') || element.data('href');
		if (history && history.pushState && enableMenuAjax) {
			window.history.pushState(null, null, url);
			loadView(url, false);
			event.preventDefault();
		}
	});
});

/**
 * Form post load and remove.
 */
$(function(){
	$(document).on('click', '.form-page-open', function(event){
		var url = $(this).attr('href');
		loadView(url, true);
		event.preventDefault();
	});

	$(document).on('click', '.form-page-close', function(){
		$(this).parent('.form-page').remove();
	});
});

/**
 * Custome input type file.
 */
$(function() {
	$(document).on("change", ":file", function() {
		var input = $(this);
		var numFiles = input.get(0).files ? input.get(0).files.length : 1;
		var label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
		input.trigger("fileselect", [numFiles, label]);
	});

	$(document).on("fileselect", ":file", function(event, numFiles, label) {
		var input = $(this).parents(".input-group").find(":text");
		var log = numFiles > 1 ? numFiles + " files selected" : label;
		if (input.length) {
			input.val(log);
		} else {
			if (log) alert(log);
		}
	});
});

/**
 * Scroll to target.
 */
$(document).on('click', '.next-post', function(event){
	var targetId = $(this).attr('href');
	$('html, body').animate({
		scrollTop: $(targetId).offset().top - $('#header').height()
	}, 500);
	event.preventDefault();
});

/**
 * Join form set form URL.
 */
$(function(){
	$(document).on('click', '.nav-link', function(){
		var href = $(this).attr('href');
		if (history && history.pushState) {
			window.history.pushState(null, null, href);
		}
	});
});

/**
 * Join form show other field.
 */
$(document).on('change', '[name="questionLAAdH[Other]"]', function(){
	var checkbox = $(this);
	var checkboxId = checkbox.attr('id');
	var otherRow = $('#row-' + checkboxId);
	var otherRowField = otherRow.find('[name="questionLAAdH[Other]"]');
	if (checkbox.is(':checked')) {
		otherRow.removeClass('d-none');
		otherRowField.prop('disabled', false);
	} else {
		otherRow.addClass('d-none');
		otherRowField.prop('disabled', true);
	}
});

/**
 * Help list-group in panel-group
 */
$(function(){
	var lgi = '#accordion-help-themes .list-group-item';
	$(document).on('click', lgi, function(){
		var listGroupItems = $(lgi).not($(this));
		listGroupItems.removeClass('active').removeClass('show');
	});
});

/**
 * Form submit
 */

var blockDoubleSubmit = false;

$(document).on('submit', 'form', function(event){
	if (typeof enableFormAjax === "undefined") {
		enableFormAjax = false;
	}
	if (enableFormAjax) {
		var form = $(this);
		var formAction = form.attr('action');
		var formMethod = form.attr('method');

		if (!blockDoubleSubmit) {
			blockDoubleSubmit = true;
			preloaderInit('body');
			$('body').append('<div id="preloader-background"></div>');
			$.ajax({
				url: formAction,
				type: formMethod,
				data: new FormData(form[0]),
				cache: false,
				contentType: false,
				processData: false
			}).done(function(data){
				var data = $(data);
				var elements = data.find('.is-invalid');
				if (elements.length) {
					$.each(elements, function(){
						var element = $(this);
						var elementAriaDescribedby = element.attr('aria-describedby');
						var elementErrorMSG = data.find('#' + elementAriaDescribedby);
						$('#' + elementAriaDescribedby)
							.html(elementErrorMSG.text())
							.closest('form')
							.find('[aria-describedby="' + elementAriaDescribedby + '"]')
							.addClass('is-invalid');
					});
				} else {
					window.history.pushState(null, null, SITE_URL + '/thanks.html');
					document.title = data.filter('title').text();
					form[0].reset();
					$('main').html(data.filter('main').html());
					$('html, body').animate({
						scrollTop: 0
					}, 0);
				}
			}).always(function(){
				blockDoubleSubmit = false;
				$('#preloader-background, #preloader').remove();
			});
		}

		event.preventDefault();
	}
});

/**
 * Remove error class
 */

$(document).on('change', '.is-invalid[aria-describedby]', function(){
	$(this).removeClass('is-invalid');
});