/**
 * @namespace WORKAREA.slickSliderAnalytics
 */
WORKAREA.registerModule('slickSliderAnalytics', (function () {
    'use strict';

    var sendSwipeAnalyticsEvent = function (changeEvent, direction, currentSlide) {
            WORKAREA.analytics.fireCallback('sliderSwipeEvent', {
                domEvent: 'swipe',
                payload: {
                    eventAction: 'swipe',
                    eventCategory: 'swipe',
                    eventTarget: changeEvent.delegateTarget,
                    eventDirection: direction,
                    eventCurrentSlide: currentSlide
                }
            });
        },

        swipeAnalyticsHandler = function(event, slider, direction) {
            // Using one here allows each slide to be bound to the event only the first time the slide changes
            // rather than continuing to be bound for later changes resulting in resending the analytics event
            // multiple times as the slides keep changing
            $(event.currentTarget).one('afterChange', function(changeEvent, slick, currentSlide) {
                sendSwipeAnalyticsEvent(changeEvent, direction, currentSlide);
            });
        },

        sendAnalytics = function(analytics) {
            WORKAREA.analytics.fireCallback('sliderClickEvent', analytics);
        },

        setUpAnalyticsData = function(event) {
            var analytics = {
                    domEvent: 'click',
                    payload: {
                        eventCategory: 'click'
                    }
                };

            if (event.data.target === '.slick-current') {
                _.merge(analytics.payload, {
                    eventTarget: event.delegateTarget,
                    eventCurrentSlide: $(event.currentTarget).data('slickIndex')
                });
            } else {
                // Using one here allows each slide to be bound to the event only the first time the slide changes
                // rather than continuing to be bound for later changes resulting in resending the analytics event
                // multiple times as the slides keep changing
                $(event.delegateTarget).one('afterChange', { eventTarget: event.currentTarget, target: event.data.target }, function(changeEvent, slick, currentSlide) {
                    analytics.payload.eventAction = 'dots click';

                    if (changeEvent.data.target === '.slick-slider__nav') {
                        analytics.payload.eventAction = 'navigation click';
                        analytics.payload.direction = 'left';

                        if ($(changeEvent.data.eventTarget).hasClass('slick-slider__nav--prev')) {
                            analytics.payload.direction = 'right';
                        }
                    }

                    _.merge(analytics.payload, {
                        eventTarget: changeEvent.delegateTarget,
                        eventClickTarget: changeEvent.data.eventTarget,
                        eventCurrentSlide: currentSlide
                    });
                });
            }

            sendAnalytics(analytics);
        },

        /**
         * @method
         * @name init
         * @memberof WORKAREA.slickSliderAnalytics
         */
        initSliderAnalytics = function ($slider) {
            $slider.on('swipe', swipeAnalyticsHandler)
                   .on('click', '.slick-slider__nav', { target: '.slick-slider__nav' }, setUpAnalyticsData)
                   .on('click', '.slick-slider__dots button', { target: '.slick-slider__dots button' }, setUpAnalyticsData)
                   .on('click', '.slick-current', { target: '.slick-current' }, setUpAnalyticsData);
        };

    return {
        initSliderAnalytics: initSliderAnalytics
    };
}()));
