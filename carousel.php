<?php
/**
 * Plugin Name:       Ekwa owl carousel
 * Description:       A Gutenberg block to show carousel
 * Version:           0.1.1
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            Sameera
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       Before After Block
 *
 * @package           create-block
 */


require 'includes/plugin-update-checker/plugin-update-checker.php';
use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

$myUpdateChecker = PucFactory::buildUpdateChecker(
	'https://github.com/agskanchana/Ekwa-owl-carousel/',
	__FILE__,
	'ekwa-owl-carousel'
);

function create_block_carousel_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_carousel_block_init' );


function owl_settings(){
    ?>
    <script>
        var owlSettings = [];
    </script>
    <?php
}
add_action('wp_head', 'owl_settings');

if(!function_exists('before_after_scripts_array')){
    function before_after_scripts_array(){
        ?>
        <script>
            var beforeAfterScripts  = [];
            var beforeAfterStyles = [];
            function beforeAfterInsertScripts(e){if(!function e(t){for(var r=document.getElementsByTagName("script"),n=r.length;n--;)if(r[n].src==t)return!0;return!1}(e)){var t=document.getElementsByTagName("head")[0],r=document.createElement("script");r.type="text/javascript",r.src=e,t.appendChild(r)}}function beforeAfterInsertStyles(e,t){if(!document.getElementById(t)){var r=document.createElement("link");r.href=e,r.id=t,r.type="text/css",r.rel="stylesheet",document.getElementsByTagName("head")[0].appendChild(r)}}
        </script>
        <?php
     }
}

 add_action('wp_head', 'before_after_scripts_array');


function owl_carousel_scripts_inject(){
    ?>
        <script>
			 var PluginDirBA = '<?php echo plugin_dir_url( __FILE__ );?>';

			console.log(PluginDirBA);
         var  owlScriptFile = PluginDirBA + 'assets/owl-carousel/owl.carousel.min.js';
         var  beforeAfterStyleSheet =  {
            "link" : PluginDirBA + 'assets/owl-carousel/css/owl.carousel.min.css',
            "handle" : "owlCarouselCss"
          }

          beforeAfterScripts.push(owlScriptFile);
          beforeAfterStyles.push(beforeAfterStyleSheet);

        // Function to check if jQuery is loaded and inject scripts
        function loadOwlCarouselAfterJquery(retries) {
            retries = retries || 0;

            if (typeof jQuery !== 'undefined') {
                // jQuery is loaded, inject scripts
                beforeAfterScripts.forEach(function(e){
                    beforeAfterInsertScripts(e);
                });
                beforeAfterStyles.forEach(function(array){
                    beforeAfterInsertStyles(array.link, array.handle);
                });
            } else if (retries < 160) { // Max 8 seconds (160 * 50ms)
                // jQuery not loaded yet, wait and retry
                setTimeout(function() {
                    loadOwlCarouselAfterJquery(retries + 1);
                }, 50);
            } else {
                console.error('Owl Carousel: jQuery failed to load after 8 seconds');
            }
        }

        window.onscroll = function(e) {
            loadOwlCarouselAfterJquery();
            window.onscroll = null;
        }

        var howManyBA = 1
        document.onmousemove = (function() {
            if (howManyBA == 1) {
                loadOwlCarouselAfterJquery();
            }
            howManyBA++;
        });
        </script>
    <?php
}

add_action('wp_footer', 'owl_carousel_scripts_inject');