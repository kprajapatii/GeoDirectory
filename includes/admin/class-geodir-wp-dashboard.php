<?php
/**
 * Admin Dashboard
 *
 * @author      AyeCode
 * @category    Admin
 * @package     GeoDirectory/Admin
 * @version     2.1.0
 * @todo replace this with our GD Dashbaord addon
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'GeoDir_WP_Dashboard', false ) ) :

/**
 * GeoDir_WP_Dashboard Class.
 */
class GeoDir_WP_Dashboard {

	/**
	 * Hook in tabs.
	 */
	public function __construct() {
		// Only hook in admin parts if the user has admin access
		if ( current_user_can( 'manage_options' )  ) {
			add_action( 'wp_dashboard_setup', array( $this, 'init' ) );
		}
	}

	/**
	 * Init dashboard widgets.
	 */
	public function init() {
		if ( current_user_can( 'manage_options' ) ) {
			wp_add_dashboard_widget( 'geodir_dashboard_recent_reviews', __( 'GeoDirectory Recent Reviews', 'geodirectory' ), array( $this, 'recent_reviews' ) );
		}
		// wp_add_dashboard_widget( 'geodir_dashboard_status', __( 'GeoDirectory Status', 'geodirectory' ), array( $this, 'status_widget' ) ); // @todo Implement this after all addons converted to v2
	}

	/**
	 * Show status widget.
	 */
	public function status_widget() {
		// GD dashboard stats
	}

	/**
	 * Recent reviews widget.
	 */
	public function recent_reviews() {
		$recent_reviews = $this->recent_reviews_html();

		if ( !$recent_reviews ) {
			echo '<div class="no-activity">';
			echo '<p class="smiley" aria-hidden="true"></p>';
			echo '<p>' . __( 'There is no review yet!', 'geodirectory' ) . '</p>';
			echo '</div>';
		}
	}
	
	public function recent_reviews_html( $total_items = 5 ) {
		$reviews = geodir_get_recent_reviews( 50, $total_items, 140 );

		if ( ! empty( $reviews ) ) {
			echo '<div id="gd-latest-reviews" class="activity-block">';
				echo '<ul id="gd-review-list" data-wp-lists="list:comment">';
					echo $reviews;			
				echo '</ul>';
			echo '</div>';
		} else {
			return false;
		}
		return true;
	}
}

endif;

return new GeoDir_WP_Dashboard();
