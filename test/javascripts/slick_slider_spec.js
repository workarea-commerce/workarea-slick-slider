//= require workarea/storefront/spec_helper
//= require workarea/storefront/slick_slider/config
//= require workarea/storefront/slick_slider/modules/slick_slider

(function () {
    'use strict';

    describe('WORKAREA.slickSlider', function () {

        describe('init', function () {

            it('inits slick slider on element', function () {
                this.fixtures = fixture.load('slick_slider.html');

                var $slickSlider = $('[data-slick-slider]', this.fixtures);

                WORKAREA.slickSlider.init(this.fixtures);

                expect($slickSlider.is('.slick-initialized')).to.equal(true);

                expect($slickSlider.children('.slick-slider__nav').length).to.equal(2);
            });

            it('inits slick slider with options on element', function () {
                this.fixtures = fixture.load('slick_slider_with_options.html');

                var $slickSlider = $('[data-slick-slider]', this.fixtures);

                WORKAREA.slickSlider.init(this.fixtures);

                expect($slickSlider.children('.slick-slider__nav').length).to.equal(0);

                expect($slickSlider.children('.slick-slider__dots').length).to.equal(1);
            });
        });
    });
}());
