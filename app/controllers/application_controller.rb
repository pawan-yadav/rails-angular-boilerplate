class ApplicationController < ActionController::Base

  # before_filter :authenticate_user!

  def authenticate_user!
    token = request.headers['X-Auth-Token']
    if token && user = User.find_with_token(token)
      sign_in user
    else
      super
    end
  end
end
