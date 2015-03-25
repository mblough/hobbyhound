class CreateShows < ActiveRecord::Migration
  def change
    create_table :shows do |t|
      t.string :name
      t.string :type
      t.boolean :finished
      t.integer :currentepisode
      t.integer :totalepisodes
      t.boolean :watching
      t.integer :rating
      t.string :comment

      t.timestamps null: false
    end
  end
end
