/* Créer Responsive Menu
-------------------------------------------------------------- */

var ww = document.body.clientWidth;

jQuery(document).ready(function() {
  jQuery(".nav li a").each(function() {
    if (jQuery(this).next().length > 0) {
    	jQuery(this).addClass("parent");
		};
	})
	
	jQuery(".toggleMenu").click(function(e) {
		e.preventDefault();
		jQuery(this).toggleClass("active");
		jQuery(".nav").toggle();
	});
	adjustMenu();
})

jQuery(window).bind('resize orientationchange', function() {
	ww = document.body.clientWidth;
	adjustMenu();
});

var adjustMenu = function() {
	if (ww < 992) {
    // if "more" link not in DOM, add it
    if (!jQuery(".more")[0]) {
    jQuery('<div class="more">&nbsp;</div>').insertBefore(jQuery('.parent')); 
    }
		jQuery(".toggleMenu").css("display", "inline-block");
		if (!jQuery(".toggleMenu").hasClass("active")) {
			jQuery(".nav").hide();
		} else {
			jQuery(".nav").show();
		}
		jQuery(".nav li").unbind('mouseenter mouseleave');
		jQuery(".nav li a.parent").unbind('click');
    jQuery(".nav li .more").unbind('click').bind('click', function() {
			
			jQuery(this).parent("li").toggleClass("hover");
		});
	} 
	else if (ww >= 992) {
    // remove .more link in desktop view
    jQuery('.more').remove(); 
		jQuery(".toggleMenu").css("display", "none");
		jQuery(".nav").show();
		jQuery(".nav li").removeClass("hover");
		jQuery(".nav li a").unbind('click');
		jQuery(".nav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	// must be attached to li so that mouseleave is not triggered when hover over submenu
		 	jQuery(this).toggleClass('hover');
		});
	}
}