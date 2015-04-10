class CommentsController < ApplicationController
	before_filter :authenticate_user!, only: [:create]

	respond_to :json

	def index
		@user = User.find(params[:user_id])
		@comments = @user.comments
		respond_with @comments
	end

	def create
		respond_with Comment.create(comment_params.merge(user_id: params[:user_id]))
	end

	def as_json(options = {})
		super(options.merge(include: :user))
	end

	private
	def comment_params
		params.require(:comment).permit(:body, :author, :authorname)
	end
end
