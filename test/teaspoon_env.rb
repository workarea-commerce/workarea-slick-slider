require 'workarea/testing/teaspoon'

Teaspoon.configure do |config|
  config.root = Workarea::SlickSlider::Engine.root
  Workarea::Teaspoon.apply(config)

  config.suite do |suite|
    suite.stylesheets += ['workarea/storefront/application']
  end
end
