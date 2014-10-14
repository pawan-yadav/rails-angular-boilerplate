class SessionsController < Devise::SessionsController

  before_filter :authenticate_user!, only: [:auth_token]

  def auth_token
    user = User.find_by(email: params[:email])
    if user && user.valid_password?(params[:password])
      raw = user.reset_sign_in_token
      user.raw_sign_in_token = raw
      render json: user
    else
      render json: {error: "No user"}, status: 422
    end
  end

  def current
    render json: current_user
  end

  def destroy
    sign_out(current_user)
    redirect_to root_path
  end

end

