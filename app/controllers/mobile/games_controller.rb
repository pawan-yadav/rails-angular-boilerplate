module Mobile
  class GamesController < ApplicationController

    layout 'mobile'

    skip_before_filter :authenticate_user!

    def show
      @key = params[:id]
      @orientation = params[:orientation]
    end

  end
end
