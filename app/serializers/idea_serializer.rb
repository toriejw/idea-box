class IdeaSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :rating

  def rating
    if object.quality < 10
      "swill"
    elsif object.quality < 20
      "plausible"
    else
      "genius"
    end
  end

end