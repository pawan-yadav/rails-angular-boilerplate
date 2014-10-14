class Game < ActiveRecord::Base

  belongs_to :user_white, foreign_key: 'white', class_name: 'User'
  belongs_to :user_black, foreign_key: 'black', class_name: 'User'

  before_save :set_key

  STATUS = %w( challenged started )

  validates :status, inclusion: { in: STATUS }

  private

  def set_key
    self.key = SecureRandom.urlsafe_base64[0, 5]
  end

end
