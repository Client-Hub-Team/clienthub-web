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
	
});