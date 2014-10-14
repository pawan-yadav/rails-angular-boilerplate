class GameSerializer < ActiveModel::Serializer
  attributes :id, :key, :status, :white, :black

end
