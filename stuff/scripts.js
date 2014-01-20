/*
Créer Scripts

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

// as the page loads, call these scripts
jQuery(document).ready(function($) {

	/* FitVids -------------------------------------------------*/
	$("body").fitVids();


    /* Responsive -------------------------------------------------*/

    var responsive_viewport = $(window).width();
    
    if (responsive_viewport < 481) {
    
    }
    
    if (responsive_viewport > 481) {
        
    }
    
    if (responsive_viewport >= 768) {
    
        $('.comment img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });
        
    }
    
    if (responsive_viewport > 1030) {
        
    }
    
	/* Center images -------------------------------------------------*/
	var i = 0,
		animating = false,
		timer = 0,
		delay = 0;
		
	if($('#featured-wrap, .home .home-featured-wrap').attr('data-delay')) delay = $('#featured-wrap, .home .home-featured-wrap').attr('data-delay')*1000;
	
	if($('#featured-wrap, .home .home-featured-wrap').length){
		if($('#featured-wrap, .home .home-featured-wrap').length > 1){
			$('.feature-navigation').append('<a href="#" class="prev">Prev</a> <a href="#" class="next">Next</a>');
		}
		
		$('#featured-wrap, .home .home-featured-wrap .feature-navigation .next').bind('click', function(){
			if(!animating) next();
			return false;
		});
		$('#featured-wrap, .home .home-featured-wrap .feature-navigation .prev').bind('click', function(){
			if(!animating) prev();
			return false;
		});
		
		if(delay){
			clearTimeout(timer);
			timer = setTimeout(function(){ next(); }, delay);
		}
		
		$('#featured-wrap, .home .home-featured-wrap').imagesLoaded(function() {
			$('#featured-wrap, .home .home-featured-wrap').show();
			centerImgs();
			$('#featured-wrap:first-child, .home .home-featured-wrap:first-child').fadeIn(200);
		});
		if($.browser.msie && parseInt($.browser.version, 10) < 9){
			$('#featured-wrap:first-child, .home .home-featured-wrap:first-child').fadeIn(200); // imagesLoaded doesn't work in IE8
		}
		
		$(window).resize(function(){
        	centerImgs();
        });
	}
	
	function centerImgs() {
		$('#featured-wrap, .home .home-featured-wrap').each(function(){
			var img = $(this).find('img'),
			    vpWidth = $(window).width(),
			    vpHeight,
			    imgHeight = img.attr('height'),
		        imgWidth = img.attr('width'),
		        imgAspectRatio = imgWidth / imgHeight,
		        vpAspectRatio,
		        newImgWidth,
		        newImgHeight = vpWidth / imgAspectRatio;
  
		    if( vpWidth <= 660 ) {
		        vpHeight = 300;
		        newImgWidth = imgWidth * vpHeight / imgHeight;
		    } else if( vpWidth > 660 && vpWidth <= 1025 ) {
		        vpHeight = 400;
		        newImgWidth = imgWidth * vpHeight / imgHeight;
		    } else {
		        vpHeight = 600;
		        newImgWidth = imgWidth * vpHeight / imgHeight;
		    }
		    
		    vpAspectRatio = vpWidth / vpHeight;
		        					
			if( vpAspectRatio <= imgAspectRatio ) {
			    img.css({
			        'margin-top': 0,
			        'width': newImgWidth,
			        'height': '100%',
			        'margin-left': (vpWidth - newImgWidth)/2
			    });
		    } else {
			    img.css({
			        'width': '100%',
			        'height': newImgHeight,
			        'margin-left': 'auto',
			        'margin-top': (vpHeight - newImgHeight)/2
			    });
		    }
		});
	}
	
	/* Scroll to top -------------------------------------------------*/
    function creer_scroll_to_top() {
        var windowWidth = $(window).width(),
            didScroll = false;

        if( windowWidth > 1000 ) {
            var $freeride = $('#back-to-top');

            $freeride.hover(function() {
                $(this).animate({
                        opacity: 1
                    }, 300);
                }, function() {
                $(this).animate({
                    opacity: 0.7
                }, 300);
            });

            $freeride.click(function(e) {
                $('body,html').animate({ scrollTop: "0" });
                e.preventDefault();
            })

            $(window).scroll(function() {
                didScroll = true;
            });

            setInterval(function() {
                if( didScroll ) {
                    didScroll = false;

                    if( $(window).scrollTop() > 200 ) {
                        $freeride.css('display', 'block');
                    } else {
                        $freeride.css('display', 'none');
                    }
                }
            }, 250);
        }
    }
    creer_scroll_to_top();

    /* Fire all resize code ------------------------------------------*/
    $(window).resize(function() {
        creer_scroll_to_top();
    });	
 
}); /* end of as page load scripts */

    /*  Make Video/Audio Responsive ----------------------*/
    function creer_resize_media() {
        if( jQuery().jPlayer && jQuery('.jp-jplayer').length ){

            $(window).resize(function(){
                jQuery('.jp-jplayer').each(function(){
                    var player = $(this),
                        orig_width = player.attr('data-orig-width'),
                        orig_height = player.attr('data-orig-height'),
                        new_width = orig_width,
                        new_height = orig_height,
                        win_width = $(window).width();

                    // Set responsive width breakpoints here
                    if( win_width <= 992 ) {
                        new_width = 600;
                    }
                    if( win_width <= 600 ) {
                        new_width = 290;
                    }

                    new_height = Math.round((new_width / orig_width) * orig_height);

                    if(player.hasClass('jp-jplayer')) { 
                        player.jPlayer('option', 'size', { width: new_width, height: new_height });
                    }
                    if(player.hasClass('embed-video')) {
                        player.width(new_width).height(new_height);
                    }
                });
            });
            jQuery(window).trigger('resize'); // inital resize
        }
    }
    creer_resize_media();
    
/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );