/**
 * @namespace WORKAREA.slickSlider
 */
WORKAREA.registerModule('slickSlider', (function () {
    'use strict';

    var checkImagesAndLoad = function(loadCount, imageCount, $slider, options) {
            if (loadCount === imageCount) {
                $slider.slick(options)
                .addClass('slick-slider--images-loaded')
                .removeClass('slick-slider--waiting-for-images');
            }
        },

        waitForImages = function($slider, options) {
            var $images = $('img', $slider),
                imageCount = $images.length,
                loadCount = 0;

            $slider.addClass('slick-slider--waiting-for-images');
            $images.each(function(index, image){
                if ( $(image).prop('complete') ) {
                    loadCount ++;
                    checkImagesAndLoad(loadCount, imageCount, $slider, options);
                } else {
                    $(image).on('load', function() {
                        loadCount ++;
                        checkImagesAndLoad(loadCount, imageCount, $slider, options);
                    });
                }
            });
        },

        getConfig = function(options) {
            return _.merge({}, WORKAREA.config.slickSlider, options);
        },

        stopAutoplay = function(event) {
            $(event.currentTarget).slick('slickPause');
        },

        initSlider = function(index, slider) {
            var $slider = $(slider),
                slickSettings = getConfig($slider.data('slickSlider'));

            if ( slickSettings.waitForImages ) {
                waitForImages($slider, slickSettings.options);
            } else {
                $slider.slick(slickSettings.options);
            }

            if (slickSettings.stopOnInteraction) {
                $slider.on('click swipe', stopAutoplay);
            }

            WORKAREA.slickSliderAnalytics.initSliderAnalytics($slider);
        },

        /**
         * @method
         * @name init
         * @memberof WORKAREA.slickSlider
         */
        init = function ($scope) {
            $('[data-slick-slider]', $scope).each(initSlider);
        };

    return {
        init: init
    };
}()));
