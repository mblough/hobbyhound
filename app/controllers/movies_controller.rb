class MoviesController < ApplicationController
	before_filter :authenticate_user!, only: [:create, :edit, :update, :destroy]

	respond_to :json

	def index
		@user = User.find(params[:user_id])
		@movies = @user.movies
		respond_with @movies
	end

	def create
		respond_with Movie.create(movie_params.merge(user_id: params[:user_id]))
	end

	def edit
		respond_with Movie.find(params[:id])
	end

	def show
		respond_with Movie.find(params[:id])
	end

	def update
		Movie.find(params[:id]).update_attributes(movie_params)
		render nothing: true, status: 204
	end

	def destroy
		Movie.find(params[:id]).destroy
		render nothing: true, status: 204
	end

	def as_json(options = {})
		super(options.merge(include: :user))
	end

	private
	def movie_params
		params.require(:movie).permit(:name, :watched, :rating, :comment)
	end
end
