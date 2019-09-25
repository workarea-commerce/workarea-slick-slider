Workarea Slick Slider
================================================================================

Slick Slider plugin for the Workarea platform.

This will include [Ken Wheeler's jQuery Slick](http://kenwheeler.github.io/slick/)
in your project and make available a data attribute that will initailize a
rotating slider on an element with several items inside of it.

Example markup using haml:

```haml
%div{ data: { slick_slider: '' } }
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_1')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_2')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_3')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_4')
```

Getting Started
--------------------------------------------------------------------------------

Add the gem to your application's Gemfile:

```ruby
# ...
gem 'workarea-slick_slider'
# ...
```

Update your application's bundle.

```bash
cd path/to/application
bundle
```

Usage
--------------------------------------------------------------------------------

Apply a `data-slick-slider` attribute to any element that is meant to become a
slider. If no value is passed to the data attribute, then the default
`Workarea.config.slickSlider` options will be used to init the accordion.

Options
--------------------------------------------------------------------------------

Options can be passed in to the `WORKAREA.slickSlider` module by providing a
JSON object as the value for `data-slick-slider`. If these objects become large
and begin cluttering your view, feel free to move them into a helper or a view
model.

The following code shows an example of creating a new helper with some slider
configuration. Note that helpers need to be mounted in application.rb like this:

```ruby
config.to_prepare do
  Workarea::Storefront::ApplicationController.helper(Workarea::Storefront::SliderHelper)
end
```

```ruby
# `app/helpers/workarea/storefront/slider_options.rb`

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
    end
  end
end
```

Now you can call the newly created style_guide_slider_options helper method
as the value for `data-slick-slider` and a new slider will be rendered with the
provided options.

```haml
%div{ data: { slick_slider: style_guide_slider_options } }
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_1')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_2')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_3')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_4')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_5')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_6')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_7')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_8')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_9')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_10')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_11')
  = image_tag url_to_image('workarea/storefront/path/to/image.jpg'), alt: t('workarea.storefront.example.alt_text_12')
```

### Additional Options

There is an additional option called `stopOnInteraction` which will permanently
stop autoplay on your slider when it is interacted with (click or swipe event).
By default it is set to false in `config.js`. To set this option to true provide
the following options:

```ruby
module Workarea
  module Storefront
    module SliderHelper
      def style_guide_autoplay_stop_options
        {
          options: {
            autoplay: true
          },
          stopOnInteraction: true
        }.to_json
      end
    end
  end
end
```

Another additional option `waitForImages` will delay the init until the images
are loaded. This is helpful when experiencing a delay and slick automatically
sets the height to 0 or something incorrect. This is set to false by default in
config.js, this can be overridden for a single slider in Ruby, or for all slider
in JS configuration.

```ruby
module Workarea
  module Storefront
    module SliderHelper
      def style_guide_wait_for_images
        {
          waitForImages: true
        }.to_json
      end
    end
  end
end
```

```javascript
_.merge(WORKAREA.config.slickSlider, {
    waitForImages: true
});
```

Analytics Tracking
--------------------------------------------------------------------------------

Slider Analytics gets initialized on slider init. There are 4 different types of
events that get tracked:

* Drag / Swipe on slider
* Click on a slide
* Click on arrow navigation
* Click on dot navigation.

### Drag/Swipe

When a user drags or swipes (on mobile) a slide, a few things are tracked:

1. The action (swipe)
  The action is used to track how a user interacted with the slider
2. The category (swipe)
  The category is to categorize the type of action, mainly important for click actions
3. The target slider
  This allows the tracker to send data if there are multiple sliders on a page
4. In which direction the user swiped (left or right)
  This is tracked mainly to determine if a user decided to go back a slide or
  wanted to speed up to see the next slide
5. The slide the user ended on
  This is tracked to determine what the user wanted to view in the slider

### Clicking on a Slide

When a user clicks on a particular slide these events are tracked:

1. The category (click)
  The click even is tracked to determine that only a slide was clicked
2. The target slider
  This allows the tracker to send data if there are multiple sliders on a page
3. The current slide
  Which slide was clicked, if there was a link leading to another page

### Clicking on Arrow Navigation

When a user drags or swipes (on mobile) a slide, a few things are tracked:

1. The action (navigation click)
  The action is used to track how a user interacted with the slider
2. The category (click)
  The category is to categorize the type of action, mainly important for click actions
3. The target slider
  This allows the tracker to send data if there are multiple sliders on a page
4. In which direction the slider moved (left or right)
  This is tracked mainly to determine if a user decided to go back a slide or
  wanted to speed up to see the next slide
5. The slide the user ended on
  This is tracked to determine what the user wanted to view in the slider
6. Click Target (navigation arrows)
  This is tracked to note that the arrows were targeted

### Clicking on Dots Navigation

When a user drags or swipes (on mobile) a slide, a few things are tracked:

1. The action (dots click)
  The action is used to track how a user interacted with the slider
2. The category (click)
  The category is to categorize the type of action, mainly important for click actions
3. The target slider
  This allows the tracker to send data if there are multiple sliders on a page
4. The slide the user ended on
  This is tracked to determine what the user wanted to view in the slider
5. Click Target (navigation dots)
  This is tracked to note that the dots were targeted

Gotchas
--------------------------------------------------------------------------------

### Using Mobile First

If using the `mobileFirst` option, you need to subtract 1 from your target
breakpoint otherwise, options will be applied too soon. For example, when
targeting wide devices and using mobile first you should define the breakpoint
value as:

```javascript
  breakpoint: Workarea.config.storefront_break_points[:wide] - 1
```

If you are not using `mobileFirst`, this isn't necessary.

Also when using `mobileFirst` and adding multiple breakpoints, options will need
to be repeated if they will continue to the next breakpoint as seen in the
"Modifying Options" example where arrows and dots needs to be repeated for it to
show correctly in the `wide` breakpoint.

Workarea Commerce Documentation
--------------------------------------------------------------------------------

See [https://developer.workarea.com](https://developer.workarea.com) for Workarea Commerce documentation.

License
--------------------------------------------------------------------------------

Workarea Slick Slider is released under the [Business Software License](LICENSE)
