class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :name
      t.string :genre
      t.boolean :read
      t.integer :currentpage
      t.integer :totalpages
      t.boolean :reading
      t.integer :rating
      t.string :comment

      t.timestamps null: false
    end
  end
end
