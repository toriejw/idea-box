class Idea < ActiveRecord::Base
  def active_model_serializer
    IdeaSerializer
  end
end
