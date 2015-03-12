class GamesController < ApplicationController
	before_filter :authenticate_user!, only: [:create, :edit, :update, :destroy]
	
	respond_to :json

	def index
		@user = User.find(params[:user_id])
		@games = @user.games
		respond_with @games
	end

	def create
		respond_with Game.create(game_params.merge(user_id: params[:user_id]))
	end

	def edit
		respond_with Game.find(params[:id])
	end

	def show
		respond_with Game.find(params[:id])
	end

	def update
		Game.find(params[:id]).update_attributes(game_params)
		render nothing: true, status: 204
	end

	def destroy
		Game.find(params[:id]).destroy
		render nothing: true, status: 204
	end

	def as_json(options = {})
		super(options.merge(include: :user))
	end

	private
	def game_params
		params.require(:game).permit(:name, :system, :playing, :beaten, :rating, :comment)
	end
end
