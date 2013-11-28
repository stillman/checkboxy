/**
 * Checkboxy, a simple jQuery checkbox plug-in
 * Version 1.0.0
 * Copyright 2013, Dmitry Stillman (https://github.com/stillman)
 * Licensed under GPL v3
 */
(function($) {

$.fn.checkboxy = function(options) {
	function deinit() {
		// Remove event handlers
		$('input.' + options.class + '[data-checkboxy-el-id]').off('change.checkboxy');
	}

	function init() {
		// Remove old event handlers (if any)
		deinit();

		$(options.tagname + '.' + options.class).on('click', function(evt) {
			if ($(this).closest('label').length) {
				// There is a <label> around the element
				return true;
			}

			$input = $('input.' + options.class + '[data-checkboxy-el-id="' + $(this).data('checkboxy-el-id') + '"]');

			if (!$input.prop('disabled')) {
				$input.trigger('change');
			}
		});

		// Add event handlers
		$('input.' + options.class + '[data-checkboxy-el-id]').on('change.checkboxy', function() {
			$(options.tagname + '.' + options.class + '[data-checkboxy-el-id="' + $(this).data('checkboxy-el-id') + '"]').toggleClass('checked');
		});
	}

	options = $.extend({}, {
		tagname: 'span',
		class: 'checkboxy'
	}, options);

	$(options.tagname + '.' + options.class).remove();

	this.each(function() {
		var id = new Date().getTime();
		var $input = $(this);
		var $checkboxy = $('<' + options.tagname + '/>').addClass(options.class);

		$input
			.attr('data-checkboxy-el-id', id)
			.addClass(options.class)
			.hide();

		if ($input.prop('checked')) {
			$checkboxy.addClass('checked');
		}

		if ($input.prop('disabled')) {
			$checkboxy.addClass('disabled');
		}

		$checkboxy
			.attr('data-checkboxy-el-id', id)
			.insertBefore(this);
	});

	init();

	return this;
};

})(jQuery);