$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "workarea/slick_slider/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "workarea-slick_slider"
  s.version     = Workarea::SlickSlider::VERSION
  s.authors     = ["Ivana Veliskova"]
  s.email       = ["iveliskova@weblinc.com"]
  s.homepage    = 'https://github.com/workarea-commerce/workarea-slick_slider'
  s.summary     = "You have a bunch of images that require rotating."
  s.description = "Simple rotating feature adding a data attribute and Ruby methods for customization."
  s.files = `git ls-files`.split("\n")
  s.license = 'Business Software License'
  # s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]
  # s.license = 'Business Software License'

  s.required_ruby_version = '>= 2.3.0'

  s.add_dependency 'workarea', '~> 3.x'

  s.add_dependency 'jquery-slick-rails', '~> 1.6.0.2'
end
