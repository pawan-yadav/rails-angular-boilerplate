class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  TOKEN_GEN = -> do
    key_gen = Devise::KeyGenerator.new(Rails.application.secrets.secret_key_base)
    Devise::TokenGenerator.new key_gen
  end

  validates :enc_sign_in_token, presence: true

  before_validation :set_encrypted_token

  def self.find_with_token(token)
    enc = TOKEN_GEN.call.digest(self.class, :enc_sign_in_token, token)
    find_by enc_sign_in_token: enc
  end

  def reset_sign_in_token
    raw, enc = encrypt_sign_in_token
    self.enc_sign_in_token = enc
    self.save!
    raw
  end

  private

  def set_encrypted_token
    unless enc_sign_in_token
      reset_sign_in_token
    end
  end

  def encrypt_sign_in_token
    raw = Devise.friendly_token
    enc = TOKEN_GEN.call.digest(self.class, :enc_sign_in_token, raw)
    [raw, enc]
  end

end
