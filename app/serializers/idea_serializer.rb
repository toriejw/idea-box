class IdeaSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :rating

  def rating
    if object.quality == 0
      "swill"
    elsif object.quality == 1
      "plausible"
    else
      "genius"
    end
  end

end
