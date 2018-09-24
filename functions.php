<?php

//=============== AFTER THEME SETUP ===============//
if (!function_exists( 'custom_setup' ) ) {
	function custom_setup() { 
		
		/* MENU */
		register_nav_menu('primary', __('Primary Navigation', 'sytian'));
				
		/* THEME SUPPORTS */
		add_theme_support( 'post-thumbnails' );
		
		/* WIDGETS SECTION */
		register_sidebar( array(
			'name'          => __( 'Left Sidebar', 'redrock' ),
			'id'            => 'sidebar-default-left',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		) );
		register_sidebar( array(
			'name'          => __( 'Right Sidebar', 'redrock' ),
			'id'            => 'sidebar-default-right',
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		) );
	}
}
add_action('after_setup_theme', 'custom_setup');

//=============== REMOVE ADMIN BAR ===============// 
if( is_user_logged_in() ) :
	$user = wp_get_current_user();
	if( $user->roles[0] == 'subscriber' ) :
		add_filter('show_admin_bar', '__return_false');
	endif;
endif;

//=============== ENQUEUE NEEDED STYLES AND SCRIPTS ===============//
function sytian_scripts() {
	wp_deregister_script( 'jquery' );
	
	// Enqueue Bootstrap
	wp_enqueue_style('bootstrap', get_template_directory_uri() . '/css/bootstrap.css');
	wp_enqueue_style('fontawesome', get_template_directory_uri() . '/css/fontawesome.css');

	wp_enqueue_style('aos-css', get_template_directory_uri() . '/css/vendor/aos.css');
	wp_enqueue_style('animate-css', get_template_directory_uri() . '/css/vendor/animate.css');
	wp_enqueue_style('hover-css', get_template_directory_uri() . '/css/vendor/hover.css');
	
	wp_enqueue_style('main', get_template_directory_uri() . '/css/main.css');
	wp_enqueue_style('style', get_template_directory_uri() . '/style.css');

	// Enqueue modernizr
	wp_enqueue_script('modernizr', get_template_directory_uri() . '/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js', array(), '2.6.2');

	// Enqueue JQuery and Bootstrap JS
	wp_enqueue_script('jquery', get_template_directory_uri() . '/js/vendor/jquery-1.11.0.min.js', array(), '1.11.0', false);
	wp_enqueue_script('jquery-ui', get_template_directory_uri() . '/js/vendor/jquery-ui.js', array(), '1', false);
	wp_enqueue_script('bootstrap-js', get_template_directory_uri() . '/js/vendor/bootstrap.min.js', array('jquery'), '3.2.0', true);

	// Enqueue CAROUFREDSEL
	wp_enqueue_script('caroufredsel', get_template_directory_uri() . '/js/vendor/jquery.carouFredSel-6.2.1-packed.js', array('jquery'), '1', true);

	// Enqueue Animate on Scroll https://michalsnik.github.io/aos/
	wp_enqueue_script('aos-js', get_template_directory_uri() . '/js/vendor/aos.js', array('jquery'), '1', true);

	// Enqueue ACF MAP
	// wp_enqueue_script('googlemap-cdn', 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=AIzaSyAndyu7BmkarXX8as7eDSIJ3hGa7Xr1TO0#asyncload', array('jquery'), '1', true);
	// wp_enqueue_script('acf-main-js', get_template_directory_uri() . '/js/vendor/acf-google-map.js', array('jquery'), '1', true);
	
	// Enqueue Plugins and Main JS
	// wp_enqueue_script('plugins-js', get_template_directory_uri() . '/js/plugins.js', array('jquery'), '1', true);
	wp_enqueue_script('main-js', get_template_directory_uri() . '/dist/main.js', array('jquery'), '1', true);
}
add_action('wp_enqueue_scripts', 'sytian_scripts');


//=============== CREATE A NICELL FORMATED TITLE ===============//
function custom_title($title, $sep) {
	global $paged, $page;

	if (is_feed()) {
		return $title;
	}

	// Add the site name.
	$title .= get_bloginfo('name', 'display');

	// Add a page number if necessary.
	if (( $paged >= 2 || $page >= 2 ) && !is_404()) {
		$title = "$title $sep " . sprintf(__('Page %s', 'custom'), max($paged, $page));
	}

	return $title;
}
add_filter('wp_title', 'custom_title', 10, 2);

//=============== EXCERPT CONTENT ===============//
function excerpt_content($contents,$limit) {
	$content = explode(' ', $contents, $limit);
	if (count($content)>=$limit) {
		array_pop($content);
		$content = implode(" ",$content).'...';
	} else {
		$content = implode(" ",$content);
	}	
	$content = preg_replace('/\[.+\]/','', $content);
	$content = apply_filters('the_content', $content);
	$content = str_replace(']]>', ']]&gt;', $content);
	
	return $content;
}

//=============== ACF PRO OPTIONS v2 ===============//
// if( function_exists('acf_add_options_page') ) {
// 	// MAIN OPTION PAGE
// 	$parent = acf_add_options_page(array(
// 		'page_title' => 'Theme Settings',
// 		'menu_title' => 'Theme Settings',
// 		'redirect' => true,
// 		'capability' => 'admin_capability'
// 	));
// 	// SUB OPTION PAGE
// 	acf_add_options_sub_page(array(
// 		'page_title' => 'Default Settings',
// 		'menu_title' => 'Default Settings',
// 		'parent_slug' => $parent['menu_slug']
// 	));
// }
