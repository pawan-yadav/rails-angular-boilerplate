class Game < ActiveRecord::Base

  belongs_to :user_white, foreign_key: 'white', class_name: 'User'
  belongs_to :user_black, foreign_key: 'black', class_name: 'User'

  before_save :set_key

  STATUS = %w( in_progress )

  validates :status, inclusion: { in: STATUS }

  def set_remote
    base_uri = "https://chessforkicks.firebaseio.com/games/#{key}"
    Firebase::Client.new(base_uri).set('meta', {
      black: { id: white, name: user_white.name },
      white: { id: black, name: user_black.name}
    })
    Firebase::Client.new(base_uri).set('info', {
      turn: 'white',
      status: self.status
    })
  end

  private

  def set_key
    self.key = SecureRandom.urlsafe_base64[0, 5]
  end

end
