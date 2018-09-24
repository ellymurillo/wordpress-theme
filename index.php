<?php get_header(); ?>
	<section class="main-layout inner-page-layout">
		<h1 class="hidden"><?php the_title(); ?></h1>
		<div class="default-container">
			<div class="container"><div class="row">
				<div class="col-xs-12">
					<div class="page-title"><?php the_title(); ?></div>
				</div>
				<div class="col-xs-12"><?php the_content(); ?></div>
			</div></div>
		</div>
	</section>
<?php get_footer(); ?>