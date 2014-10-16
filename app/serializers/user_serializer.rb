class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :raw_sign_in_token, :game_keys

  def game_keys
    object.games.map(&:key)
  end

end
