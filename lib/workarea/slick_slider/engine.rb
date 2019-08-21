module Workarea
  module SlickSlider
    class Engine < ::Rails::Engine
      include Workarea::Plugin
      isolate_namespace Workarea::SlickSlider

      config.to_prepare do
        Storefront::ApplicationController.helper(Storefront::SliderHelper)
      end
    end
  end
end
