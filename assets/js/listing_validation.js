/**
 * Validate add listing fields.
 *
 * @param field
 * @returns {boolean}
 */
function geodir_validate_field(field) {

    var is_error = true;
    switch (jQuery(field).attr('field_type')) {
        case 'radio':
        case 'checkbox':

            if (jQuery(field).closest('.required_field').find('#cat_limit').length) {

                var cat_limit = jQuery(field).closest('.required_field').find('#cat_limit').attr('cat_limit');
                var cat_msg = jQuery(field).closest('.required_field').find('#cat_limit').val();

                if (jQuery(field).closest('.required_field').find(":checked").length > cat_limit && cat_limit > 0) {

                    jQuery(field).closest('.required_field').find('.geodir_message_error').show();
                    jQuery(field).closest('.required_field').find('.geodir_message_error').html(cat_msg);
                    return false;

                }

            }

            if (jQuery(field).closest('.required_field').find(":checked").length > 0) {
                is_error = false;
            }
            break;

        case 'select':
            if (jQuery(field).closest('.geodir_form_row').find(".geodir_taxonomy_field").length > 0 && jQuery(field).closest('.geodir_form_row').find("#post_category").length > 0) {
                if (jQuery(field).closest('.geodir_form_row').find("#post_category").val() != '') {
                    is_error = false;
                }
            } else {
                if (jQuery(field).find("option:selected").length > 0 && jQuery(field).find("option:selected").val() != '') {
                    is_error = false;
                }
            }
            break;

        case 'multiselect':
            if (jQuery(field).closest('.required_field').find('#cat_limit').length) {

                var cat_limit = jQuery(field).closest('.required_field').find('#cat_limit').attr('cat_limit');
                var cat_msg = jQuery(field).closest('.required_field').find('#cat_limit').val();

                if (jQuery(field).find("option:selected").length > cat_limit && cat_limit > 0) {
                    jQuery(field).closest('.required_field').find('.geodir_message_error').show();
                    jQuery(field).closest('.required_field').find('.geodir_message_error').html(cat_msg);
                    return false;

                }

            }

            if (jQuery(field).find("option:selected").length > 0) {
                is_error = false;
            }


            break;

        case 'email':
            var filter = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (field.value != '' && filter.test(field.value)) {
                is_error = false;
            }
            break;

        case 'url':
            var filter = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            if (field.value != '' && filter.test(field.value)) {
                is_error = false;
            }
            break;

        case 'editor':
            if (jQuery('#' + jQuery(field).attr('field_id')).val() != '') {
                is_error = false;
            }
            break;

        case 'datepicker':
        case 'time':
        case 'text':
        case 'textarea':
            if (field.value != '') {
                is_error = false;
            }
            break;

        case 'address':

            if (jQuery(field).attr('id') == 'post_latitude' || jQuery(field).attr('id') == 'post_longitude') {

                if (/^[0-90\-.]*$/.test(field.value) == true && field.value != '') {
                    is_error = false;
                } else {

                    var error_msg = geodir_params.latitude_error_msg;
                    if (jQuery(field).attr('id') == 'post_longitude')
                        error_msg = geodir_params.longgitude_error_msg;

                    jQuery(field).closest('.required_field').find('.geodir_message_error').show();
                    jQuery(field).closest('.required_field').find('.geodir_message_error').html(error_msg);

                }

            } else {

                if (field.value != '')
                    is_error = false;
            }

            break;

        default:
            if (field.value != '') {
                is_error = false;
            }
            break;

    }


    if (is_error) {
        if (jQuery(field).closest('.required_field').find('span.geodir_message_error').html() == '') {
            jQuery(field).closest('.required_field').find('span.geodir_message_error').html(geodir_params.field_id_required)
        }

        jQuery(field).closest('.required_field').find('span.geodir_message_error').fadeIn();

        return false;
    } else {

        jQuery(field).closest('.required_field').find('span.geodir_message_error').html('');
        jQuery(field).closest('.required_field').find('span.geodir_message_error').fadeOut();

        return true;
    }
}

/**
 * Validate all required fields before submit.
 *
 * @returns {boolean}
 */
function geodir_validate_submit(form){
    var is_validate = true;

    jQuery(form).find(".required_field:visible").each(function () {
        jQuery(form).find("[field_type]:visible, .chosen_select, .geodir_location_add_listing_chosen, .editor, .event_recurring_dates, .geodir-custom-file-upload").each(function () {

            if (jQuery(this).is('.chosen_select, .geodir_location_add_listing_chosen')) {
                var chosen_ele = jQuery(this);
                jQuery('#' + jQuery(this).attr('id') + '_chzn').mouseleave(function () {
                    geodir_validate_field(chosen_ele);
                });

            }
            if (!geodir_validate_field(this))
                is_validate = geodir_validate_field(this);
        });
    });

    return false;// @todo remove


    if (is_validate) {
        return true;
    } else {

        jQuery(window).scrollTop(jQuery(".geodir_message_error:visible:first").closest('.required_field').offset().top);
        return false;
    }
}

jQuery(document).ready(function () {

    /// check validation on blur
    jQuery('#geodirectory-add-post').find(".required_field:visible").find("[field_type]:visible, .editor textarea").blur(function () {
        geodir_validate_field(this);
    });

    // Check for validation on click for checkbox, radio
    jQuery('#geodirectory-add-post').find(".required_field:visible").find("input[type='checkbox'],input[type='radio']").click(function () {
        geodir_validate_field(this);
    });


    /*jQuery('#geodirectory-add-post').submit(function(ele){*/
    jQuery(document).delegate("#geodirectory-add-post", "submit", function (ele) {
        return geodir_validate_submit(this);
    });
});
