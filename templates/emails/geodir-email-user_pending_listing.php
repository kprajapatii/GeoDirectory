<?php
// don't load directly
if ( !defined('ABSPATH') )
    die('-1');

do_action( 'geodir_email_header', $email_heading, $email_type, $email_vars, $sent_to_admin );

if ( ! empty( $message_body ) ) {
    echo wpautop( wptexturize( $message_body ) );
}

do_action( 'geodir_email_footer', $email_type, $email_vars, $sent_to_admin );