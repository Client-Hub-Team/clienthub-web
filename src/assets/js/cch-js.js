/*!
 * jQuery Mousewheel 3.1.13
 */
// !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});


/*
 *  CODE THAT IS EXECUTED BY TRIGGERS LIKE CLICK, SCROLL, ETC
 *  works on $(document).on(event, element, function(){...
 */

$(function(){

	// Show password
	$(document).on('click', '.input-password .feather', function(e){
		$(this).parent().find('input').focus();
		e.preventDefault();
		if( $(this).hasClass('eye') ) {
			$(this).removeClass('eye').addClass('eye-off');
			$(this).parent().find('input').attr('type', 'password');
		} else {
			$(this).removeClass('eye-off').addClass('eye');
			$(this).parent().find('input').attr('type', 'text');
		}
	});


	// Prevent body scroll when scrolling the clients list
	// $.fn.isolatedScroll = function() {
	//     this.bind('mousewheel DOMMouseScroll', function (e) {
	//         var delta = e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail,
	//             bottomOverflow = this.scrollTop + $(this).outerHeight() - this.scrollHeight >= 0,
	//             topOverflow = this.scrollTop <= 0;

	//         if ((delta < 0 && bottomOverflow) || (delta > 0 && topOverflow)) {
	//             e.preventDefault();
	//         }
	//     });
	//     return this;
	// };
	// $('.scrollable').isolatedScroll();


	// Apps management horizontal scrolling
	// $(document).on('mousewheel', '.manage-apps-row', function(event, delta) {
	// 	this.scrollLeft -= (delta * 60);
	// 	event.preventDefault();
	// });


	// Sticky Client Info Header
	shouldStick = true;
	$(document).on('scroll', $(window), function(){
		scrollPosition = $(window).scrollTop();
		if(scrollPosition > 0 && shouldStick == true){
			clientInfoHeaderWidth = $('.client-info-header').outerWidth();
			clientInfoHeaderHeight = $('.client-info-header').outerHeight()-15;
			$('.client-info-header').before('<div class="client-info-header-placeholder" style="height:'+(clientInfoHeaderHeight)+'px"></div>');
			$('.client-info-header-row').slideUp(150);
			$('.client-info-header').css({
				"position": "fixed",
				"width": clientInfoHeaderWidth,
			});
			shouldStick = false;
		} 
		if(scrollPosition == 0 && shouldStick == false){
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

	// Sticky Practice Info Preview
	shouldStickPreview = true;
	$(document).on('scroll', $(window), function(){
		scrollPosition = $(window).scrollTop();
		if( $('.fix-preview').length ) {
			if(scrollPosition > $('.fix-preview-title').offset().top - 70 && shouldStickPreview == true){
				elementWidth = $('.fix-preview').outerWidth();
				elementHeight = $('.fix-preview').outerHeight();
				$('.fix-preview').before('<div class="fix-preview-placeholder" style="height:'+(elementHeight)+'px"></div>');
				$('.fix-preview').css({
					"position": "fixed",
					"top": "100px",
					"width": elementWidth,
				});
				shouldStickPreview = false;
			} 
			if(scrollPosition < $('.fix-preview-title').offset().top -70 && shouldStickPreview == false){
				$('.fix-preview-placeholder').remove();
				$('.fix-preview').css({
					"position": "static",
					"width": "auto",
				});
				shouldStickPreview = true;
			}
		}
	});


	// Client Info Header Tabs 
	$(document).on('click', 'a[data-tab]', function(e){
		e.preventDefault(); e.stopPropagation();
		var selectedTabIndex = $(this).attr('data-tab');

		if(!$(this).closest('.tab-template').length) {
			$('.tabs a').removeClass('active');
			$('.tabs a[data-tab='+selectedTabIndex+']').addClass('active');
	
			$('.tab-template').removeClass('active');
			$('.tab-template[data-tab='+selectedTabIndex+']').addClass('active');

			$('body').animate({scrollTop:0},0);
		}
	});

	
});


/*
 *  CODE THAT SHOULD BE EXECUTED ON LOAD OR AFTER VIEW/ROUTE CHANGE
 *  "exec" is called on ngAfterViewInit()
 */

$(document).on('exec refreshColorContrast', function(){

	function contrastingColor(color){
		return (luma(color) >= 165) ? 'dark' : 'light';
	}
	
	function luma(color){
		// color can be a hx string or an array of RGB values 0-255
		var rgb = (typeof color === 'string') ? hexToRGBArray(color) : color;
		return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]); // SMPTE C, Rec. 709 weightings
	}
	

	// Adjust color contrast on client view based on brand background color
	if($('.header-bar-client-view').length){ // if in client view
		var bgColor = $('.header-bar-client-view').css('background-color'); // Get rgb(0,0,0) value
		var bgColorArray = bgColor.substring(4, bgColor.length-1).replace(/ /g, '').split(',');  // Convert to rgba array [0,0,0]
		if( contrastingColor(bgColorArray) == "dark" ) {
			$('.header-bar-client-view').removeClass('bg-dark');
			$('.header-bar-client-view').addClass('bg-light');
		} else {
			$('.header-bar-client-view').removeClass('bg-light');
			$('.header-bar-client-view').addClass('bg-dark');
		}
	}

});