class AddUserRefToMovies < ActiveRecord::Migration
  def change
    add_reference :movies, :user, index: true
    add_foreign_key :movies, :users
  end
end
