class GamesController < ApplicationController

  def index
    render json: current_user.games
  end

  def create
    game = Game.create!(white: current_user.id, black: User.find(params[:challenge_user_id]).id, status: 'challenged')
    render json: game
  end

end
