ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
require 'capybara/rspec'

ActiveRecord::Migration.maintain_test_schema!

module TestHelpers

  def create_idea
    Idea.create(title: "idea title", body: "idea body")
  end

  def create_ideas(num)
    num.times do |i|
      Idea.create(title: "idea title #{i}", body: "idea body #{i}", quality: i*10)
    end
  end

end

RSpec.configure do |config|
  config.include TestHelpers
  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = false
  config.before :each do
    DatabaseCleaner.start
  end
  config.after :each do
    DatabaseCleaner.clean
  end

  config.infer_spec_type_from_file_location!
end
