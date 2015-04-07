class BooksController < ApplicationController
	before_filter :authenticate_user!, only: [:create, :edit, :update, :destroy]
	
	respond_to :json

	class BookProgress
		attr_accessor :total, :complete
	end

	def index
		@user = User.find(params[:user_id])
		@books = @user.books
		respond_with @books
	end

	def create
		respond_with Book.create(book_params.merge(user_id: params[:user_id]))
	end

	def edit
		respond_with Book.find(params[:id])
	end

	def show
		respond_with Book.find(params[:id])
	end

	def update
		Book.find(params[:id]).update_attributes(book_params)
		render nothing: true, status: 204
	end

	def destroy
		Book.find(params[:id]).destroy
		render nothing: true, status: 204
	end

	def progress
		@user = User.find(params[:id])
		@books = @user.books
		@progress = BookProgress.new
		@progress.total = @books.count
		@progress.complete = @books.where(read: true).count
		respond_with @progress
	end

	def as_json(options = {})
		super(options.merge(include: :user))
	end

	private
	def book_params
		params.require(:book).permit(:name, :genre, :read, :currentpage, :totalpages, :reading, :rating, :comment)
	end
end
