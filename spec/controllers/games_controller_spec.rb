require 'rails_helper'

RSpec.describe GamesController, :type => :controller do

  before(:each) do
    sign_in create(:user)
    @user1  = create(:user)
  end

  describe "POST create" do
    it "should create a game" do
      expect do
        xhr :post, :create, {challenge_user_id: @user1.id}
      end.to change(Game, :count).by 1
    end
  end

end
