module Workarea
  module Storefront
    module SliderHelper
      def style_guide_slider_options
        {
          options: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            mobileFirst: true,
            responsive: [
              {
                breakpoint: Workarea.config.storefront_break_points[:medium] - 1,
                settings: {
                  arrows: false,
                  dots: true,
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              },
              {
                breakpoint: Workarea.config.storefront_break_points[:wide] - 1,
                settings: {
                  arrows: false,
                  dots: true,
                  slidesToShow: 4,
                  slidesToScroll: 4
                }
              }
            ]
          }
        }.to_json
      end

      def style_guide_autoplay_stop_options
        {
          options: {
            autoplay: true,
            autoplaySpeed: 2000,
            pauseOnHover: false
          },
          stopOnInteraction: true
        }.to_json
      end

      def style_guide_slider_wait_for_images
        {
          options: {
            slidesToShow: 1,
            slidesToScroll: 1
          },
          waitForImages: true
        }.to_json
      end
    end
  end
end
