(function () {
    'use strict';

    /**
     * Config Variables
     */

    WORKAREA.config.slickSlider = {
        options: {
            prevArrow: JST['workarea/storefront/slick_slider/templates/slick_slider_nav_prev'](),
            nextArrow: JST['workarea/storefront/slick_slider/templates/slick_slider_nav_next'](),
            dotsClass: 'slick-slider__dots'
        },
        stopOnInteraction: false,
        waitForImages: false
    };
})();
