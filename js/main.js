$(document).ready(function(){
	$(window).load(function(){
		// VARIABLES
		var $pageHeight = $(window).height(),
		$pageWidth = $(window).width(),
		$navHeight = $('header.main-header').outerHeight(),
		$footerHeight = $('footer.footer').outerHeight(),
		$mainWrapper = $('.wrapper-holder');

		// INITIATIONS
		AOS.init();

		// CUSTOM FUNCTIONS
		carouselAnimation();
		tableClass();
		mobileLayout();
		wrapperHolder( $pageHeight, $navHeight, $footerHeight );
		cf7formsubmit();


		$('.loader-overlay').fadeOut(200);
	});

	$(window).on('resize', function(){
		// VARIABLES
		var $pageHeight = $(window).height(),
		$pageWidth = $(window).width(),
		$navHeight = $('header.main-header').outerHeight(),
		$footerHeight = $('footer.footer').outerHeight(),
		$mainWrapper = $('.wrapper-holder');

		wrapperHolder( $pageHeight, $navHeight, $footerHeight );

	});
});

/* MODERNIZR LAYOUT - This serves as the the media query inside the Javascript */
// if( Modernizr.mq('(min-width: 1200px)') ) {
// }
// else if( Modernizr.mq('(min-width: 992px)') && Modernizr.mq('(max-width: 1199px)') ) {
// }
// else if( Modernizr.mq('(max-width: 991px)') && Modernizr.mq('(min-width: 768px)')){
// }
// else{
// }

// FUNCTION LISTS
/*
* Method smooth scrolls to given anchor point
*/
function smoothScrollTo(anchor) {
	var duration = 400; //time (milliseconds) it takes to reach anchor point
	var targetY = $(anchor).offset().top;
	$("html, body").animate({
		"scrollTop" : targetY
	}, duration, 'easeInOutCubic');
}

function carouselAnimation(){
	/* Demo Scripts for Bootstrap Carousel and Animate.css article
	* on SitePoint by Maria Antonietta Perna
	*/
  //Function to animate slider captions 
  function doAnimations( elems ) {
    //Cache the animationend event in a variable
    var animEndEv = 'webkitAnimationEnd animationend';
    
    elems.each(function () {
      var $this = $(this),
        $animationType = $this.data('animation');
      $this.addClass($animationType).one(animEndEv, function () {
        $this.removeClass($animationType);
      });
    });
  }
  
  //Variables on page load 
  var $myCarousel = $('.carousel'),
    $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
      
  //Initialize carousel 
  $myCarousel.carousel();
  
  //Animate captions in first slide on page load 
  doAnimations($firstAnimatingElems);
  
  //Pause carousel  
  $myCarousel.carousel('pause');
  
  
  //Other slides to be animated on carousel slide event 
  $myCarousel.on('slide.bs.carousel', function (e) {
    var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
    doAnimations($animatingElems);
  });

  $('.carousel').carousel();
}

function tableClass(){
	var $tables = $(document).find('table');
	if( $tables ) {
		$tables.wrap('<div class="table-responsive"></div>');
		$tables.addClass('table');
	}
}
function wrapperHolder( $pageHeight, $navHeight, $footerHeight ){
	$('.wrapper-holder').css({
		'min-height': $pageHeight - $navHeight,
		'margin-top': $navHeight,
		'padding-bottom': $footerHeight
	});
	$('.main-layout').css({
		'min-height': $pageHeight - ( $navHeight + $footerHeight ),
	});
}
function mobileLayout(){
	// MOBILE MENU LAYOUT
	$('.sidepanel .menu > .menu-item-has-children').addClass('dropdown row-size');
	$('.sidepanel .menu > .menu-item-has-children > a').each(function(){
		var $curr = $(this);
		$curr.addClass('column-top nav-title');
		$('<span class="fa fa-plus dropdown-toggle nav-control column-top" data-toggle="dropdown" style="min-height: '+ $curr.outerHeight() +'px;"></span>').insertAfter( $curr );			
	});
	$('.sidepanel .menu > .menu-item-has-children > .sub-menu').addClass('dropdown-menu');
	// MOBILE MENU
	if(!$('.sidepanel').hasClass('sidepanel-out')){
		$('.close-sidemenu').hide();
	}
	$('.mobile-menu-btn').click(function(){
		$('.sidepanel').toggleClass("sidepanel-out" , 1000);
		$(this).toggleClass('toggle-mobile-menu', 1000);
		if(!$('.sidepanel').hasClass('sidepanel-out')){
			$('.close-sidemenu').hide();
		} else {
			$('.close-sidemenu').show();
		}
	});
	$('.close-sidemenu').click(function(){
		$('.sidepanel').toggleClass("sidepanel-out", 1000);
		$(this).hide();
	});
	$('.sidepanel li a').click(function(){
		$(this).find('.fa-plus').toggleClass('fa-minus');
	});

	// BACK TO TOP
	$('.back-to-top').hide(); // HIDE ON FIRST LOAD
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.back-to-top').fadeIn();
		} else {
			$('.back-to-top').fadeOut();
		}
	});
	$('.back-to-top a').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
}
function cf7formsubmit(){
	var sitelink = $('.usd').data('usdacct');
	document.addEventListener( 'wpcf7mailsent', function( event ) {
	  location = sitelink + '/thank-you/';
	}, false );
}