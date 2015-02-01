class AddFieldstoUser < ActiveRecord::Migration
  def change
  	add_column :users, :picture, :string
  	add_column :users, :private, :boolean, default: false
  end
end
