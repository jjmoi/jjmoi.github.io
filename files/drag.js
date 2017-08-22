$(function() {
	$(this).on('mousedown', '#drag', function() {
		$(this).addClass('drag').parents().on('mousemove', function(e) {
			$('.drag').offset( {
				top: e.pageY - $('.drag').outerHeight() / 2,
				left: e.pageX - $('.drag').outerWidth() / 2
			}).on('mouseup', function() {
				$(this).removeClass('drag');
			});
		});
		e.preventDefault();
	}).on('mouseup', function() {
		$('.drag').removeClass('drag');
	});
});