class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :raw_sign_in_token
end
