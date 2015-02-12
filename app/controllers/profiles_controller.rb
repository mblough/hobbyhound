class ProfilesController < ApplicationController

	def show
		respond_with User.select(:id, :username, :picture, :private).find(params[:id])
	end
end
