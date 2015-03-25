class ShowsController < ApplicationController
	before_filter :authenticate_user!, only: [:create, :edit, :update, :destroy]
	
	respond_to :json

	def index
		@user = User.find(params[:user_id])
		@shows = @user.shows
		respond_with @shows
	end

	def create
		respond_with Show.create(show_params.merge(user_id: params[:user_id]))
	end

	def edit
		respond_with Show.find(params[:id])
	end

	def show
		respond_with Show.find(params[:id])
	end

	def update
		Show.find(params[:id]).update_attributes(show_params)
		render nothing: true, status: 204
	end

	def destroy
		Show.find(params[:id]).destroy
		render nothing: true, status: 204
	end

	def as_json(options = {})
		super(options.merge(include: :user))
	end

	private
	def show_params
		params.require(:show).permit(:name, :showtype, :finished, :currentepisode, :totalepisodes, :watching, :rating, :comment)
	end
end
