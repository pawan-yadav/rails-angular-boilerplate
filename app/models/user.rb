class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :validatable,
         :recoverable, :rememberable, :trackable

  TOKEN_GEN = -> do
    key_gen = Devise::KeyGenerator.new(Rails.application.secrets.secret_key_base)
    Devise::TokenGenerator.new key_gen
  end

  validates :name, :encrypted_sign_in_token, presence: true

  before_validation :set_encrypted_token

  attr_accessor :raw_sign_in_token

  def self.find_with_token(token)
    enc = TOKEN_GEN.call.digest(self.class, :encrypted_sign_in_token, token)
    find_by encrypted_sign_in_token: enc
  end

  def reset_sign_in_token
    raw, enc = encrypt_sign_in_token
    self.encrypted_sign_in_token = enc
    self.save!
    raw
  end

  def games
    Game.where("white = :id OR black = :id", {id: self.id})
  end

  private

  def set_encrypted_token
    unless encrypted_sign_in_token
      reset_sign_in_token
    end
  end

  def encrypt_sign_in_token
    raw = Devise.friendly_token
    enc = TOKEN_GEN.call.digest(self.class, :encrypted_sign_in_token, raw)
    [raw, enc]
  end

end
