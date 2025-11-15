<?php
/**
 * Server-side rendering for the carousel block
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Returns the rendered carousel block.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$block_id = isset( $attributes['blockID'] ) ? $attributes['blockID'] : '';
$loop = isset( $attributes['loop'] ) ? $attributes['loop'] : false;
$item_per_desktop = isset( $attributes['itemPerDesktop'] ) ? $attributes['itemPerDesktop'] : 1;
$item_per_tab = isset( $attributes['itemPerTab'] ) ? $attributes['itemPerTab'] : 1;
$item_per_mobile = isset( $attributes['itemPerMobile'] ) ? $attributes['itemPerMobile'] : 1;
$autoplay = isset( $attributes['autoplay'] ) ? $attributes['autoplay'] : false;
$dots = isset( $attributes['dots'] ) ? $attributes['dots'] : true;
$nav = isset( $attributes['nav'] ) ? $attributes['nav'] : false;
$margin = isset( $attributes['margin'] ) ? $attributes['margin'] : 0;
$prev_btn_svg = isset( $attributes['prevBtnSvg'] ) ? $attributes['prevBtnSvg'] : '';
$next_btn_svg = isset( $attributes['nextBtnSvg'] ) ? $attributes['nextBtnSvg'] : '';

$carousel_id = 'ekwa-' . esc_attr( $block_id ) . '-carousel';
$carousel_class = 'owl-carousel owl-theme ' . $carousel_id;

// Get wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => $carousel_class,
) );

// Prepare carousel settings
$carousel_settings = array(
	'nav_id'          => $block_id,
	'class'           => $carousel_id,
	'loop'            => $loop,
	'per_page_desktop' => $item_per_desktop,
	'per_page_tab'    => $item_per_tab,
	'per_page_mobile' => $item_per_mobile,
	'autoplay'        => $autoplay,
	'dots'            => $dots,
	'navigation'      => $nav,
	'margin'          => $margin,
);
?>

<script>
	owlSettings.push(<?php echo wp_json_encode( $carousel_settings ); ?>);
</script>
<div class="owl-bzgrw-hide ekwa-carousel-wrapper">
	<div <?php echo $wrapper_attributes; ?>>
		<?php echo $content; ?>
	</div>

	<?php if ( ! empty( $prev_btn_svg ) ) : ?>
		<span class="ekwa-<?php echo esc_attr( $block_id ); ?>-prev ekwa-owl-prev">
			<?php
			// Allow SVG tags for navigation icons
			$allowed_svg = array(
				'svg' => array(
					'xmlns' => true,
					'height' => true,
					'viewbox' => true,
					'width' => true,
					'fill' => true,
					'class' => true,
				),
				'path' => array(
					'd' => true,
					'fill' => true,
					'stroke' => true,
					'stroke-width' => true,
				),
			);
			echo wp_kses( $prev_btn_svg, $allowed_svg );
			?>
		</span>
	<?php endif; ?>

	<?php if ( ! empty( $next_btn_svg ) ) : ?>
		<span class="ekwa-<?php echo esc_attr( $block_id ); ?>-next ekwa-owl-next">
			<?php echo wp_kses( $next_btn_svg, $allowed_svg ); ?>
		</span>
	<?php endif; ?>
</div>
