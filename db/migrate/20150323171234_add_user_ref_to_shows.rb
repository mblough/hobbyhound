class AddUserRefToShows < ActiveRecord::Migration
  def change
    add_reference :shows, :user, index: true
    add_foreign_key :shows, :users
  end
end
