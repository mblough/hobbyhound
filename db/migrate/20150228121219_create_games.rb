class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :name
      t.string :system
      t.boolean :beaten
      t.boolean :playing
      t.integer :rating
      t.string :comment

      t.timestamps null: false
    end
  end
end
