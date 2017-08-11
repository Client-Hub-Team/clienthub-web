$(function(){

	// Bootstrap Tooltips
	$('[data-toggle="tooltip"]').tooltip();

	// Transform password fields into text fields to display the typed password.
	$('.input-password .feather').on('mousedown touchstart', function(e){
		e.preventDefault();
		$(this).removeClass('eye-off').addClass('eye');
		$(this).parent().find('input').attr('type', 'text').blur().focus();
	});
	$('.input-password .feather').on('mouseup touchend',function(e){
		e.preventDefault();
		$(this).removeClass('eye').addClass('eye-off');
		$(this).parent().find('input').attr('type', 'password').blur().focus();
	});
	$('.input-password .feather').on('mouseout',function(e){
		e.preventDefault();
		$(this).removeClass('eye').addClass('eye-off');
		$(this).parent().find('input').attr('type', 'password');
	});

	
	$.fn.isolatedScroll = function() {
	    this.bind('mousewheel DOMMouseScroll', function (e) {
	        var delta = e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail,
	            bottomOverflow = this.scrollTop + $(this).outerHeight() - this.scrollHeight >= 0,
	            topOverflow = this.scrollTop <= 0;

	        if ((delta < 0 && bottomOverflow) || (delta > 0 && topOverflow)) {
	            e.preventDefault();
	        }
	    });
	    return this;
	};

	$('.scrollable').isolatedScroll();

	var clientInfoHeaderWidth = $('.client-info-header').width();
	var clientInfoHeaderHeight = $('.client-info-header').height();
	var shouldStick = true;

	$(window).scroll(function(){

		var scrollPosition = $(window).scrollTop();

		if(scrollPosition > 1 && shouldStick == true){
			$('.client-info-header').before('<div class="client-info-header-placeholder" style="height:'+(clientInfoHeaderHeight+40)+'px"></div>');
			$('.client-info-header-row').slideUp(150);
			$('.client-info-header').css({
				"position": "fixed",
				"width": clientInfoHeaderWidth+30,
			});
			shouldStick = false;
		} 

		if(scrollPosition < 1 && shouldStick == false){
			setTimeout(function(){
				$('.client-info-header-placeholder').remove();
				$('.client-info-header').css({
					"position": "static",
					"width": "auto",
				});
			},150);
			$('.client-info-header-row').slideDown(150);
			
			shouldStick = true;
		}

	});

});