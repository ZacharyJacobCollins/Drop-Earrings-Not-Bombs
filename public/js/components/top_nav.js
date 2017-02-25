$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();
	    var target = this.hash;
	    var $target = $(target);
	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top-105
	    }, 900, "easeInOutCubic");
	});
  $('#go_to_top').on('click',function (e) {
      $('html, body').stop().animate({
          'scrollTop':0
      }, 900, "easeInOutCubic");
  });
});