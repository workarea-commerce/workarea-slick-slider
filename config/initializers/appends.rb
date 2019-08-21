module Workarea
  Plugin.append_javascripts(
    'storefront.templates',
    'workarea/storefront/slick_slider/templates/slick_slider_nav_prev',
    'workarea/storefront/slick_slider/templates/slick_slider_nav_next'
  )

  Plugin.append_javascripts(
    'storefront.config',
    'workarea/storefront/slick_slider/config'
  )

  Plugin.append_javascripts(
    'storefront.dependencies',
    'jquery.slick'
  )

  Plugin.append_javascripts(
    'storefront.modules',
    'workarea/storefront/slick_slider/modules/slick_slider',
    'workarea/storefront/slick_slider/modules/slick_slider_analytics'
  )

  Plugin.append_stylesheets(
    'storefront.dependencies',
    'slick'
  )

  Plugin.append_stylesheets(
    'storefront.components',
    'workarea/storefront/slick_slider/components/slick_slider'
  )
end
