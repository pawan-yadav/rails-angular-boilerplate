class UsersController < ApplicationController

  def index
    render json: User.where.not(id: current_user.id)
  end

end
